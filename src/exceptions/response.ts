import { CookieOptions, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import CONFIG from "../config/config";

type payload = {
   user: IUser;
   accessToken?: string;
   refreshToken?: string;
};

export const successResponse = (res: Response, data: payload, message: string, statusCode: number = 200) => {
   return res.status(statusCode).json({
      success: true,
      status: "success",
      message,
      data,
   });
};

export const sendCookie = (res: Response, data: payload, message: string, statusCode: number = 200) => {
   const isProduction = process.env.NODE_ENV === "production";

   const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + CONFIG.ENV.COOKIE_EXPIRES_IN * 60 * 60 * 1000),
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
   };

   return res
      .cookie("accessToken", data.accessToken!, cookieOptions)
      .cookie("refreshToken", data.refreshToken!, cookieOptions)
      .status(statusCode)
      .json({
         success: true,
         status: "success",
         message,
         data,
      });
};
