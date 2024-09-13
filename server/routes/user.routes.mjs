import express from "express";
import userModel from "../models/userModel.mjs";

const router = express.Router();

router.get("/getUsers", async (req, res) => {
  try {
    const users = await userModel.find();

    const userInformation = users.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        countriesVisited: user.countries_visited,
      };
    });

    return res.status(200).json({
      success: true,
      message: userInformation,
    });
  } catch (err) {
    console.log(err);
  }
});

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
