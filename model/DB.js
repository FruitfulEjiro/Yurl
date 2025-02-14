import mongoose from "mongoose";
import { config } from "dotenv";
import AsyncHandler from "express-async-handler";

config();

const connectDB = AsyncHandler(async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log("Connection Successful");
   } catch (error) {
      console.log(error);
   }
});

export default connectDB;
