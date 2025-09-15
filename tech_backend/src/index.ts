import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import corsOptions from "./config/corsOptions.js";
import errHandler from "./middleware/errorHandler.middleware.js";
import { logger } from "./middleware/logger.middleware.js";
import notFoundHandler from "./middleware/notFoundHandler.middleware.js";
import notesRouter from "./routes/notes.routes.js";
import rootRouter from "./routes/root.routes.js";
import usersRouter from "./routes/users.routes.js";
import { getPathInfo } from "./utils/pathHelper.js";

const { __dirname } = getPathInfo(import.meta.url);

const app = express();

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
app.use("/", rootRouter);
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

// 404 route
app.use(notFoundHandler);

// app.all(/.*/, (_req, res, next) => {
//   res.status(404);
//   const error = new Error("404 Not Found");
//   next(error);
// });

app.use(errHandler);

export default app;
