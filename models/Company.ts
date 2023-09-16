import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const CompanySchema = new Schema({
  name: String,
  type: String,
  main_address: {
    street_address: String,
    street_address2: String,
    city: String,
    state: String,
    zip_code: String,
  },
  locations: [ObjectId],
});

const Company =
  mongoose.models.Company || mongoose.model("Company", CompanySchema);

export default Company;
