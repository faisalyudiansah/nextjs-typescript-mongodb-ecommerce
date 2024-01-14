const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.NEXT_MONGODB_URI as string
const DB_NAME = 'laptop-room-gc02p3'
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export const db = client.db(DB_NAME)
export const getCollection = (collectionName : string) => {
    return db.collection(collectionName)
}