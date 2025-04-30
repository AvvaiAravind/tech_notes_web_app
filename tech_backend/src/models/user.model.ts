import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  userId: string;
  password: string;
  roles: string[];
  active: boolean;
}

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        default: "Employee",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        // Remove the password field from the response
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform: (_doc, ret) => {
        // Remove the password field from the response
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = model<IUser>("User", userSchema);

export default User;
