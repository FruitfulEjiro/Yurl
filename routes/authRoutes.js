import express from "express";
import { signup } from "../controller/AuthController.js";
import passport from "passport";

const router = express.Router();

router.post("/signup", signup);

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get("/google/redirect", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
//    res.redirect("/");
// });

export default router;
