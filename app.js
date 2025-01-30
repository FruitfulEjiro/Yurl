// Core Modules
import express from "express";
import cookieParser from "cookie-parser";
import { nanoid } from "nanoid";

// Local Modules
import errorHandler from "./utils/ErrorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
// import passportSetup from "./controller/passportController.js";

import { fetchUrl, deleteExpiredUrl } from "./controller/urlController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// App Routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/url", urlRoutes);

app.get("/:id", fetchUrl);

app.get("/", (req, res) => {
   res.send("This is the Default page");
});

app.use(errorHandler);

export default app;