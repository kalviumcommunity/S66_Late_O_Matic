require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/AuthMiddleware");


router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "username email");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
});


router.post("/users", authMiddleware, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: "Could not create a new user", error: error.message });
    }
});

// Update a user (hash password if changed)
router.put("/users/:id", authMiddleware, async (req, res) => {
    try {
        let updateData = req.body;
        if (req.body.password) updateData.password = await bcrypt.hash(req.body.password, 10);

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Could not update the user", error: error.message });
    }
});

// Delete a user (Admin only)
router.delete("/users/:id", authMiddleware, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Could not delete the user", error: error.message });
    }
});

// User Signup
router.post(
    "/sign-up",
    [
        check("username", "Username is required").not().isEmpty(),
        check("email", "Valid email is required").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const { username, email, password } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) return res.status(400).json({ message: "Email already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
);

// User Login
router.post("/login", async (req, res) => {
    try {
        console.log("Login attempt:", req.body); // Log incoming data

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for user:", email);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in environment variables!");
            return res.status(500).json({ message: "Internal server error: missing JWT secret" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Login successful for user:", email);
        res.status(200).json({ 
            message: "Login successful", 
            token, 
            user: { id: user._id, username: user.username, email: user.email } 
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Protected Dashboard Route
router.get("/dashboard", authMiddleware, (req, res) => {
    res.status(200).json({ message: "Welcome to your dashboard", user: req.user });
});

// Register
router.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
