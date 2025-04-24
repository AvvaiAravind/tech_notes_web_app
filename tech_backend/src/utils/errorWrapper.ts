import { MongoServerError } from "mongodb";
import mongoose from "mongoose";
import { errorSender } from "./errorSender";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public devMessage?: string,
    public userMessage?: string,
    public data?: unknown
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
