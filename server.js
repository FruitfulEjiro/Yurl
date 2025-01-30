import { config } from "dotenv";
import cron from "node-cron";

// Local Modules
import app from "./app.js";
import connectDB from "./model/DB.js";
import { deleteExpiredUrl } from "./controller/urlController.js";

config();

// Connect to Database
connectDB();

// Delete Expired URL from Database
cron.schedule("* * * * * *", () => {
   deleteExpiredUrl();
});

const PORT = process.env.PORT;
// Start Server
const server = app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}...`);
});
