import user from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await user.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created Successfully",
      savedUser,
    });
  } catch (error) {
    console.log("Error", error);
    success: false, res.status(404).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await user.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "Wrong Credentials" });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ message: "Login Successfully", user: userExists, token });
  } catch (error) {
    console.log("login erroe:", error);
    res.status(400).json({
      success: false,
      message: "Internal Servewr Error",
    });
  }
};
