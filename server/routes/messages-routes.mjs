import express from "express";
import messageModel from "../models/messageModel.mjs";

const router = express.Router();

router.post("/:conversationId/newMessage", async (req, res) => {
  const newMessage = new messageModel(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json({
      sucess: true,
      message: savedMessage,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/messages/:conversationId", async (req, res) => {
  try {
    const messages = await messageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({
      sucess: true,
      message: messages,
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
