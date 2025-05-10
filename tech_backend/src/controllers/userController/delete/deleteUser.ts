import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import Note from "../../../models/note.model";
import User from "../../../models/user.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";
import { objectIdSchema } from "../../../utils/validationSchema";
import getIO from "../../../socket/socket";

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
      const { fieldErrors } = validatedParams.error.flatten();
      return next(
        errorSender({
          statusCode: 400,
          message: "Validation Id failed",
          data: fieldErrors,
          stackTrace: getStackTrace(),
        })
      );
    }

    const { _id } = validatedParams.data;

    const note = await Note.findOne({ user: _id }).lean().exec();

    if (note) {
      return next(
        errorSender({
          statusCode: 400,
          message: "User has assigned notes",
        })
      );
    }

    const userToDelete = await User.findById(_id).select("-password").exec();

    if (!userToDelete) {
      return next(
        errorSender({
          statusCode: 404,
          message: "User not found",
        })
      );
    }

    const result = await userToDelete.deleteOne();

    if (result.deletedCount !== 1) {
      return next(
        errorSender({
          statusCode: 500,
          message: "User deletion failed",
        })
      );
    }

    getIO().emit("user:deleted")

    return generateResponse({
      res,
      message: `${userToDelete.username} with ${userToDelete._id} deleted successfully`,
      data: userToDelete,
    });
  }
);

export default deleteUser;
