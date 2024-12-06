import mongoose, { Schema } from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

conversationSchema.pre(["find", "findOne", "findById"], function () {
  this.where({ isDeleted: { $ne: true } });
});

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;
