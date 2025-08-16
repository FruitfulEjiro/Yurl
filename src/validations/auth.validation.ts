import { z } from "zod";

export class AuthValidation {
   static signup = z.object({
      firstname: z
         .string({ message: "firstname is required" })
         .nonempty()
         .min(3, { message: "firstname must be atleast 3 characters" })
         .trim(),
      lastname: z
         .string({ message: "lastname is required" })
         .nonempty()
         .min(3, { message: "firstname must be atleast 3 characters" })
         .trim(),
      email: z.email({ message: "invalid email format" }).nonempty().toLowerCase(),
      password: z
         .string({ message: "password is required" })
         .min(8, { message: "password must be atleast 8 characters long" })
         .max(32, { message: "password must not be more than 32 characters" }),
   });

   static login = z.object({
      email: z.email({ message: "invalid email format" }),
      password: z
         .string({ message: "password is required" })
         .nonempty()
         .min(8, { message: "password must be atleast 8 characters long" })
         .max(32, { message: "password must not be more than 32 characters" }),
   });

   static updatePassword = z.object({
      password: z
         .string({ message: "password is required" })
         .nonempty()
         .min(8, { message: "password must be atleast 8 characters long" })
         .max(32, { message: "password must not be more than 32 characters" }),
      newPassword: z
         .string({ message: "password is required" })
         .nonempty()
         .min(8, { message: "password must be atleast 8 characters long" })
         .max(32, { message: "password must not be more than 32 characters" }),
   });
}
