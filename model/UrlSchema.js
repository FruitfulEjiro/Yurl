import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
   },
   QRCode: {
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
// Document middleware to shorten url
urlSchema.pre("save", async function (next) {
   const nanoid = customAlphabet(process.env.ALPHABET, 10);
   const parentDomain = "localhost:8080";

   this.shortUrl = `${parentDomain}/${this.UrlID}`;
   next();
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
