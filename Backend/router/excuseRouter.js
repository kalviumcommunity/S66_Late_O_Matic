const express = require("express");
const router = express.Router();
const Excuse = require("../model/excuse.model");
const authMiddleware = require("../middleware/AuthMiddleware");

// Fetch all excuses
router.get("/", async (req, res) => {
    try {
        const excuses = await Excuse.find().populate("created_by", "username");
        res.json(excuses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching excuses", error: error.message });
    }
});

// Fetch excuses created by logged-in user
router.get("/user/:id", authMiddleware, async (req, res) => {
    try {
        const myExcuses = await Excuse.find({ created_by: req.params.id });
        res.json(myExcuses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's excuses", error: error.message });
    }
});

// Add new excuse
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { excuse } = req.body;
        const created_by = req.user.id;

        if (!excuse) return res.status(400).json({ message: "Excuse is required" });

        const newExcuse = new Excuse({ excuse, created_by, likes: 0, liked_by: [] });
        await newExcuse.save();

        res.status(201).json({ message: "Excuse added successfully!", excuse: newExcuse });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Update excuse (Only if created by the logged-in user)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const excuse = await Excuse.findById(req.params.id);
        if (!excuse) return res.status(404).json({ message: "Excuse not found" });

        if (excuse.created_by.toString() !== req.user.id)
            return res.status(403).json({ message: "Unauthorized to update this excuse" });

        excuse.excuse = req.body.excuse;
        await excuse.save();
        res.json({ message: "Excuse updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Like or Unlike an excuse
router.post("/like/:id", authMiddleware, async (req, res) => {
    try {
        const excuse = await Excuse.findById(req.params.id);
        if (!excuse) return res.status(404).json({ message: "Excuse not found" });

        const userId = req.user.id;

        if (excuse.liked_by.includes(userId)) {
            // Unlike if user already liked it
            excuse.likes -= 1;
            excuse.liked_by = excuse.liked_by.filter((id) => id.toString() !== userId);
        } else {
            // Like if user has not liked it yet
            excuse.likes += 1;
            excuse.liked_by.push(userId);
        }

        await excuse.save();
        return res.json({
            message: excuse.liked_by.includes(userId) ? "Excuse liked!" : "Excuse unliked!",
            likes: excuse.likes,
            liked_by: excuse.liked_by, // Ensure frontend receives updated liked_by array
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete excuse (Only if created by the logged-in user)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const excuse = await Excuse.findById(req.params.id);
        if (!excuse) return res.status(404).json({ message: "Excuse not found" });

        if (excuse.created_by.toString() !== req.user.id)
            return res.status(403).json({ message: "Unauthorized to delete this excuse" });

        await Excuse.deleteOne({ _id: req.params.id }); // Use deleteOne instead of remove()
        res.json({ message: "Excuse deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
