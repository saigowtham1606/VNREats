import { useEffect, useState } from "react";
import axios from "axios";

function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const fetchReservations = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/reservations"
            );

            setReservations(response.data);
        } catch (error) {
            console.error(
                "Error fetching reservations:",
                error
            );

            setMessage("Failed to load reservations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const deleteReservation = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/reservations/${id}`
            );

            setMessage(
                "Reservation cancelled successfully."
            );

            fetchReservations();
        } catch (error) {
            console.error(
                "Error deleting reservation:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to cancel reservation."
            );
        }
    };

    if (loading) {
        return (
            <div className="admin-reservations-page">
                <h1>Loading reservations...</h1>
            </div>
        );
    }

    return (
        <div className="admin-reservations-page">
            <div className="admin-reservations-container">

                <h1>Manage Reservations</h1>

                <p className="admin-reservations-subtitle">
                    View and manage customer table reservations.
                </p>

                {message && (
                    <p className="admin-reservations-message">
                        {message}
                    </p>
                )}

                {reservations.length === 0 ? (
                    <div className="no-reservations">
                        <h2>No Reservations</h2>

                        <p>
                            Customer reservations will appear here
                            once they are made.
                        </p>
                    </div>
                ) : (
                    <div className="reservations-list">

                        {reservations.map((reservation) => (
                            <div
                                className="admin-reservation-card"
                                key={reservation._id}
                            >

                                <div className="reservation-header">

                                    <div>
                                        <h2>
                                            {reservation.customerName}
                                        </h2>

                                        <p>
                                            Reservation #
                                            {reservation._id
                                                .slice(-6)
                                                .toUpperCase()}
                                        </p>
                                    </div>

                                    <span className="reservation-guests">
                                        {reservation.numberOfGuests}{" "}
                                        {reservation.numberOfGuests === 1
                                            ? "Guest"
                                            : "Guests"}
                                    </span>

                                </div>

                                <div className="reservation-details">

                                    <div className="reservation-detail">
                                        <span className="detail-label">
                                            📞 Phone
                                        </span>

                                        <strong>
                                            {reservation.phoneNumber}
                                        </strong>
                                    </div>

                                    <div className="reservation-detail">
                                        <span className="detail-label">
                                            📅 Date
                                        </span>

                                        <strong>
                                            {reservation.date}
                                        </strong>
                                    </div>

                                    <div className="reservation-detail">
                                        <span className="detail-label">
                                            🕐 Time
                                        </span>

                                        <strong>
                                            {reservation.time}
                                        </strong>
                                    </div>

                                    <div className="reservation-detail">
                                        <span className="detail-label">
                                            🪑 Table
                                        </span>

                                        <strong>
                                            Table{" "}
                                            {
                                                reservation.tableId
                                                    ?.tableNumber
                                            }
                                        </strong>

                                        <span>
                                            Capacity:{" "}
                                            {
                                                reservation.tableId
                                                    ?.capacity
                                            }
                                        </span>
                                    </div>

                                </div>

                                <div className="reservation-actions">

                                    <button
                                        className="cancel-reservation-btn"
                                        onClick={() =>
                                            deleteReservation(
                                                reservation._id
                                            )
                                        }
                                    >
                                        Cancel Reservation
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default AdminReservations;