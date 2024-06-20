import express from "express";
import authenticateRoute from "../middleware/authenticateRoute.js";
import {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
} from "../controllers/post-controllers.js";

const router = express.Router();

router.get("/feed", authenticateRoute, getFeedPosts);
router.get("/:id", authenticateRoute, getPost);
router.get("/user/:username", authenticateRoute, getUserPosts);
router.post("/create", authenticateRoute, createPost);
router.delete("/:id", authenticateRoute, deletePost);
router.put("/like/:id", authenticateRoute, likeUnlikePost);
router.put("/reply/:id", authenticateRoute, replyToPost);

export default router;
