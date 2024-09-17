import express from "express";
import { Schema, mongoose } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    countries_visited: [{ type: String }],
    bio: {
      type: String,
      default:
        "A travel enthusiast sharing my adventures, tips, and travel stories to inspire your next journey.",
    },
    friends: [{ type: String }],
    followers: [{ type: String }],
    currentLocation: { type: String, default: "Australia" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
