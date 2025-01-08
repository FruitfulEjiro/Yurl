// Core Modules
import express from "express";
import cookieParser from "cookie-parser";
import { nanoid } from "nanoid";

// Local Modules
import errorHandler from "./utils/ErrorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
// import passportSetup from "./controller/passportController.js";

import { fetchUrl } from "./controller/urlController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/api/v1/shorten/one", (req, res) => {
//    console.log(req.body);
// });

// App Routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/url", urlRoutes);

app.get("/:id", fetchUrl);

app.use(errorHandler);

export default app;
