import jwt from "jsonwebtoken";
import User from "../model/UserSchema.js";
import AsyncHandler from "express-async-handler";

// Generate JWT
const generateToken = (userID) => {
   const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
   return token;
};

const createSendToken = (user, res) => {
   const token = generateToken(user._id);
   const cookieOptions = {
      epxires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
   };
   if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

   res.cookie("jwt", token, cookieOptions);
   user.password = undefined;
};

// SignUp Function
export const signup = AsyncHandler(async (req, res, next) => {
   const { firstname, lastname, email, password } = req.body;
   // console.log(req.body)

   const user = await User.create({
      name: {
         firstname,
         lastname,
      },
      email,
      password,
   });

   console.log(user);

   //   Generate JWT Token and send via Cookie
   // createSendToken(user, res);
   next();
});
