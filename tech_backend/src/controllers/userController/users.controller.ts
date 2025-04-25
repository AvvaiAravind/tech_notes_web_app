import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import z from "zod";
import User from "../../models/user.model";
import { catchAsync } from "../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../utils/errorSender";
import getAllUsers from "./get/getAllUsers";
import createNewUser from "./create/createNewUser";

export { getAllUsers, createNewUser };

// @desc update user
// @route patch /users
// @access private

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

// @desc delete user
// @route delete /users
// @access private

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default { getAllUsers, createNewUser, updateUser, deleteUser };
