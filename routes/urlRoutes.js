import express from "express";

// Local modules
import { shortenOne, shortenMany, fetchUrl, updateUrl, deleteUrl, createQRCode } from "../controller/urlController.js";
import { protect } from "../controller/AuthController.js";

const router = express.Router();

router
   .post("/shorten/one", shortenOne)
   .post("/shorten/many", shortenMany)
   .get("/qr-code/:id", createQRCode)
   .get("/:id", fetchUrl)
   .patch("/update/:id", protect, updateUrl)
   .delete("/delete/:id", protect, deleteUrl);

export default router;
