import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
   origiinalUrl: {
      tpye: String,
      required: true,
      trim: true,
   },
   shortUrl: {
      type: String,
      required: true,
      trim: true,
   },
   customAlias: {
      type: String,
      trim: true,
      required: false,
   },
   clicks: {
      type: Number,
      default: 0,
      required: false,
   },
   userId: {
      type: String,
      required: true,
   },
   expiresAt: {
      type: Date,
      required: false,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      required: false,
   },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
