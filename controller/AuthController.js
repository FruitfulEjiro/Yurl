import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";

// Local Modules
import User from "../model/UserSchema.js";
import Url from "../model/UrlSchema.js";
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
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
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

   if (!user) return next(new AppError("User not created", 400));

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
   next()
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

   req.user = user;
   next();
});

// user authenticatio to Update, Delete and Fetch Url
export const urlAuth = AsyncHandler(async (req, res, next) => {
   const userid = req.user._id;
   const { id } = req.params;

   const url = await Url.findOne({ UrlID: id });
   if (!url) {
      return next(new AppError("Url not found", 404));
   }

   // Check if ID in user corresponds with ID in url
   if (userid !== url.userId) return next(new AppError("You didnt create this Url", 400));

   next()
});

// Sign out Function
export const signout = AsyncHandler(async (req, res, next) => {
   const token = req.cookies.jwt;
   if (!token) {
      return next(new AppError("You are not logged in", 200));
   }
   // Remove JWT from cookies
   res.status(200)
      .cookie("jwt", "Logged Out", {
         expires: new Date(Date.now() + 5 * 1000),
         httpOnly: true,
      })
      .json({
         status: "Success",
         message: "Logged out successfully",
         redirect: "/",
      });
});
