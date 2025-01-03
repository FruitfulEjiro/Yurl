import { customAlphabet } from "nanoid";
import AsyncHandler from "express-async-handler";

// Local Modules
import Url from "../model/UrlSchema.js";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const shortenOne = AsyncHandler(async (req, res, next) => {
   const { originalUrl, customAlias, expiresAt } = req.body;

   const nanoid = customAlphabet(alphabet, 10);
   const newUrl = nanoid();
   const parentDomain = "localhost:8080";

   console.log("new url", newUrl);

   const url = await Url.create({
      originalUrl,
      shortUrl: `${parentDomain}/${newUrl}`,
      UrlID: newUrl,
      customAlias: customAlias || "",
      expiresAt: expiresAt || null,
   });

   res.status(201).json({
      status: "url shortened success",
      url: url.shortUrl,
   });
});
