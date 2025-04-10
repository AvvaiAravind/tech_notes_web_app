import { Request, Response } from "express";
import { logEvents } from "./logger";

const errHandler = (err: Error, req: Request, res: Response) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers?.origin}`,
    "errLog.log"
  );
  console.log(err.stack);
  const status = res.statusCode ? res.statusCode : 500; // internal server error

  res.status(status);
  res.json({ message: err.message });
};

export default errHandler