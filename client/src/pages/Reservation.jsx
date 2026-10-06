import { useState } from "react";
import axios from "axios";

function Reservation() {
    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
        date: "",
        time: "",
        numberOfGuests: ""
    });

    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [loadingTables, setLoadingTables] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setMessage("");
    };

    const findAvailableTables = async () => {
        const { date, time, numberOfGuests } = formData;

        if (!date || !time || !numberOfGuests) {
            setMessage("Please enter the date, time and number of guests.");
            return;
        }

        try {
            setLoadingTables(true);
            setSelectedTable("");

            const response = await axios.get(
                "http://localhost:5000/api/reservations/available",
                {
                    params: {
                        date,
                        time,
                        guests: numberOfGuests
                    }
                }
            );

            setAvailableTables(response.data);

            if (response.data.length === 0) {
                setMessage("No tables are available for this time.");
            } else {
                setMessage(
                    `${response.data.length} table(s) available.`
                );
            }
        } catch (error) {
            console.error("Error finding tables:", error);
            setMessage("Failed to find available tables.");
        } finally {
            setLoadingTables(false);
        }
    };

    const makeReservation = async () => {
        if (!selectedTable) {
            setMessage("Please select a table first.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/reservations",
                {
                    ...formData,
                    tableId: selectedTable,
                    numberOfGuests: Number(formData.numberOfGuests)
                }
            );

            console.log("Reservation created:", response.data);

            setMessage("Reservation made successfully!");

            setFormData({
                customerName: "",
                phoneNumber: "",
                date: "",
                time: "",
                numberOfGuests: ""
            });

            setAvailableTables([]);
            setSelectedTable("");
        } catch (error) {
            console.error("Error making reservation:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to make reservation."
            );
        }
    };

    return (
        <div className="reservation-page">
            <div className="reservation-card">
                <h1>Make a Reservation</h1>

                <p className="reservation-subtitle">
                    Reserve a table at VNREats.
                </p>

                <div className="reservation-form">
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Number of Guests</label>
                        <input
                            type="number"
                            name="numberOfGuests"
                            min="1"
                            value={formData.numberOfGuests}
                            onChange={handleChange}
                            placeholder="Enter number of guests"
                        />
                    </div>

                    <button
                        className="find-tables-btn"
                        onClick={findAvailableTables}
                    >
                        {loadingTables
                            ? "Finding Tables..."
                            : "Find Available Tables"}
                    </button>
                </div>

                {availableTables.length > 0 && (
                    <div className="available-tables">
                        <h2>Available Tables</h2>

                        <div className="table-grid">
                            {availableTables.map((table) => (
                                <button
                                    key={table._id}
                                    className={
                                        selectedTable === table._id
                                            ? "table-option selected"
                                            : "table-option"
                                    }
                                    onClick={() =>
                                        setSelectedTable(table._id)
                                    }
                                >
                                    <strong>
                                        Table {table.tableNumber}
                                    </strong>

                                    <span>
                                        Capacity: {table.capacity}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <button
                            className="reserve-btn"
                            onClick={makeReservation}
                            disabled={!selectedTable}
                        >
                            Confirm Reservation
                        </button>
                    </div>
                )}

                {message && (
                    <p className="reservation-message">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Reservation;