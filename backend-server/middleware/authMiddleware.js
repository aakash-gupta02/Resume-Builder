import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from "dotenv"

dotenv.config()

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();

    // console.log("Decoded Token: ", decoded);


  } catch (err) {
    res.status(401).json({ message: "Token failed or expired" });
  }
};
