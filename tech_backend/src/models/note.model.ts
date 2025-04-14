import { model, ObjectId, Schema } from "mongoose";

export interface INote extends Document {
  user: ObjectId;
  title: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>({});

const Note = model<INote>("note", noteSchema);

export default Note;
