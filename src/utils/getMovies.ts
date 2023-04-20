import { type MovieType } from './types'

enum MoviesList {
  POPULAR = 'most_pop_movies',
  ENGLISH_TOP = 'top_rated_english_250',
}

// enum MoviesInfo {
//   BASE = 'base_info',
// }

const host = 'moviesdatabase.p.rapidapi.com'
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
  const res = await fetch(getUrl(page, list), {
    headers: {
      'X-RapidAPI-Key': import.meta.env.RAPID_API_KEY,
      'X-RapidAPI-Host': host,
    },
  })

  return res.json()
}

export const getPopularMovies = async (page?: number) =>
  getMovies(page, MoviesList.POPULAR)

export const getTopMovies = async (page?: number) =>
  getMovies(page, MoviesList.ENGLISH_TOP)
