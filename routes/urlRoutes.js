import express from "express";

// Local modules
import { shortenOne, shortenMany, fetchUrl, updateUrl, deleteUrl } from "../controller/urlController.js";
import { protect } from "../controller/AuthController.js";

const router = express.Router();

router
   .post("/shorten/one", shortenOne)
   .post("/shorten/many", shortenMany)
   .get("/:id", fetchUrl)
   .patch("/update/:id", protect, updateUrl)
   .delete("/delete/:id", protect, deleteUrl);

// Set authorization fo links so a user can only update, delete and fetch his shortend links
export default router;
