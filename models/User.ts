import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true },
  hash: String,
  company: ObjectId,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
