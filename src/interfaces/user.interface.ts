export interface IUser {
   id?: string;
   firstname?: string;
   lastname?: string;
   email?: string;
   avatar?: string;
   passwordResetToken?: string;
   passwordChangedAt?: Date;
   refreshToken?: string

   password?: string;
   udatedAt?: Date;
   createdAt?: Date;
}
