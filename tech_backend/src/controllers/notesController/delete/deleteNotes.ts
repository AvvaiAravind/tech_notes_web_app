import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import Note from "../../../models/note.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";
import { objectIdSchema } from "../../../utils/validationSchema";

// @desc Delete a note
// @route DELETE /notes/:_id
// @access Private

const deleteNoteSchema = z.object({
  _id: objectIdSchema, // note id
});

type deleteNoteIdParams = z.infer<typeof deleteNoteSchema>;

const deleteNote = catchAsync(
  async (
    req: Request<deleteNoteIdParams, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const validatedParams = deleteNoteSchema.safeParse(req.params);

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

    const noteToDelete = await Note.findById(_id).exec();

    if (!noteToDelete) {
      return next(
        errorSender({
          statusCode: 400,
          message: "Note not found",
        })
      );
    }

    const result = await noteToDelete.deleteOne();

    if (result.deletedCount !== 1) {
      return next(
        errorSender({
          statusCode: 500,
          message: "Note deletion failed",
        })
      );
    }

    return generateResponse({
      res,
      message: `${noteToDelete.title} with ${noteToDelete._id} deleted successfully`,
      data: noteToDelete,
    });
  }
);

export default deleteNote;
