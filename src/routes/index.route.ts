import { Router } from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route"

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);

export default routes;