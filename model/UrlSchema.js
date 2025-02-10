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
// urlSchema.pre("save", async function (next) {
//    const nanoid = customAlphabet(process.env.ALPHABET, 10);
//    const newUrl = nanoid();
//    const parentDomain = "localhost:8080";

//    // check if customAlias exists
//    if (await Url.findOne({ UrlID: customAlias })) {
//       res.status(400).json({
//          status: "Failed",
//          message: "Custom Name already exists",
//       });
//    }

//    this.shortUrl = customAlias ? `${parentDomain}/${customAlias}` : `${parentDomain}/${newUrl}`;
// });

const Url = mongoose.model("Url", urlSchema);

export default Url;
