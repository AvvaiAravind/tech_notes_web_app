import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import Note from "../../../models/note.model";
import User from "../../../models/user.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";
import { objectIdSchema } from "../../../utils/validationSchema";

// @desc delete user
// @route delete /users/:_id
// @access private

const deleteUserSchema = z.object({
  _id: objectIdSchema,
});

type deleteUserIdParams = z.infer<typeof deleteUserSchema>;

const deleteUser = catchAsync(
  async (
    req: Request<deleteUserIdParams, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const validatedParams = deleteUserSchema.safeParse(req.params);

    if (!validatedParams.success) {
      const { formErrors, fieldErrors } = validatedParams.error.flatten();
      return next(
        errorSender({
          statusCode: 400,
          message: "Validation Id failed",
          data: {
            formErrors,
            fieldErrors,
          },
          stackTrace: getStackTrace(),
        })
      );
    }

    const { _id } = validatedParams.data;

    const notes = await Note.findOne({ user: _id }).lean().exec;

    if (notes?.length) {
      return next(
        errorSender({
          statusCode: 400,
          message: "User has assigned notes",
        })
      );
    }

    const user = await User.findById(_id).exec();

    if (!user) {
      return next(
        errorSender({
          statusCode: 404,
          message: "User not found",
        })
      );
    }

    const result = await user.deleteOne();

    return generateResponse({
      res,
      message: `${user.username} with ${user._id} updated successfully`,
      data: result,
    });
  }
);

export default deleteUser;
