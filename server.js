import { config } from "dotenv";

// Local Modules
import app from "./app.js";
import connectDB from "./model/DB.js";

config();

// Connect to Database
connectDB();

const PORT = process.env.PORT;
// Start Server
const server = app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}...`);
});
