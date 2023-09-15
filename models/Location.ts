import mongoose, { Schema } from "mongoose";

const LocationSchema = new Schema({
  name: String,
  type: String,
  address: {
    street_address: String,
    street_address2: String,
    city: String,
    state: String,
    zip_code: String,
  },
  company: String,
});

const Location =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

export default Location;
