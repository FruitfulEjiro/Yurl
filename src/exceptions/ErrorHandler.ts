import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";
import logger from "../utils/logger";

const ErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
   console.log(err);

   const statusCode = err.statusCode || 500;
   const status = err.status || "error";

   logger.error({
      status: err.status,
      message: err.message,
      stack: err.stack,
   });

   res.status(statusCode).json({
      status: status,
      message: err.message,
   });
};

export default ErrorHandler;
