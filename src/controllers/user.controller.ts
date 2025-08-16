import { Request, Response, NextFunction } from "express";
import { UserValidation } from "../validations/user.validation";
import statusCodes from "../constants/statusCodes";
import AppError from "../exceptions/AppError";
import { UserService } from "../services/user.service";
import { successResponse } from "../exceptions/response";

export class UserController {
   static async deleteUser(req: Request, res: Response, next: NextFunction) {
      const { success, data, error } = UserValidation.deleteUser.safeParse(req.params);
      if (!success) return next(new AppError(error.message, statusCodes.BAD_REQUEST));

      const { id } = data;

      const deleteUser = await UserService.delete(id);
      if (!deleteUser) return next(new AppError("user not found", statusCodes.NOT_FOUND));

      successResponse(res, {}, "user deleted successfully", statusCodes.SUCCESS);
   }
}
