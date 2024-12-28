import mongoose from "mongoose";
import { config } from "dotenv";

console.log(process.env.MONGO_URI);

const connectDB = async () => {
   try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log("Connection Successful");
   } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
   }
};

export default connectDB;
