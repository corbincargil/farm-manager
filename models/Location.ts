import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const LocationSchema = new Schema({
  name: String,
  type: String,
  company: ObjectId,
  address: {
    street_address: String,
    street_address2: String,
    city: String,
    state: String,
    zip_code: String,
    longitude: String,
    latitude: String,
  },
});

const Location =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

export default Location;
