const errorHandler = (err, req, res, next) => {
   const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
   res.status(statusCode).json({
      success: false,
      status: err.status || "Something went wrong",
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Only include stack trace in development
   });
};

// Implement Error Handling for Unhandled Rejection and Uncaught Exceptions
export default errorHandler;
