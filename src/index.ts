import express from "express";
import morgan from "morgan";

import "./interfaces/global.interface";
import routes from "./routes/index.route";
import CONFIG from "./config/config";
import ErrorHandler from "./exceptions/ErrorHandler";
import { AppDataSource } from "./config/data-source";
import CookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

(() => {
   AppDataSource.initialize()
      .then(async () => {
         console.log("Connected to Database Successfully");
         // await AppDataSource.runMigrations();
      })
      .catch((error) => console.log("Couldnt connect to Database", error));
})();

app.get("/", (req, res) => {
   res.send("Api is Running");
});

app.use("/api/v1", routes);

const PORT = CONFIG.ENV.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is runing on port ${PORT}`);
});

app.use(ErrorHandler);
