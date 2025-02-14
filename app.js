// Core Modules
import express from "express";
import cookieParser from "cookie-parser";

// Local Modules
import ErrorHandler from "./utils/ErrorHandler.js";
import AppError from "./utils/AppError.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";

import { fetchUrl } from "./controller/urlController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// App Routers
app.use("/auth", authRoutes);
app.use("/url", urlRoutes);

app.get("/:id", fetchUrl);

app.get("/", (req, res) => {
   res.send("This is the Default page");
});

// Handling unhandled routes
app.all("*", (req, res, next) => {
   return next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

// error handling middleware
app.use(ErrorHandler);

export default app;
