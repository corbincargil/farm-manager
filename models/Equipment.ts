import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const EquipmentSchema = new Schema({
  name: String,
  type: String,
  owner: ObjectId,
  currentLocation: ObjectId,
  isRental: Boolean,
  currentRenter: ObjectId,
  serialNumber: {
    type: String,
    unique: true,
  },
});

const Equipment =
  mongoose.models.Equipment || mongoose.model("Equipment", EquipmentSchema);

export default Equipment;
