import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { existsSync } from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import getPathInfo from "../utils/pathHelper";
import { customConsoleLog } from "../utils/customConsoleLog";

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
  const time = new Date().toLocaleDateString();
  const method = req.method;
  const url = req.url;
  const path = req.path

  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");

 customConsoleLog(
   `\n📝 Request Log:\n\t- Time: ${time}\n\t- Method: ${method}\n\t- URL: ${url}\n\t- Path: ${path} \n`
 );
  
  next();
};

export { logEvents, logger };
