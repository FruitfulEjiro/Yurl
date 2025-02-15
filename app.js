// Core Modules
import express from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import helmet from "helmet";

// Local Modules
import ErrorHandler from "./utils/ErrorHandler.js";
import AppError from "./utils/AppError.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";

import { fetchUrl } from "./controller/urlController.js";

const app = express();

// Express Rate Limiting
const limiter = rateLimit({
   max: 1000, //this should depend on the amount of request traffic the app receives
   windowMs: 60 * 60 * 1000,
   message: "Too many requests, try again in 1 hour",
});

// limits the size of the data that can be sent in a request
app.use(
   express.json({
      limit: "1mb",
   })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Secutity Middlewares
app.use(helmet());

// Rate Limiting
app.use(limiter);

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against Cross-site-scripting
app.use(xss());

// Preventing parameter pollution
app.use(hpp());

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