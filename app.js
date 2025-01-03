// Core Modules
import express from "express";
import cookieParser from "cookie-parser";

// Local Modules
import errorHandler from "./utils/ErrorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import passportSetup from "./controller/passportController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// App Routers
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;
