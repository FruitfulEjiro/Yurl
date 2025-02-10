import { customAlphabet } from "nanoid";
import AsyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

// Local Modules
import Url from "../model/UrlSchema.js";

// +++++++++++++++++++++++++++++++++++++++++++++

export const shortenOne = AsyncHandler(async (req, res, next) => {
   const { originalUrl, customAlias, expiresAt } = req.body;

   const nanoid = customAlphabet(process.env.ALPHABET, 10);
   const newUrl = nanoid();
   const parentDomain = "localhost:8080";

   // check if customAlias exists
   if (await Url.findOne({ UrlID: customAlias })) {
      res.status(400).json({
         status: "Failed",
         message: "Custom Name already exists",
      });
   }

   const url = await Url.create({
      originalUrl,
      shortUrl: customAlias ? `${parentDomain}/${customAlias}` : `${parentDomain}/${newUrl}`,
      UrlID: customAlias || newUrl,
      expiresAt: expiresAt || null,
   });
   console.log(url);

   res.status(201).json({
      status: "URL Shortened Successfully",
      url: url.shortUrl,
   });
});

export const fetchUrl = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;

   const url = await Url.findOne({ UrlID: id });

   if (!url) {
      res.status(404).json({
         status: "Failed",
         message: "URL not found",
      });
   }
   res.status(200).json({
      status: "success",
      redirect: url.originalUrl,
   });
});

export const updateUrl = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const { originalUrl, customAlias, expiresAt } = req.body;
   const parentDomain = "localhost:8080";

   const url = await Url.findByIdAndUpdate(id, {
      originalUrl,
      shortUrl: customAlias ? `${parentDomain}/${customAlias}` : undefined,
      UrlID: customAlias,
      expiresAt,
   });

   res.status(200).json({
      status: "success",
      message: "URL updated successfully",
   });
});

export const autoDeleteExpiredUrl = AsyncHandler(async (req, res, next) => {
   const url = await Url.deleteMany({ expiresAt: { $lte: new Date() } });
});

export const deleteUrl = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;
   await Url.deleteOne({ id });

   res.status(200).json({
      status: "success",
      message: "URL deleted successfully",
   });
});
