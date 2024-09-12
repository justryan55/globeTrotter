import express from "express";
import userModel from "../models/userModel.mjs";

const router = express.Router();

router.put("/:userId/updateBio", async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    const user = await userModel.findByIdAndUpdate(userId, { bio: content });

    return res.status(200).json({
      success: true,
      message: "Bio updated",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId/getUserBio", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    const bio = user.bio;

    return res.status(200).json({
      success: true,
      message: "Bio successfully fetched",
      content: bio,
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
