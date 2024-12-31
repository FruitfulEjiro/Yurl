import jwt from "jsonwebtoken";
import User from "../model/UserSchema.js";
import AsyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

// Generate JWT
const generateToken = (userID) => {
   const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
   return token;
};

const createSendToken = (user, statusCode, res) => {
   const token = generateToken(user._id);
   const cookieOptions = {
      epxires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
   };
   if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

   user.password = undefined;

   res.status(statusCode).cookie("jwt", token, cookieOptions).json({
      status: "Successful",
   });
};

// Signup Function
export const signup = AsyncHandler(async (req, res, next) => {
   const { firstname, lastname, email, password } = req.body;

   const user = await User.create({
      name: {
         firstname,
         lastname,
      },
      email,
      password,
   });

   //   Generate JWT Token and send via Cookie
   createSendToken(user, 201, res);
   next();
});

// Login function
export const login = AsyncHandler(async (req, res, next) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email }).select("+password");

   // Check if user exists and if password is correct using Mongoose Instsnce Methods
   if (!user && !(await User.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Email or Password"), 400)
   }
   //   Generate JWT Token and send via Cookie
   createSendToken(user, 200, res);
});