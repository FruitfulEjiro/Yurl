import { IUser } from "./user.interface";

declare global {
   namespace Express {
      interface User extends IUser {}
      interface Request {
         user?: Partial<User>;
      }
   }
}

export {}; // so this file can be treated as a module
