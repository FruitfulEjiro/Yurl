import { User } from "../entities/index.entity";
import { IUser } from "../interfaces/user.interface";

export class UserService {
   static async createUser(userData: Partial<IUser>): Promise<IUser> {
      const user = User.create(userData as Partial<IUser>);
      await User.save(user);
      const userObj = User.findOne({ where: { id: user.id } });
      return <IUser>userObj;
   }

   static async getUserById(id: string): Promise<IUser> {
      const user = await User.findOne({ where: { id } });
      return <IUser>user;
   }

   static async getUserByIdWithPassword(id: string): Promise<IUser> {
      const user = await User.findOne({ where: { id }, select: ["id", "password"] });
      return <IUser>user;
   }

   static async getUserByIdWithToken(id: string): Promise<IUser> {
      const user = await User.findOne({
         where: { id },
         select: ["id", "refreshToken", "tokenExp"],
      });
      return <IUser>user;
   }

   static async getUserByEmail(email: string): Promise<IUser> {
      const user = await User.findOne({ where: { email }, select: ["id", "password"] });
      return <IUser>user;
   }

   static async updateUser(id: string, userData: Partial<IUser>): Promise<IUser> {
      const user = await User.update(id, { ...userData });
      return <IUser>user;
   }

   static async delete(id: string): Promise<boolean> {
      const user = await User.delete(id);
      return user.affected ? true : false;
   }
}
