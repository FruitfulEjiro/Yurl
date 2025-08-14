import jwt, { VerifyErrors } from "jsonwebtoken";
import CONFIG from "../config/config";
import { jwtPayload } from "../type/jwt.type";
import { IUser } from "../interfaces/user.interface";

export class jwtHelper {
   static generateAccessToken = (user: IUser): string => {
      const token = jwt.sign({ id: user.id, email: user.email }, CONFIG.ENV.ACCESS_TOKEN_SECRET, {
         expiresIn: "30m",
      });
      return token;
   };

   static generateRefreshToken = (user: IUser): string => {
      const token = jwt.sign({ id: user.id, email: user.email }, CONFIG.ENV.ACCESS_TOKEN_SECRET, {
         expiresIn: "1hr",
      });
      return token;
   };

   static verifyAccessToken = (token: string): Promise<jwtPayload> => {
      return new Promise((resolve, reject) => {
         jwt.verify(token, CONFIG.ENV.ACCESS_TOKEN_SECRET, (err, decoded) => {
            err ? reject(err) : resolve(<jwtPayload>decoded);
         });
      });
   };

   static verifyRefreshToken = (token: string): Promise<jwtPayload> => {
      return new Promise((resolve, reject) => {
         jwt.verify(token, CONFIG.ENV.REFRESH_TOKEN_SECRET, (err, decoded) => {
            err ? reject(err) : resolve(<jwtPayload>decoded);
         });
      });
   };
}
