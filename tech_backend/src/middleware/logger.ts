import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { existsSync } from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import getPathInfo from "../utils/pathHelper";

const { __dirname } = getPathInfo(import.meta.url);

const logEvents = async (message: string, fileName: string) => {
  const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
  const logMsg = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!existsSync(path.join(__dirname, "..", "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "..", "logs", fileName),
      logMsg
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
