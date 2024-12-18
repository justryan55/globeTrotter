import express from "express";
import userModel from "../models/userModel.mjs";

const router = express.Router();

router.get("/:userId/getUser", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      message: user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId/getUsers", async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await userModel.find();

    const filteredUsers = users.filter((user) => user.id !== userId);

    const userInformation = filteredUsers.map((user) => {
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

router.get("/getUser/:friendId", async (req, res) => {
  try {
    const friendId = req.params.friendId;
    const user = await userModel
      .findById(friendId)
      .select("-password -friends -followers -bio -createdAt -currentLocation");

    res.status(200).json({
      sucess: true,
      message: user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId/getCountriesVisisted", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    return res.status(200).json({
      success: true,
      message: user.countries_visited,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:userId/updateBio", async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    await userModel.findByIdAndUpdate(userId, { bio: content });

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

router.put("/:userId/toggleFollow", async (req, res) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    const user = await userModel.findById(userId);

    if (!user.friends.includes(friendId)) {
      await userModel.findByIdAndUpdate(userId, {
        $addToSet: { friends: friendId },
      });

      await userModel.findByIdAndUpdate(friendId, {
        $addToSet: { followers: userId },
      });

      return res.status(200).json({
        success: true,
        message: "Following user",
        content: friendId,
      });
    }

    if (user.friends.includes(friendId)) {
      await userModel.findByIdAndUpdate(userId, {
        $pull: { friends: friendId },
      });

      await userModel.findByIdAndUpdate(friendId, {
        $pull: { followers: userId },
      });

      return res.status(200).json({
        success: true,
        message: "Unfollowing user",
        content: friendId,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId/fetchFriends", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    const userFriends = user.friends;

    res.status(200).json({
      success: true,
      message: userFriends,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:userId/updateCurrentLocation", async (req, res) => {
  try {
    const { userId } = req.params;
    const { country } = req.body;
    await userModel.findByIdAndUpdate(userId, {
      currentLocation: country,
    });

    return res.status(200).json({
      success: true,
      message: "Location updated",
      updatedLocation: country,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId/fetchCurrentLocation", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    return res.status(200).json({
      success: true,
      message: "Location fetched",
      currentLocation: user.currentLocation,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:userId/fetchFollowers", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    return res.status(200).json({
      success: true,
      message: "Followers fetched",
      currentLocation: user.followers,
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
