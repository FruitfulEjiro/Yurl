import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import AppError from "../exceptions/AppError";
import statusCodes from "../constants/statusCodes";
import { jwtHelper } from "../utils/jwt";
import { sendCookie, successResponse } from "../exceptions/response";
import { bcryptHelper } from "../utils/bcrypt";
import { AuthValidation } from "../validations/auth.validation";

export class AuthController {
   static async signup(req: Request, res: Response, next: NextFunction) {
      const { success, data, error } = AuthValidation.signup.safeParse(req.body);
      if (!success) return next(new AppError(error.message, statusCodes.BAD_REQUEST));
      const { firstname, lastname, email, password } = data;

      const userExist = await UserService.getUserByEmail(email);
      if (userExist) return next(new AppError("user already exist", statusCodes.BAD_REQUEST));

      const hashedPassword = await bcryptHelper.hashPassword(password);

      const user = await UserService.createUser({ firstname, lastname, email, password: hashedPassword });
      if (!user) return next(new AppError("couldnt create user. Try again Later!!", statusCodes.INTERNAL_SERVER_ERROR));

      const accessToken = jwtHelper.generateAccessToken(user);
      const refreshToken = jwtHelper.generateRefreshToken(user);

      await UserService.updateUser(user.id!, { refreshToken, tokenExp: new Date(Date.now() + 1 * 60 * 60 * 1000) });

      // send otp

      sendCookie(res, { user, accessToken, refreshToken }, "user created successfully", statusCodes.CREATED);
   }

   static async login(req: Request, res: Response, next: NextFunction) {
      const { success, data, error } = AuthValidation.login.safeParse(req.body);
      if (!success) return next(new AppError(error.message, statusCodes.BAD_REQUEST));

      const { email, password } = data;

      const checkUser = await UserService.getUserByEmail(email);
      if (!checkUser || !(await bcryptHelper.comparePassword(password, checkUser.password!)))
         return next(new AppError("wrong email or password", statusCodes.BAD_REQUEST));

      const user = await UserService.getUserById(checkUser.id!);

      const accessToken = jwtHelper.generateAccessToken(user);
      const refreshToken = jwtHelper.generateRefreshToken(user);

      await UserService.updateUser(user.id!, { refreshToken, tokenExp: new Date(Date.now() + 1 * 60 * 60 * 1000) });

      sendCookie(res, { user, accessToken, refreshToken }, "login successful", statusCodes.SUCCESS);
   }

   static async refreshToken(req: Request, res: Response, next: NextFunction) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return next(new AppError("you are not logged in", statusCodes.UNAUTHORIZED));

      const decoded = await jwtHelper.verifyRefreshToken(refreshToken);
      if (!decoded) return next(new AppError("you are not logged in", statusCodes.UNAUTHORIZED));

      const checkUser = await UserService.getUserByIdWithToken(decoded.id);
      if (!checkUser) return next(new AppError("user doesnt exist", statusCodes.NOT_FOUND));

      if (
         checkUser.passwordChangedAt !== null &&
         (new Date(checkUser.passwordChangedAt!).getTime() > new Date(decoded.iat!).getTime() ||
            new Date(checkUser.tokenExp!).getTime() < Date.now())
      ) {
         return next(new AppError("password was changed. Login again!!!", statusCodes.FORBIDDEN));
      }
      
      const user = await UserService.getUserById(checkUser.id!);
      
      const newAccessToken = jwtHelper.generateAccessToken(user);
      const newRefreshToken = jwtHelper.generateRefreshToken(user);

      await UserService.updateUser(user.id!, { refreshToken });

      sendCookie(
         res,
         { user, accessToken: newAccessToken, refreshToken: newRefreshToken },
         "tokens generated successfully",
         statusCodes.SUCCESS
      );
   }

   static async updatePassword(req: Request, res: Response, next: NextFunction) {
      const { success, data, error } = AuthValidation.updatePassword.safeParse(req.body);
      if (!success) return next(new AppError(error.message, statusCodes.BAD_REQUEST));

      const { password, newPassword } = data;
      const { id } = req.user!;

      const user = await UserService.getUserByIdWithPassword(id!);
      if (!user) return next(new AppError("user not found", statusCodes.NOT_FOUND));

      if (!(await bcryptHelper.comparePassword(password, user.password!)))
         return next(new AppError("password is incorrect", statusCodes.BAD_REQUEST));

      const hashedPassword = await bcryptHelper.hashPassword(newPassword);

      const updatePassword = await UserService.updateUser(user.id!, { password: hashedPassword });
      if (!updatePassword)
         return next(new AppError("password, not updated. Try again later!!!", statusCodes.INTERNAL_SERVER_ERROR));

      successResponse(res, {}, "password updated successfully", statusCodes.SUCCESS);
   }
}
