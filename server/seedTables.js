const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Table = require("./models/Table");

dotenv.config();

const tableData = [
    { tableNumber: 1, capacity: 2 },
    { tableNumber: 2, capacity: 2 },
    { tableNumber: 3, capacity: 2 },

    { tableNumber: 4, capacity: 4 },
    { tableNumber: 5, capacity: 4 },
    { tableNumber: 6, capacity: 4 },
    { tableNumber: 7, capacity: 4 },

    { tableNumber: 8, capacity: 6 },
    { tableNumber: 9, capacity: 6 },
    { tableNumber: 10, capacity: 6 },

    { tableNumber: 11, capacity: 8 },
    { tableNumber: 12, capacity: 8 }
];

const seedTables = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Table.deleteMany({});
        await Table.insertMany(tableData);

        console.log(`✅ ${tableData.length} tables inserted successfully!`);

        await mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding tables:", error);
        process.exit(1);
    }
};

seedTables();