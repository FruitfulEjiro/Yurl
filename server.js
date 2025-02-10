import { config } from "dotenv";
import cron from "node-cron";

// Local Modules
import app from "./app.js";
import connectDB from "./model/DB.js";
import { autoDeleteExpiredUrl } from "./controller/urlController.js";

config();

// Connect to Database
connectDB();

// Delete Expired URL from Database
setTimeout(() => {
   cron.schedule("* * * * * *", () => {
      autoDeleteExpiredUrl();
   });
}, 1000 * 60);

const PORT = process.env.PORT;
// Start Server
const server = app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}...`);
});
