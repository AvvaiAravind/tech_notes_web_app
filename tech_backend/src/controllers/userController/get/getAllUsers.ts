import { NextFunction, Request, Response } from "express";
import User from "../../../models/user.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // find the users if no return error through next
    const users: Array<Record<string, any>> = await User.find()
      .select("-password")
      .lean();
    if (!users || users.length === 0) {
      return next(
        errorSender({
          statusCode: 400,
          message: "No User Found",
        })
      );
    }
    return generateResponse({
      res,
      message: "Users retrieved successfully",
      data: users,
    });
  }
);

export default getAllUsers;
