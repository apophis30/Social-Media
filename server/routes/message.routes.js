import express from "express";
import authenticateRoute from "../middleware/authenticateRoute.js";
import {
  getMessages,
  sendMessage,
  getConversations,
} from "../controllers/user-message-controllers.js";

const router = express.Router();

router.get("/conversations", authenticateRoute, getConversations);
router.post("/", authenticateRoute, sendMessage);
router.get("/:otherUserId", authenticateRoute, getMessages);

export default router;
