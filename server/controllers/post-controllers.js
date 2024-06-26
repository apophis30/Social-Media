import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { img } = req.body;

    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ msg: "PostedBy and text fields are required" });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to create post" });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({ error: "Text is too long" });
    }

    if (img) {
      const uploadResponse = await cloudinary.uploader.upload(img);
      img = uploadResponse.secure_url;
    }

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ error: "Post not found" });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized to delete post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in deletePostProfile: ", err.message);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    const userLiked = post.likes.includes(userId);

    if (userLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      return res.status(200).json({ msg: "Post unliked successfully" });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ msg: "Post liked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in likeUnlikePost: ", err.message);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const profilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Page not found" });
    }

    const reply = { userId, text, profilePic, username };

    post.replies.push(reply);
    await post.save();

    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in likeUnlikePost: ", err.message);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: 1,
    });

    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getFeedPost: ", err.message);
  }
};

const getUserPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdBy: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
};
