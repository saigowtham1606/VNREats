const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
        dishno: {
            type: Number,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        dishname: {
            type: String,
            required: true
        },
        cuisine: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Menu", menuSchema);