import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/user-auth-controllers.js";
import authenticateRoute from "../middleware/authenticateRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", authenticateRoute, followUnFollowUser);
router.put("/update/:id", authenticateRoute, updateUser);

export default router;
