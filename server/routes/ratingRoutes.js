const express = require("express");
const Rating = require("../models/Rating");

const router = express.Router();

// Submit a rating
router.post("/", async (req, res) => {
    try {
        const { rating, comment } = req.body;

        if (!rating) {
            return res.status(400).json({
                message: "Rating is required"
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5"
            });
        }

        const newRating = new Rating({
            rating,
            comment: comment || ""
        });

        const savedRating = await newRating.save();

        res.status(201).json(savedRating);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Get all ratings
router.get("/", async (req, res) => {
    try {
        const ratings = await Rating.find().sort({ createdAt: -1 });

        res.json(ratings);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;