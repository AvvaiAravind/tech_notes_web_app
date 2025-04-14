import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import corsOptions from "./config/corsOptions.js";
import { logger } from "./middleware/logger.js";
import root from "./routes/root.js";
import getPathInfo from "./utils/pathHelper.js";
import errHandler from "./middleware/errorHandler.js";

const { __dirname } = getPathInfo(import.meta.url);

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware

//cors
app.use(cors(corsOptions));
//req logger
app.use(logger);
// Middleware to parse JSON
app.use(express.json());
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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
