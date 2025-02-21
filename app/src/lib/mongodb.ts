import { MongoServerError } from "mongodb"
import mongoose, { MongooseError } from "mongoose"

// Extend global object to include mongoose
declare global {
    let mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWithMongoose = global as typeof globalThis & { mongoose?: any }

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null }
}

const dbConnect = async (): Promise<mongoose.Connection> => {
    const MONGODB_URI = process.env.MONGODB_URI

    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable")
    }

    if (globalWithMongoose.mongoose.conn) {
        return globalWithMongoose.mongoose.conn
    }

    if (!globalWithMongoose.mongoose.promise) {
        globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose.connection)
    }

    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise
    return globalWithMongoose.mongoose.conn
}

export const getMongoServerError = (err: unknown): MongoServerError | undefined => {
    if (!err || !(err instanceof MongooseError)) {
        return undefined
    }

    const mgErr = err as MongooseError
    if (!mgErr.cause || !(mgErr.cause instanceof MongoServerError)) {
        return undefined
    }

    return (mgErr.cause as MongoServerError)
}

export default dbConnect
