const express = require("express");
const Menu = require("../models/Menu");

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
    try {
        const menuItems = await Menu.find().sort({ dishno: 1 });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new menu item
router.post("/", async (req, res) => {
    try {
        const newMenuItem = new Menu(req.body);
        const savedMenuItem = await newMenuItem.save();

        res.status(201).json(savedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a menu item
router.put("/:id", async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedMenuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete a menu item
router.delete("/:id", async (req, res) => {
    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);

        if (!deletedMenuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.json({
            message: "Menu item deleted successfully",
            deletedItem: deletedMenuItem
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;