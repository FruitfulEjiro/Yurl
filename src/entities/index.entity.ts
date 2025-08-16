import { AppDataSource } from "../config/data-source";
import { UserEntity } from "./user.entity";

export const User = AppDataSource.getRepository(UserEntity);
