import { connectToDB } from './database'
import { type MovieType } from './types'

enum MoviesList {
  POPULAR = 'most_pop_movies',
  ENGLISH_TOP = 'top_rated_english_250',
}

interface DBMovie {
  movieId: string
  rating: number
}

// enum MoviesInfo {
//   BASE = 'base_info',
// }

const host = 'moviesdatabase.p.rapidapi.com'

const options = {
  headers: {
    'X-RapidAPI-Key': import.meta.env.RAPID_API_KEY,
    'X-RapidAPI-Host': host,
  },
}

const getUrl = (page?: number, list?: MoviesList) => {
  let url = `https://${host}/titles?`

  if (page) {
    url += `page=${page}&`
  }

  if (list) {
    url += `list=${list}&`
  }

  return url.slice(0, url.length - 1)
}

export const getMovies = async (
  page?: number,
  list?: MoviesList,
): Promise<{
  error?: string
  message?: string
  results?: MovieType[]
  page?: number
}> => {
  const res = await fetch(getUrl(page, list), options)

  return res.json()
}

export const getPopularMovies = async (page?: number) =>
  getMovies(page, MoviesList.POPULAR)

export const getTopMovies = async (page?: number) =>
  getMovies(page, MoviesList.ENGLISH_TOP)

export const getMoviesData = async (
  moviesIds: string[],
): Promise<MovieType[]> => {
  if (moviesIds.length === 0) {
    return []
  }

  const url = `https://${host}/titles/x/titles-by-ids?idsList=${moviesIds.join(
    ',',
  )}`
  const res = await fetch(url, options)
  const { results, error }: { results: MovieType[] | null; error?: string } =
    await res.json()

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (error || !results) {
    throw new Error(error)
  }

  const result: MovieType[] = []

  moviesIds.forEach((movieId) => {
    const movie = results.find(({ id }) => id === movieId)

    if (movie) {
      result.push(movie)
    }
  })

  return result
}

export const getDBMovies = async () => {
  const db = await connectToDB()

  if (!db) {
    throw new Error("Couldn't connect to the database")
  }

  const collection = db.collection('movies')
  const cursor = collection.find<DBMovie>({}, { sort: { rating: -1 } })

  const result: DBMovie[] = []
  await cursor.forEach((movie) => {
    result.push(movie)
  })

  return result
}
