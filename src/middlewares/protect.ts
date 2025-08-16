import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { jwtHelper } from "../utils/jwt";
import AppError from "../exceptions/AppError";
import statusCodes from "../constants/statusCodes";
import { UserService } from "../services/user.service";

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const accessToken = req.cookies.accessToken;
   if (!accessToken) return next(new AppError("Your are not logged in", statusCodes.UNAUTHORIZED));

   const decoded = await jwtHelper.verifyAccessToken(accessToken);
   if (!decoded) return next(new AppError("your are not logged in", statusCodes.UNAUTHORIZED));

   const user = await UserService.getUserById(decoded.id);
   if (!user) return next(new AppError("User doesnt exist", statusCodes.NOT_FOUND));

   if (
      user.passwordChangedAt !== null &&
      new Date(user.passwordChangedAt!).getTime() > new Date(decoded.iat!).getTime()
   )
      return next(new AppError("password was changed. Login again!!!", statusCodes.FORBIDDEN));

   req.user = user;
   next();
});
