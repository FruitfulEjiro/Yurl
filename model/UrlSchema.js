import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

const urlSchema = new mongoose.Schema({
   originalUrl: {
      type: String,
      required: [true, "you must have an original url"],
      trim: true,
   },
   shortUrl: {
      type: String,
      required: true,
      trim: true,
   },
   UrlID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
   },
   clicks: {
      type: Number,
      default: 0,
      required: false,
   },
   userId: {
      type: String,
      required: false,
   },
   expiresAt: {
      type: Date,
      required: false,
      default: null,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      required: false,
   },
});

// ---------------- Document Middleware ------------------

const Url = mongoose.model("Url", urlSchema);

export default Url;
