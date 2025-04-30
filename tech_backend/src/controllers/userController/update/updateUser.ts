import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import User from "../../../models/user.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";
import { objectIdSchema } from "../../../utils/validationSchema";
import { RoleEnum } from "../post/createNewUser";

// @desc update user
// @route patch /users/:_id
// @access private

const updateAUserSchema = z.object({
  userId: z.string().email().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),
  roles: z.array(RoleEnum).nonempty("At least one role is required").optional(),
  active: z.boolean().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

const updateUserIdSchema = z.object({
  _id: objectIdSchema,
});

type updateAUserBody = z.infer<typeof updateAUserSchema>;
type updateUserIdParams = z.infer<typeof updateUserIdSchema>;

const updateUser = catchAsync(
  async (
    req: Request<updateUserIdParams, {}, updateAUserBody, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const validatedBody = updateAUserSchema.safeParse(req.body);
    const validatedParams = updateUserIdSchema.safeParse(req.params);

    if (!validatedParams.success) {
      const { fieldErrors } = validatedParams.error.flatten();
      return next(
        errorSender({
          statusCode: 400,
          message: "Validation of Id failed",
          data: fieldErrors,
          stackTrace: getStackTrace(),
        })
      );
    }

    if (!validatedBody.success) {
      // error
      const { fieldErrors } = validatedBody.error.flatten();

      return next(
        errorSender({
          statusCode: 400,
          message: "Validation of Body failed",
          data: fieldErrors,
          stackTrace: getStackTrace(),
        })
      );
    }

    const { username, userId, roles, active, password } = validatedBody.data;
    const { _id } = validatedParams.data;

    const user = await User.findById(_id).exec();

    if (!user) {
      return next(
        errorSender({
          statusCode: 404,
          message: "User not found",
        })
      );
    }

    username && (user.username = username);
    userId && (user.userId = userId);
    roles && (user.roles = roles);
    active && (user.active = active);
    password && (user.password = password);

    const updatedUser = await user.save();

    return generateResponse({
      res,
      message: `${updatedUser.username} is updated successfully`,
      data: updatedUser,
    });
  }
);

export default updateUser;
