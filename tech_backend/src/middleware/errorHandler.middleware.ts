import { NextFunction, Request, Response } from "express";
import { customConsoleLog } from "../utils/customLog";
import { AppError } from "../utils/errorWrapper";
import { getPathInfo } from "../utils/pathHelper";
import { logEvents } from "./logger.middleware";

const { __dirname } = getPathInfo(import.meta.url);

/* const sendResponse = (req: Request, res: Response) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
}; */

const errHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const env = process.env.NODE_ENV || "development";

  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers?.origin}`,
    "errLog.log"
  );
  if (env === "development") {
    // console.error(err.stack);
    customConsoleLog(
      `Error Message: ${err.devMessage || err.message}

      Error Data: ${JSON.stringify(err.data) || "No data available"}`,
      "Error Log"
    );
    // customConsoleLog(err.data);
  }

  const status = err.statusCode || 500; // internal server error
  res.status(status).json({
    success: false,
    devMessage: err.devMessage || null,
    message: err.message || "Something went wrong",
    data: err.data || null,
    metaData: err.metaData || null,
  });
};

export default errHandler;
