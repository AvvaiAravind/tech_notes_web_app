import { NextFunction, Request, Response } from "express";
import { errorSender, getStackTrace } from "../utils/errorSender";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = errorSender({
    statusCode: 404,
    message: `Not Found ${req.originalUrl}`,
    stackTrace: getStackTrace(),
  });

  next(error);
};

export default notFoundHandler;