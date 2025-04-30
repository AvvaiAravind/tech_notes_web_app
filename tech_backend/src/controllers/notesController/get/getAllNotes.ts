import { NextFunction, Request, Response } from "express";
import Note from "../../../models/note.model";
import User from "../../../models/user.model";
import { catchAsync } from "../../../utils/catchAsyncError";
import { errorSender } from "../../../utils/errorSender";
import { generateResponse } from "../../../utils/generateResponse";

// @desc Get all notes
// @route GET /notes
// @access Private

const getAllNotes = catchAsync(
  async (_req: Request, res: Response, next: NextFunction) => {
    //find the notes if nothing is there then return empty array
    const notes = await Note.find().lean();

    if (!notes) {
      return next(
        errorSender({
          statusCode: 400,
          message: "No notes found",
        })
      );
    }

    // sending username with every notes do know which person created it
    const notesWithUsername = await Promise.all(
      notes.map(async (note) => {
        const user = await User.findById(note.userId).lean().exec();

        return { ...note, username: user?.username };
      })
    );

    return generateResponse({
      res,
      message: "Notes retrieved successfully",
      data: notesWithUsername,
    });
  }
);

export default getAllNotes;
