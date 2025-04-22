import { Document, model, Schema, Types } from "mongoose";
import { assignTicket } from "../utils/ticketAssigner";

interface INote extends Document {
  user: Types.ObjectId;
  ticket: number;
  title: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticket: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

noteSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await assignTicket("note"); // assign ticket expect string of name of the document to be used as id for tracking here it noteSchema so note
      this.ticket = counter;
      next();
    } catch (error) {
      next(error as Error);
    }
  }
});

const Note = model<INote>("Note", noteSchema);

export default Note;
