import express from "express";
import cookieParser from "cookie-parser";
import { signup } from "./controller/AuthController.js";
import errorHandler from "./utils/ErrorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/signup", signup);

app.use(errorHandler);

export default app;