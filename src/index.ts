import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import CONFIG from "./config/config";
import ErrorHandler from "./exceptions/ErrorHandler";

const app = express();
app.use(morgan("dev"));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = CONFIG.ENV.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});

app.use(ErrorHandler);
