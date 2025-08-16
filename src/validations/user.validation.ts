import { z } from "zod";

export class UserValidation {
   static deleteUser = z.object({
      id: z.uuid({ message: "invalid id format" }).nonempty().trim(),
   });
}
