import express from "express";

// Local modules
import { shortenOne, fetchUrl, updateUrl, deleteUrl } from "../controller/urlController.js";
import { protect } from "../controller/AuthController.js";

const router = express.Router();

router
   .post("/shorten/one", shortenOne)
   .get("/:id", fetchUrl)
   .patch("/update/:id", protect, updateUrl)
   .delete("/delete/:id", protect, deleteUrl);

   // Set authorization fo links so a user can only update, delete and fetch his shortend links
export default router;
