import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();
import Post from "../models/post.model.js"; // Import the Post model
import mongoose from "mongoose";

// Fetch full post details for each saved post ID

export const getUserSavedPosts = async (req, res) => {

  const clerkUserId = req.auth?.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json("User not found");
  }


  const savedPostIds = user.savedPosts || [];


  try {
    const savedPosts = await Post.find({ _id: { $in: savedPostIds } });


    res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json("Internal server error");
  }
};



export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return res.status(404).json("User not found");
  }

  console.log("User savedPostIds before update:", user.savedPosts);
  console.log("Post ID to save/unsave:", postId);

  // Check if the post ID is already in the savedPosts array
  const isSaved = user.savedPosts.includes(postId);

  try {
    if (!isSaved) {
      // Save the post by adding the post ID to the savedPosts array
      await User.findByIdAndUpdate(user._id, {
        $push: { savedPosts: postId },
      });
      res.status(200).json("Post saved");
    } else {
      // Unsaved the post by removing the post ID from the savedPosts array
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedPosts: postId },
      });
      res.status(200).json("Post unsaved");
    }
  } catch (error) {
    console.error("Error updating savedPosts:", error);
    res.status(500).json("Internal server error");
  }
};
