import { connectToDB } from '../../utils/database'
import { getMoviesData } from '../../utils/getMovies'
import { type DBMovie } from '../../utils/types'

const getMovies = async () => {
  const db = await connectToDB()

  if (!db) {
    return
  }

  const collection = db.collection('movies')
  const cursor = collection.find<DBMovie>({}, { sort: { rating: -1 } })

  const result: DBMovie[] = []
  await cursor.forEach((movie) => {
    result.push(movie)
  })

  return result
}

export const get = async () => {
  const movies = await getMovies()

  if (!movies) {
    return new Response(
      JSON.stringify({ error: "Couldn't connect to the database" }),
      { status: 500 },
    )
  }

  const moviesIds = movies.map(({ movieId }) => movieId)
  const data = await getMoviesData(moviesIds)

  return new Response(JSON.stringify({ movies: data }))
}
