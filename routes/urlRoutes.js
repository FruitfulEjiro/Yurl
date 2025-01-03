import express from "express";
import { shortenOne } from "../controller/urlController.js";

const router = express.Router();

router.post("/one", shortenOne);

export default router