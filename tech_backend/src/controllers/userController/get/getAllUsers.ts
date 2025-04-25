import { NextFunction, Request, Response } from "express";
import User from "../../../models/user.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender } from "../../../utils/errorSender";



const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // find the users if no return error through next
    const users = await User.find().select("-password").lean();
    if (!users) {
      return next(
        errorSender({
          statusCode: 400,
          message: "No User Found",
        })
      );
    }
    res.json(users);
  }
);

export default getAllUsers;
