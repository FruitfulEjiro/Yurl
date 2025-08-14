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
   logging: process.env.NODE_ENV !== "production",
   entities: [UserEntity],
   migrations: [],
   subscribers: [],
});

AppDataSource.initialize()
   .then(async () => {
      console.log("Connected to Database Successfully");
      await AppDataSource.runMigrations();
   })
   .catch((error) => console.log("Couldnt connect to Database", error));
