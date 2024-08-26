import mongoose, { Schema } from "mongoose";

const countrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const countryModel = mongoose.model("Country", countrySchema);

export default countryModel;
