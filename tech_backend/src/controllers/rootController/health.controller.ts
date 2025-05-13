import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import getIO from "../../socket/socket";
import { catchAsync } from "../../utils/catchAsyncError";
import { generateResponse } from "../../utils/generateResponse";

const getHealthStatus = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    const mongoConnected = mongoose.connection.readyState === 1;

    let socketConnected = false;
    const io = getIO(); // This will throw error if not connected
    socketConnected = !!io;

    generateResponse({
      res,
      statusCode: 200,
      message: "server is active",
      data: {
        socketConnected,
        mongoConnected,
      },
    });
  }
);

export default getHealthStatus;
