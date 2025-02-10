import express from "express";
import { signup, login, signout } from "../controller/AuthController.js";
// import passport from "passport";

const router = express.Router();

router.post("/signup", signup).post("/login", login).get("/signout", signout);

export default router;
