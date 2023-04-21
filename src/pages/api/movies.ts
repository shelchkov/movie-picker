import { connectToDB } from '../../utils/database'
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

  return new Response(JSON.stringify({ movies }))
}
