import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URI)
      throw new Error(
        "Database URI is not defined in the environment variables"
      );

    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB