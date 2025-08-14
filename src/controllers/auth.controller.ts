import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import AppError from "../exceptions/AppError";
import statusCodes from "../constants/statusCodes";
import { jwtHelper } from "../utils/jwt";
import { sendCookie } from "../exceptions/response";
import { bcryptHelper } from "../utils/bcrypt";

export class AuthController {
   static async signup(req: Request, res: Response, next: NextFunction) {
      const { firstname, lastname, email, password } = req.body;

      const userExist = await UserService.getUserByEmail(email);
      if (!userExist) return next(new AppError("user already exist", statusCodes.BAD_REQUEST));

      const hashedPassword = await bcryptHelper.hashPassword(password);

      const user = await UserService.createUser({ firstname, lastname, email, password: hashedPassword });
      if (!user) return next(new AppError("couldnt create user. Try again Later!!", statusCodes.INTERNAL_SERVER_ERROR));

      const accessToken = jwtHelper.generateAccessToken(user);
      const refreshToken = jwtHelper.generateRefreshToken(user);

      await UserService.updateUser(<string>user.id, { refreshToken });

      // send otp

      sendCookie(res, { user, accessToken, refreshToken }, "user created successfully", statusCodes.CREATED);
   }

   static async login(req: Request, res: Response, next: NextFunction) {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email);
      if (!user || (await !bcryptHelper.comparePassword(password, user.password!)))
         return next(new AppError("wrong email or password", statusCodes.BAD_REQUEST));

      const accessToken = jwtHelper.generateAccessToken(user)
      const refreshToken = jwtHelper.generateRefreshToken(user)
      
   }
}
