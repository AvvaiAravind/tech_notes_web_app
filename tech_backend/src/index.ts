import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import errHandler from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import root from "./routes/root.js";
import getPathInfo from "./utils/pathHelper.js";

const { __dirname } = getPathInfo(import.meta.url);

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware

//cors
app.use(cors());
//req logger
app.use(logger);
// Middleware to parse JSON
app.use(express.json());
// cookie parser
app.use(cookieParser())
// Middleware for giving  files
app.use("/", express.static(path.join(__dirname, "..", "public")));

// Basic route to test the server
app.use("/", root);

// 404 route

app.all(/.*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
