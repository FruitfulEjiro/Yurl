import { customAlphabet } from "nanoid";
import AsyncHandler from "express-async-handler";
import cron from "node-cron";

// Local Modules
import Url from "../model/UrlSchema.js";

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

   res.status(201).json({
      status: "URL Shortened Successfully",
      url: url.shortUrl,
   });
});

export const fetchUrl = AsyncHandler(async (req, res, next) => {
   const { id } = req.params;

   const url = await Url.findOne({ UrlID: id });

   console.log(`/${url.originalUrl}`);

   if (url) {
      res.status(200).json({
         status: "success",
         redirect: url.originalUrl,
      });
   }
});

export const deleteExpiredUrl = AsyncHandler(async (req, res) => {
   const url = await Url.deleteMany({ expiresAt: { $lte: new Date() } });
});
