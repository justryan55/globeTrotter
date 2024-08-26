import express from "express";
import { Schema, mongoose } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;

// Todo - 05 - Create a new property on the user model called something like countries_visited which is an array of strings, these strings will eventually
//             map to the country model code
