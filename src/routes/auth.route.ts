import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { protect } from "../middlewares/protect";

const route = Router();

route
   .post("/signup", AuthController.signup)
   .post("/login", AuthController.login)
   .get("/refresh-token", protect, AuthController.refreshToken)
   .patch("/update-password", protect, AuthController.updatePassword);

export default route;
