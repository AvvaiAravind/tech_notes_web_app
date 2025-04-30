import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import User from "../../../models/user.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";

// @desc create user
// @route post /users
// @access private

export const RoleEnum = z.enum(["Employee", "Manager", "Admin"]);

const createNewUserSchema = z.object({
  userId: z.string().email(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z.array(RoleEnum).nonempty("At least one role is required"),
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
      return next(
        errorSender({
          statusCode: 400,
          message: "Validation failed",
          data: validationResult.error.flatten().fieldErrors,
          stackTrace: getStackTrace(),
        })
      );
    }

    const { userId, username, password, roles } = validationResult.data;

    // check duplicate
    const duplicate = await User.findOne({ userId }).lean();

    if (duplicate) {
      return next(
        errorSender({
          statusCode: 409,
          message: "Duplicate userId. User ID must be unique",
          data: null,
          stackTrace: getStackTrace(),
        })
      );
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10); // with salt rounds

    const userObject = { username, userId, password: hashedPwd, roles };

    const createdUser = await User.create(userObject);

    const user = await User.findById(createdUser._id)
      .select("-password")
      .lean();

    if (user) {
      return generateResponse({
        res,
        statusCode: 201,
        message: `New user ${username} created`,
        data: user,
      });
    }
  }
);

export default createNewUser;
