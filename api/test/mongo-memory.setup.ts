import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;

export const connectMongoMemoryDB = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  process.env.MONGO_URI = uri; // Set this so ConfigModule/MongooseModule picks it up
};

export const closeMongoMemoryDB = async () => {
  if (mongoose.connection.readyState) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
  if (mongod) {
    await mongod.stop();
  }
};

export const clearMongoMemoryDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
