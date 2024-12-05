import express from "express";
import conversationModel from "../models/conversationModel.mjs";

const router = express.Router();

router.post("/:userId/newConversation", async (req, res) => {
  try {
    const existingConversation = await conversationModel.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });

    if (existingConversation) {
      return res.status(200).json({
        success: true,
        message: existingConversation,
      });
    }

    const newConversation = new conversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await newConversation.save();

    res.status(200).json({
      success: true,
      message: savedConversation,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId/getConversations", async (req, res) => {
  try {
    const conversation = await conversationModel.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json({
      success: true,
      message: conversation,
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:conversationId/deleteConversation", async (req, res) => {
  try {
    const { conversationId } = req.params;

    await conversationModel.findByIdAndUpdate(conversationId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    console.log(conversationId);
    return res.status(200).json({
      success: true,
      message: "Conversation deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
