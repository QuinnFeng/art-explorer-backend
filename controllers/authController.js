import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register new user
export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token, user: { id: newUser._id, username } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Login user
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    // Retrieve all arts from the database
    const users = await User.find({});

    if (!users.length) {
      return res.status(404).json({ message: "No Users found" });
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
