import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import CONFIG from "./config";

export const AppDataSource = new DataSource({
   type: "postgres",
   url: CONFIG.ENV.DATABASE_URL,
   ssl: {
      rejectUnauthorized: false,
   },
   synchronize: false,
   logging: false,
   entities: [UserEntity],
   migrations: ["src/migration/**/*.ts"],
   subscribers: [],
});