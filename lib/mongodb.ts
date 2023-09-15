import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URI) throw new Error("missing URI");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to db");
  } catch (error) {
    console.log("error connecting", error);
  }
};
