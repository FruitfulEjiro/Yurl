import { Response } from "express";

export const successResponse = <T>(res: Response, data: T, message: string, statusCode: number = 200) => {
   return res.status(statusCode).json({
      success: true,
      status: "success",
      message,
      data,
   });
};
