import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from "dotenv"

dotenv.config()

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded:", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    // console.log("User attached to req:", req.user);
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Token failed or expired" });
  }
};

