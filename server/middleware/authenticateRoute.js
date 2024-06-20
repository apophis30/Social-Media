import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authenticateRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log("Unauthorized access", err.message);
  }
};

export default authenticateRoute;
