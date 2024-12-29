import mongoose from "mongoose";
import { config } from "dotenv";
import AsyncHandler from "express-async-handler";

config();

const connectDB = AsyncHandler(async () => {
   const connection = await mongoose.connect(process.env.MONGO_URI);
   console.log("Connection Successful");
});

export default connectDB;
