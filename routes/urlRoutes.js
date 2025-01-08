import express from "express";
import { shortenOne, fetchUrl } from "../controller/urlController.js";

const router = express.Router();

router.post("/shorten/one", shortenOne);

router.get("/:id", fetchUrl);

export default router;
