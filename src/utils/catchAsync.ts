import { Request, Response, NextFunction } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsync =
   <R extends Request = Request>(fn: AsyncHandler) =>
   (req: Request, res: Response, next: NextFunction) =>
      Promise.resolve(fn(req as R, res, next)).catch(next);
