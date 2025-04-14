import { NextFunction, Request, Response } from "express";
import path from "path";
import getPathInfo from "../utils/pathHelper";
import { logEvents } from "./logger";

const {__dirname} = getPathInfo(import.meta.url)

const errHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers?.origin}`,
    "errLog.log"
  );
  console.error(err.stack);
  const status = res.statusCode ? res.statusCode : 500; // internal server error

  if (req.accepts("html")) {
      res.sendFile(path.join(__dirname,"..", "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
};

export default errHandler