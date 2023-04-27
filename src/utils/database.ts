import { MongoClient, type MongoClientOptions } from 'mongodb'

const uri = import.meta.env.MONGODB_URI
const options: MongoClientOptions = { tlsAllowInvalidCertificates: true }

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
