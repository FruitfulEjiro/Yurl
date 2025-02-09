import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";

// Local Modules
import User from "../model/UserSchema.js";
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
      data: {
         user,
      },
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

// Login Function
export const login = AsyncHandler(async (req, res, next) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email }).select("+password");

   // Check if user exists and if password is correct using Mongoose Instsnce Methods
   if (!user && !(await User.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Email or Password"), 400);
   }
   //   Generate JWT Token and send via Cookie
   createSendToken(user, 200, res);
});

// Protect Routes
export const protect = AsyncHandler(async (req, res, next) => {
   const token = req.cookies.jwt;

   if (!token) {
      return res.status(401).json({
         status: "Failed",
         message: "You are not logged in",
         redirect: "/login",
      });
   }

   // verify JWT
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   if (!decoded) {
      return res.status(401).json({
         status: "Failed",
         message: "You are not logged in",
         redirect: "/login",
      });
   }

   // Find user by ID fro decoded token
   const user = await User.findById(decoded.id);
   if (!user) {
      return res.status(401).json({
         status: "Failed",
         message: "The user with this token no longer exists",
         redirect: "/login",
      });
   }
});

// Set authorization for links so a user can only update, delete and fetch his shortened links.

// Sign out Function
export const signout = AsyncHandler(async (req, res, next) => {
   const token = req.cookies.jwt;
   if (!token) {
      return res.status(200).json({
         status: "Success",
         message: "You are not logged in",
      });
   }
   // Remove JWT from cookies
   res.status(200)
      .cookie("jwt", "Logged Out", {
         expires: new Date(Date.now() + 10 * 1000),
         httpOnly: true,
      })
      .json({
         status: "Success",
         message: "Logged out successfully",
         redirect: "/",
      });
});
