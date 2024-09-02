import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likedBy: {
      type: [String],
    },
    totalLikes: {
      type: Number,
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
