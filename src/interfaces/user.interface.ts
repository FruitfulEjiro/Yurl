export interface IUser {
   id?: string;
   firstname?: string;
   lastname?: string;
   email?: string;
   password?: string;
   avatar?: string;
   passwordResetToken?: string;
   passwordChangedAt?: Date;
   refreshToken?: string;
   tokenExp?: Date;

   udatedAt?: Date;
   createdAt?: Date;
}
