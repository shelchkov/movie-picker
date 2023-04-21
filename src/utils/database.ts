import { MongoClient } from 'mongodb'

const uri = import.meta.env.MONGODB_URI
const options = {}

if (!uri) {
  throw new Error('Mongo URI is not provided')
}

let mongoClient: MongoClient

export const connectToDB = async () => {
  try {
    if (mongoClient) {
      return mongoClient.db('movies')
    }

    mongoClient = await new MongoClient(uri, options).connect()
    console.log('Connected to DB')
    const db = mongoClient.db('movies')

    return db
  } catch (error) {
    console.error('Error while connecting to DB')
    console.error(error)
  }
}
