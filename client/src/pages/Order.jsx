import { useEffect, useState } from "react";
import axios from "axios";

function Order() {
    const [menuItems, setMenuItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Breakfast",
        "Appetizer",
        "Main Course",
        "Dessert",
        "Beverage"
    ];

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/menu")
            .then((response) => {
                setMenuItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching menu:", error);
            });
    }, []);

    const updateQuantity = (id, value) => {
        const quantity = Math.max(0, Number(value));

        setQuantities({
            ...quantities,
            [id]: quantity
        });
    };

    const increaseQuantity = (id) => {
        updateQuantity(id, (quantities[id] || 0) + 1);
    };

    const decreaseQuantity = (id) => {
        updateQuantity(id, Math.max(0, (quantities[id] || 0) - 1));
    };

    const filteredItems =
        selectedCategory === "All"
            ? menuItems
            : menuItems.filter(
                  (item) => item.category === selectedCategory
              );

    const selectedItems = menuItems.filter(
        (item) => (quantities[item._id] || 0) > 0
    );

    const total = selectedItems.reduce((sum, item) => {
        return sum + item.price * quantities[item._id];
    }, 0);

    const placeOrder = async () => {
        if (selectedItems.length === 0) {
            return;
        }

        const orderData = {
            items: selectedItems.map((item) => ({
                dishId: item._id,
                dishname: item.dishname,
                quantity: quantities[item._id],
                price: item.price
            })),
            totalAmount: total
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/orders",
                orderData
            );

            console.log("Order placed:", response.data);

            alert("Order placed successfully!");

            setQuantities({});
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order.");
        }
    };

    return (
        <div className="order-page">
            <div className="order-card">
                <h1>Order Dishes</h1>

                <p className="order-subtitle">
                    Select the dishes and quantities you want.
                </p>

                {/* Categories */}
                <div className="category-buttons">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-btn active"
                                    : "category-btn"
                            }
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Menu Items */}
                <div className="order-items">
                    {filteredItems.map((item) => (
                        <div
                            className="order-item"
                            key={item._id}
                        >
                            <div className="order-item-info">
                                <span className="menu-category">
                                    {item.category}
                                </span>

                                <h2>{item.dishname}</h2>

                                <p>{item.cuisine}</p>

                                <strong>₹{item.price}</strong>
                            </div>

                            <div className="quantity-controls">
                                <button
                                    onClick={() =>
                                        decreaseQuantity(item._id)
                                    }
                                >
                                    −
                                </button>

                                <span>
                                    {quantities[item._id] || 0}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item._id)
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    <h2>Your Order</h2>

                    {selectedItems.length === 0 ? (
                        <p>No dishes selected yet.</p>
                    ) : (
                        selectedItems.map((item) => (
                            <div
                                className="summary-item"
                                key={item._id}
                            >
                                <span>
                                    {item.dishname} ×{" "}
                                    {quantities[item._id]}
                                </span>

                                <span>
                                    ₹
                                    {item.price *
                                        quantities[item._id]}
                                </span>
                            </div>
                        ))
                    )}

                    <div className="order-total">
                        <h2>Total: ₹{total}</h2>
                    </div>

                    <button
                        className="place-order-btn"
                        disabled={selectedItems.length === 0}
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Order;