import { type APIContext } from 'astro'
import { connectToDB } from '../../utils/database'

const pickMovie = async (pick: string, against: string) => {
  const db = await connectToDB()

  if (!db) {
    return
  }

  const collection = db.collection('movies')

  const movies = [
    { movieId: pick, increment: 1 },
    { movieId: against, increment: -1 },
  ]

  Promise.all(
    movies.map(async ({ movieId, increment }) =>
      collection.findOne({ movieId }).then(async (movie) => {
        if (!movie) {
          return collection.insertOne({ movieId, rating: increment })
        }

        collection.updateOne({ movieId }, { $inc: { rating: increment } })
      }),
    ),
  )
}

export const post = async ({ request }: APIContext) => {
  const reqData = await request.json()
  console.log(reqData)

  if (!reqData.pick || !reqData.against) {
    return new Response(
      JSON.stringify({ error: 'Properties pick and against are required' }),
      { status: 403 },
    )
  }

  pickMovie(reqData.pick, reqData.against)

  return new Response(JSON.stringify({ success: true }))
}
