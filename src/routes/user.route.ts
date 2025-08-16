import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const route = Router();

route.delete("/delete/:id", UserController.deleteUser);

export default route;
