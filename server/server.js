const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const Table = require("./models/Table");
const ratingRoutes = require("./routes/ratingRoutes");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/ratings", ratingRoutes);

app.get("/api/tables", async (req, res) => {
    try {
        const tables = await Table.find().sort({ tableNumber: 1 });

        console.log("TABLES FROM SERVER:", tables.map(t => t.tableNumber));

        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("VNREats backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});