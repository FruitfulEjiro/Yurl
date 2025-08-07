import winston, { format } from "winston";

const { combine, timestamp, label, printf, colorize, simple } = format;

const logFormat = printf(({ timestamp, level, message, label }) => {
   return `${timestamp} ${label} ${level} ${message}`;
});

const logger = winston.createLogger({
   format: combine(
      label({ label: "ERROR" }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      logFormat
   ),
   transports: [
      new winston.transports.File({
         filename: "log/error.log",
         level: "error",
      }),
      new winston.transports.File({ filename: "log/all.log" }),
      new winston.transports.Console({
         level: "error",
         format: combine(colorize(), simple()),
      }),
   ],
});

logger.exceptions.handle(
   new winston.transports.File({ filename: "log/exceptions.log" }),
   new winston.transports.Console()
);
logger.rejections.handle(
   new winston.transports.File({ filename: "log/rejections.log" }),
   new winston.transports.Console()
);

export default logger;
