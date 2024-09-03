import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    postedBy: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
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
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
