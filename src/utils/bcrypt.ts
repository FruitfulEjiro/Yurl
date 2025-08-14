import bcrypt from "bcryptjs";

export class bcryptHelper {
   static async hashPassword(password: string): Promise<string> {
      try {
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         return hashedPassword;
      } catch (err) {
         throw new Error("Error hashing password:");
      }
   }

   static async comparePassword(password: string, DBPassword: string): Promise<boolean> {
      try {
         const correctPassword = await bcrypt.compare(password, DBPassword);
         return correctPassword;
      } catch (err) {
         throw new Error("Error COmparing Password");
      }
   }
}