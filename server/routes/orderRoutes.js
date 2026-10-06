const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Place a new order
router.post("/", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = [
            "Pending",
            "Confirmed",
            "Preparing",
            "Ready",
            "Completed",
            "Cancelled"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;