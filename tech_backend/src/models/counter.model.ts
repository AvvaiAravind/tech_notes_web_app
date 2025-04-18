import { Document, model, Schema } from "mongoose";

// Create a Counter schema for ID tracking
interface ICounter extends Document {
  _id: string;
  seq: number;
}

const counterSchema = new Schema<ICounter>({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const Counter = model<ICounter>("Counter", counterSchema);

export default Counter;
