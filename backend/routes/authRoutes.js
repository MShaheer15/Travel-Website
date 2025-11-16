// Import dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // User model
const bcrypt = require("bcryptjs");     // For hashing passwords
const jwt = require("jsonwebtoken");    // For generating tokens

// =========================
// REGISTER ROUTE
// =========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Create new user
    const user = new User({ name, email, password }); 
    // Password hashing handled automatically by pre-save hook in User model
    await user.save();

    // 3️⃣ Send success response
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// LOGIN ROUTE
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id },                 // payload
      process.env.JWT_SECRET,           // secret key from .env
      { expiresIn: "1d" }               // token expiry
    );

    // 4️⃣ Send token + user info to client
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
