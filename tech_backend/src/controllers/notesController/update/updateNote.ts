import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { z } from "zod";
import Note from "../../../models/note.model";
import getIO from "../../../socket/socket";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";
import { objectIdSchema } from "../../../utils/validationSchema";

// @desc Update a note
// @route PATCH /notes/:_id
// @access Private

const updateNoteSchema = z.object({
  userId: objectIdSchema,
  title: z
    .string()
    .min(5, "Title must be at least 3 characters")
    .max(25, "Title must be at most 25 characters")
    .optional(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .optional(),
  completed: z.boolean(),
});

const updateNoteIdSchema = z.object({
  _id: objectIdSchema,
});

type updateNoteBody = z.infer<typeof updateNoteSchema>;
type updateNoteIdParams = z.infer<typeof updateNoteIdSchema>;

const updateNote = catchAsync(
  async (
    req: Request<updateNoteIdParams, {}, updateNoteBody, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const validatedBody = updateNoteSchema.safeParse(req.body);
    const validatedParams = updateNoteIdSchema.safeParse(req.params);

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

    const { userId, title, content, completed } = validatedBody.data;
    const { _id } = validatedParams.data;

    const noteToUpdate = await Note.findById(_id).exec();

    if (!noteToUpdate) {
      return next(
        errorSender({
          statusCode: 404,
          message: "User not found",
        })
      );
    }

    noteToUpdate.userId = new Types.ObjectId(userId);
    if (typeof title === "string") noteToUpdate.title = title;
    if (typeof content === "string") noteToUpdate.content = content;
    if (typeof completed === "boolean") noteToUpdate.completed = completed;

    const updatedNote = await noteToUpdate.save();

    getIO().emit("note:updated");

    return generateResponse({
      res,
      message: `${updatedNote.title} is updated successfully`,
      data: updatedNote,
    });
  }
);

export default updateNote;
