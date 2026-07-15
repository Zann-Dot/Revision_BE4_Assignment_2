import { configDotenv } from "dotenv";
import { connect } from "mongoose";
configDotenv();

const mongoURI = process.env.MONGODB;

async function connectDB() {
    await connect(mongoURI)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch(() => {
            console.log("Database connection failed");
        });
}

export { connectDB };