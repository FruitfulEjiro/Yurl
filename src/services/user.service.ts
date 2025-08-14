import { User } from "../entities/index.entity";
import { IUser } from "../interfaces/user.interface";

export class UserService {
   static async createUser(userData: Partial<IUser>): Promise<IUser | null> {
      const user = await User.create(userData as Partial<IUser>);
      return user ? <IUser>user : null;
   }

   static async getUserById(id: string): Promise<IUser | null> {
      const user = await User.findOne({ where: { id } });
      return user ? <IUser>user : null;
   }

   static async getUserByEmail(email: string): Promise<IUser | null> {
      const user = await User.findOne({ where: { email } });
      return user ? <IUser>user : null;
   }

   static async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
      const user = await User.update(id, userData);
      return user ? <IUser>user : null;
   }
}
