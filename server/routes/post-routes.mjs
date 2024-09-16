import express from "express";
import { checkToken } from "../config/helpers.mjs";
import postModel from "../models/postModel.mjs";
import userModel from "../models/userModel.mjs";

const router = express.Router();

router.post(`/:userId/newPost`, async (req, res) => {
  const { userId } = req.params;
  const { postedBy, message } = req.body;

  try {
    const newPost = new postModel({
      userId: userId,
      postedBy: postedBy,
      content: message,
      likedBy: [],
      totalLikes: 0,
    });

    await newPost.save();

    return res.status(200).json({
      success: true,
      message: "Post created",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get(`/:userId/getPosts`, async (req, res) => {
  try {
    const { userId } = req.params;
    const postedByUser = await postModel.find({ userId: userId });

    const user = await userModel.findById(userId);

    const userFollowing = user.friends;

    const friendsPosts = await Promise.all(
      userFollowing.map(async (friendId) => {
        const postedByFriend = await postModel.find({ userId: friendId });
        return postedByFriend.map((post) => ({
          postId: post.id,
          userId: post.userId,
          postedBy: post.postedBy,
          content: post.content,
          totalLikes: post.totalLikes,
          createdAt: post.createdAt,
        }));
      })
    );

    const usersPosts = postedByUser.map((post) => {
      return {
        postId: post.id,
        userId: post.userId,
        postedBy: post.postedBy,
        content: post.content,
        totalLikes: post.totalLikes,
        createdAt: post.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      usersPosts: usersPosts,
      friendsPosts: friendsPosts,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get(`/:postId/getPostLikes`, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.find({ _id: postId });
    const totalLikes = post[0].likedBy.length;

    return res.status(200).json({
      success: true,
      postLikes: totalLikes,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:postId/updatePostLikes", async (req, res) => {
  try {
    const { postId } = req.params;
    const authHeader = req.headers["authorisation"];

    const { userId } = await checkToken(authHeader);
    const user = userId;

    const post = await postModel.findByIdAndUpdate({ _id: postId });

    if (!post.likedBy.includes(user)) {
      post.likedBy.push(user);
    } else {
      post.likedBy.remove(user);
    }

    const updatedPost = await post.save();

    return res.status(200).json({
      success: true,
      updatedPostLikes: updatedPost.likedBy.length,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:postId/getComments", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postModel.findById(postId);
    const comments = post.comments;

    return res.status(200).json({
      success: true,
      message: comments,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:postId/newComment", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, postedBy, comment } = req.body;

    const post = await postModel.findById(postId);

    post.comments.push({ postedBy, comment });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "New comment created",
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
