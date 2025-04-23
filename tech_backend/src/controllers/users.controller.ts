import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import z from "zod";
import User from "../models/user.model";
import catchAsync from "../utils/catchAsyncError";

// @desc Get all users
// @route Get /users
// @access private

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find().select("-password").lean();
    if (!users) {
      return res.status(400).json({ message: "No users found" });
    }
    res.json(users);
  }
);

// @desc create user
// @route post /users
// @access private

const createNewUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z.array(z.string().nonempty("At least one role is required")),
});

type createNewUserBody = z.infer<typeof createNewUserSchema>;

const createNewUser = catchAsync(
  async (
    req: Request<{}, {}, createNewUserBody, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const validationResult = createNewUserSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation field",
        error: validationResult.error.flatten().fieldErrors,
      });
    }
    const { username, password, roles } = validationResult.data;

    // check duplicate
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate username" });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10); // with salt rounds

    const userObject = { username, password: hashedPwd, roles };

    const user = await User.create(userObject);

    if (user) {
      res.status(201).json({ message: "New user ${username} created" });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  }
);

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
