import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/business-hub';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();

  const dbName = new URL(uri).pathname.replace('/', '') || 'business-hub';
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
