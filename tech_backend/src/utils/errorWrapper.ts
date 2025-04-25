import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import { errorSender } from "./errorSender";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public devMessage?: string,
    public userMessage?: string,
    public data?: unknown,
    public metaData?: unknown 
  ) {
    super(devMessage);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

function isDuplicateKeyError(error: any): error is MongoServerError {
  return error instanceof MongoServerError && error.code === 11000;
}

function isValidationError(
  error: any
): error is mongoose.Error.ValidationError {
  return error instanceof mongoose.Error.ValidationError;
}

export function errorWrapper(error: AppError, statusCode: number = 500) {
  // type guard for validation

  if (isDuplicateKeyError(error)) {
    return errorSender({ statusCode: 400, message: error.message });
  }

  if (isValidationError(error)) {
    return errorSender({ statusCode: 400, message: error.message });
  }
  console.log(error, "Error Object from error wrapper");

  return errorSender({
    statusCode,
    message: error.message,
    devMessage: error.devMessage,
    stackTrace: null,
    data: error.data,
  });
}

/* export function errorWrapper(error: AppError, statusCode: number = 500) {
  if (error instanceof MongoServerError) {
    if (error.code === 11000) {
      return errorSender(400, error.message);
    }
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return errorSender(400, error.message);
  }
  console.log(error, "Error Object from error wrapper");
  return errorSender(
    statusCode,
    error.message,
    error.devMessage,
    "",
    error.data
  );
}  */

/* import { Response } from "express";
import { ICustomRequest } from "./customTypes.js";
import { getUserWithOrg } from "./user.js";
import { generateToken } from "./generateTokens.js";

type generateResponseType = {
  req: ICustomRequest;
  res: Response;
  status: number;
  jsonMessage: string;
  data?: any;
};

export const generateResponse = async ({
  req,
  res,
  status,
  jsonMessage,
  data = [],
}: generateResponseType) => {
  const userId = req?.user?._id;
  const userDataWithOrg = await getUserWithOrg(userId);
  const accessToken = generateToken("access", userDataWithOrg[0], req);
  return res
    .header("Authorization", accessToken as string)
    .status(status)
    .json({ message: jsonMessage, data });
}; */