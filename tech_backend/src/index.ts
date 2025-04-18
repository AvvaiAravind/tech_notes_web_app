import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose, { Error } from "mongoose";
import path from "path";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import errHandler from "./middleware/errorHandler.js";
import { logEvents, logger } from "./middleware/logger.js";
import root from "./routes/root.js";
import getPathInfo from "./utils/pathHelper.js";

const { __dirname } = getPathInfo(import.meta.url);

const app = express();
const PORT = process.env.PORT || 3500;

// connect db
connectDB();
// Middleware

//cors
app.use(cors(corsOptions));
//req logger
app.use(logger);
// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// cookie parser
app.use(cookieParser());
// Middleware for giving  files
app.use("/", express.static(path.join(__dirname, "..", "public")));

// Basic route to test the server
app.use("/", root);

// 404 route

app.all(/.*/, (req, res, next) => {
  res.status(404);
  const error = new Error("404 Not Found");
  next(error);
});

app.use(errHandler);

// Start the server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

mongoose.connection.on(
  "error",
  (err: Error & Partial<NodeJS.ErrnoException>) => {
    console.log(err);
    logEvents(
      `Message: ${err.message}, Name: ${err.name}, Code: ${err.code}, Syscall: ${err.syscall}, Hostname: ${"hostname" in err ? err.hostname : "N/A"}`,
      "mongoErrLog.log"
    );
  }
);
