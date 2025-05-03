import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import Note from "../../../models/note.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender, getStackTrace } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";
import { objectIdSchema } from "../../../utils/validationSchema";

// @desc Create new note
// @route POST /notes
// @access Private

const createNewNoteSchema = z.object({
  userId: objectIdSchema, // currently send this in body until we implement auth middleware
  title: z
    .string()
    .min(5, "Title must be at least 3 characters")
    .max(25, "Title must be at most 25 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters"),
});

type createNewNoteBody = z.infer<typeof createNewNoteSchema>;

const createNewNote = catchAsync(
  async (
    req: Request<{}, {}, createNewNoteBody, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const validationResult = createNewNoteSchema.safeParse(req.body);

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

    const noteToCreate = validationResult.data;

    const createdNote = await Note.create(noteToCreate);
    /*  const createdNote = await noteDoc.save(); // using save to trigger pre save hook in the model schema */

    if (createdNote) {
      return generateResponse({
        res,
        statusCode: 201,
        message: "New note created successfully",
        data: createdNote,
      });
    }
  }
);

export default createNewNote;
