import { customConsoleLog } from "./customLog";
import { AppError } from "./errorWrapper";

type ErrorSenderType = {
  statusCode: number;
  message: string;
  devMessage?: string | null;
  stackTrace?: string | null;
  data?: any;
};

export const getStackTrace = () => {
  const obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  const stackLines = (obj as any).stack.split("\n");
  // Log the entire stack trace for debugging purposes with formatting
  if (process.env.NODE_ENV === "development") {
    customConsoleLog(stackLines.join("\n"), "Full stack Trace");
  }

  // Adjust the index based on the structure of your stack trace
  const relevantStackLine =
    stackLines.length > 1 ? stackLines[1] : stackLines[0];
  return relevantStackLine.trim();
};

export const errorSender = ({
  statusCode = 500,
  message = "Something Went Wrong",
  devMessage = null,
  stackTrace,
  data,
}: ErrorSenderType) => {
  const error = new AppError(statusCode, devMessage || message, message, data);

  // Log stack trace only in development
  if (process.env.NODE_ENV === "development" && stackTrace) {
    customConsoleLog(stackTrace, "Stack Trace in the error handler function");
  }

  customConsoleLog(message, "Error Message---------");
  return error;
};
