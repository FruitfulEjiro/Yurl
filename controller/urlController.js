import { customAlphabet } from "nanoid";
import AsyncHandler from "express-async-handler";
import validator from "validator";
import QRCode from "qrcode";

// Local Modules
import AppError from "../utils/AppError.js";
import Url from "../model/UrlSchema.js";

// Generate QR Code
const createQRCodeFromURL = (url) => {
   return new Promise((resolve, reject) => {
      QRCode.toDataURL(url, { errorCorrectionLevel: "H" }, (err, qrCode) => {
         if (err) {
            reject(err);
         } else {
            console.log(resolve(qrCode));
         }
      });
   });
};

// +++++++++++++++++++++++++++++++++++++++++++++
// Shorten one URL
export const shortenOne = AsyncHandler(async (req, res, next) => {
   const { originalUrl, customAlias, expiresAt } = req.body;

   // Validate Url
   if (!validator.isURL(originalUrl, { protocols: ["http", "https"], require_protocol: true, require_tld: true })) {
      return next(new AppError("Invalid Url", 400));
   }

   const nanoid = await customAlphabet(process.env.ALPHABET, 10);
   const newUrl = nanoid();

   // check if customAlias exists
   if (customAlias) {
      const existingUrl = await Url.findOne({ UrlID: customAlias });
      if (existingUrl) return next(new AppError("Custom name already exists", 400));
   }

   const url = await Url.create({
      originalUrl,
      shortUrl: originalUrl,
      UrlID: customAlias || newUrl,
      expiresAt: expiresAt || null,
   });

   res.status(201).json({
      status: "success",
      message: "URL Shortened Successfully",
      url: url.shortUrl,
   });
});

// Shorten Multiple URLs
export const shortenMany = AsyncHandler(async (req, res, next) => {
   const urlArray = req.body.urls;

   const urlPromises = urlArray.map(async (url) => {
      const { originalUrl, customAlias, expiresAt } = url;
      // Validate url
      if (!validator.isURL(originalUrl, { protocols: ["http", "https"], require_protocol: true, require_tld: true })) {
         return next(new AppError("Invalid Url", 400));
      }

      const nanoid = customAlphabet(process.env.ALPHABET, 10);
      const newUrl = nanoid();
      const parentDomain = "localhost:8080";

      // check if customAlias exists
      if (await Url.findOne({ UrlID: customAlias })) {
         return next(new AppError("Custom name already exists", 400));
      }

      const urlObj = await Url.create({
         originalUrl,
         shortUrl: customAlias ? `${parentDomain}/${customAlias}` : `${parentDomain}/${newUrl}`,
         UrlID: customAlias || newUrl,
         expiresAt: expiresAt || null,
      });
   });

   const allUrl = Promise.all(urlPromises);

   res.status(201).json({
      status: "success",
      message: "Urls Shortened Successfully",
      urls: allUrl,
      // return each URL and its short Url
   });
});

// Fetch one URL
export const fetchUrl = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;

   const url = await Url.findOne({ UrlID: id });

   if (!url) {
      return next(new AppError("Url not found", 404));
   }
   res.status(200).json({
      status: "success",
      redirect: url.originalUrl,
   });
});

// Update one URL
export const updateUrl = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const { originalUrl, customAlias, expiresAt } = req.body;
   const parentDomain = "localhost:8080";

   const url = await Url.findByIdAndUpdate(
      id,
      {
         originalUrl,
         shortUrl: customAlias ? `${parentDomain}/${customAlias}` : undefined,
         UrlID: customAlias,
         expiresAt,
      },
      // return the newly updated document
      { new: true }
   );

   if (!url) {
      return next(new AppError("Url not found", 404));
   }

   res.status(200).json({
      status: "success",
      message: "URL updated successfully",
      url: url.shortUrl,
   });
});

// Auto Delete Expired URLs
export const autoDeleteExpiredUrl = AsyncHandler(async (req, res, next) => {
   const url = await Url.deleteMany({ expiresAt: { $lte: new Date() } });
   if (!url) return next(new AppError("Url Not Found", 404));
});

// Delete one URL
export const deleteUrl = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const url = await Url.deleteOne({ id });

   if (!url) return next(new AppError("Url Not Found", 404));

   res.status(200).json({
      status: "success",
      message: "URL deleted successfully",
   });
});

// Create QRCode
export const createQRCode = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const url = await Url.findOne({ UrlID: id });
   if (!url) return next(new AppError("Url Not Found", 404));
   // generate QR Code
   const qrCode = await createQRCodeFromURL(url.originalUrl);
   // Add QR Code to the Url Document in DB
   url.QRCode = qrCode;
   url.save();
   res.status(200).json({
      status: "success",
      message: "QRCode created successfully",
      qrCode,
   });
});
