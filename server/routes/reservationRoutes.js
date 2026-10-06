const express = require("express");
const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

const router = express.Router();

// Get available tables for a specific date, time and number of guests
router.get("/available", async (req, res) => {
    try {
        const { date, time, guests } = req.query;

        if (!date || !time || !guests) {
            return res.status(400).json({
                message: "Date, time and number of guests are required"
            });
        }

        const numberOfGuests = Number(guests);

        if (numberOfGuests < 1) {
            return res.status(400).json({
                message: "Number of guests must be at least 1"
            });
        }

        // Find tables large enough for the group
        const suitableTables = await Table.find({
            capacity: { $gte: numberOfGuests }
        }).sort({ capacity: 1 });

        // Find tables already reserved for this date and time
        const existingReservations = await Reservation.find({
            date,
            time
        }).select("tableId");

        const reservedTableIds = existingReservations.map(
            reservation => reservation.tableId.toString()
        );

        // Remove already reserved tables
        const availableTables = suitableTables.filter(
            table => !reservedTableIds.includes(table._id.toString())
        );

        res.json(availableTables);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Create a reservation
router.post("/", async (req, res) => {
    try {
        const {
            tableId,
            customerName,
            phoneNumber,
            date,
            time,
            numberOfGuests
        } = req.body;

        if (
            !tableId ||
            !customerName ||
            !phoneNumber ||
            !date ||
            !time ||
            !numberOfGuests
        ) {
            return res.status(400).json({
                message: "All reservation fields are required"
            });
        }

        // Check that the table exists
        const table = await Table.findById(tableId);

        if (!table) {
            return res.status(404).json({
                message: "Table not found"
            });
        }

        // Check that the table can accommodate the guests
        if (numberOfGuests > table.capacity) {
            return res.status(400).json({
                message: `This table can only accommodate ${table.capacity} people`
            });
        }

        // Check whether the table is already reserved
        const existingReservation = await Reservation.findOne({
            tableId,
            date,
            time
        });

        if (existingReservation) {
            return res.status(409).json({
                message: "This table is already reserved for that date and time"
            });
        }

        const newReservation = new Reservation({
            tableId,
            customerName,
            phoneNumber,
            date,
            time,
            numberOfGuests
        });

        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Get all reservations
router.get("/", async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate("tableId")
            .sort({ createdAt: -1 });

        res.json(reservations);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update a reservation
router.put("/:id", async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedReservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.json(updatedReservation);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete a reservation
router.delete("/:id", async (req, res) => {
    try {
        const deletedReservation =
            await Reservation.findByIdAndDelete(req.params.id);

        if (!deletedReservation) {
            return res.status(404).json({
                message: "Reservation not found"
            });
        }

        res.json({
            message: "Reservation deleted successfully",
            deletedReservation
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;