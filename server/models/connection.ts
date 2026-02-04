import type {ConnectOptions} from 'mongoose';
import mongoose from "mongoose";

export async function defineMongooseConnection({uri, options}: {
    uri?: string;
    options?: ConnectOptions;
} = {}): Promise<void> {
    const config = useRuntimeConfig().mongoose;
    const mongooseUri = uri || config.uri;
    const mongooseOptions = options || config?.options;
    try {
        await mongoose.connect(mongooseUri, {...mongooseOptions});
        // logger.success("Connected to MongoDB database");
    } catch (err) {
        // logger.error("Error connecting to MongoDB database", err);
    }
}