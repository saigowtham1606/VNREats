import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const statuses = [
        "Pending",
        "Confirmed",
        "Preparing",
        "Ready",
        "Completed",
        "Cancelled"
    ];

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/orders"
            );

            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setMessage("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/orders/${orderId}/status`,
                { status }
            );

            setMessage("Order status updated successfully.");

            fetchOrders();
        } catch (error) {
            console.error("Error updating order:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to update order status."
            );
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    if (loading) {
        return (
            <div className="admin-orders-page">
                <h1>Loading orders...</h1>
            </div>
        );
    }

    return (
        <div className="admin-orders-page">
            <div className="admin-orders-container">

                <h1>Manage Orders</h1>

                <p className="admin-orders-subtitle">
                    View and manage customer orders.
                </p>

                {message && (
                    <p className="admin-orders-message">
                        {message}
                    </p>
                )}

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <h2>No Orders Yet</h2>

                        <p>
                            Customer orders will appear here once
                            they are placed.
                        </p>
                    </div>
                ) : (
                    <div className="orders-list">

                        {orders.map((order) => (
                            <div
                                className="admin-order-card"
                                key={order._id}
                            >

                                <div className="order-header">

                                    <div>
                                        <h2>
                                            Order #
                                            {order._id
                                                .slice(-6)
                                                .toUpperCase()}
                                        </h2>

                                        <p>
                                            {formatDate(
                                                order.createdAt
                                            )}
                                        </p>
                                    </div>

                                    <span
                                        className={`order-status ${order.status
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                    >
                                        {order.status}
                                    </span>

                                </div>

                                <div className="order-items-list">

                                    {order.items.map((item, index) => (
                                        <div
                                            className="admin-order-item"
                                            key={`${order._id}-${index}`}
                                        >
                                            <div>
                                                <strong>
                                                    {item.dishname}
                                                </strong>

                                                <span>
                                                    × {item.quantity}
                                                </span>
                                            </div>

                                            <span>
                                                ₹
                                                {item.price *
                                                    item.quantity}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                                <div className="order-footer">

                                    <strong>
                                        Total: ₹
                                        {order.totalAmount}
                                    </strong>

                                    <div className="status-control">
                                        <label>
                                            Update Status
                                        </label>

                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {statuses.map(
                                                (status) => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default AdminOrders;