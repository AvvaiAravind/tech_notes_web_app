import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  userId: string;
  password: string;
  roles: string[];
  active: boolean;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
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
});

const User = model<IUser>("User", userSchema);

export default User;
