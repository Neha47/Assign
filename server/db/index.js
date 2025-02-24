import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const dbConnection = async() =>{
    try {
        console.log("HELLO")
        const connectDB = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.databaseName}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectDB.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}