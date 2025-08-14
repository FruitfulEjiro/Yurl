import express from "express";
import morgan from "morgan";

import "./interfaces/global.interface";

const app = express();

// initialize DB
import "./config/data-source";
import routes from "./routes/index.route";
import CONFIG from "./config/config";
import ErrorHandler from "./exceptions/ErrorHandler";

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("Api is Running");
});

app.use("/api/v1", routes);

const PORT = CONFIG.ENV.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is runing on port ${PORT}`);
});

app.use(ErrorHandler);
