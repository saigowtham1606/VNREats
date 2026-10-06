import { useEffect, useState } from "react";
import axios from "axios";

function AdminMenu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        category: "Breakfast",
        dishname: "",
        cuisine: "",
        price: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const categories = [
        "All",
        "Breakfast",
        "Appetizer",
        "Main Course",
        "Dessert",
        "Beverage"
    ];

    const formCategories = categories.filter(
        (category) => category !== "All"
    );

    // Fetch menu
    const fetchMenu = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/menu"
            );

            setMenuItems(response.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
            setMessage("Failed to load menu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    // Automatically determine next dish number
    const getNextDishNumber = () => {
        if (menuItems.length === 0) {
            return 1;
        }

        return Math.max(
            ...menuItems.map((item) => item.dishno)
        ) + 1;
    };

    // Handle form input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setMessage("");
    };

    // Check whether a dish already exists
    const dishAlreadyExists = () => {
        const enteredName = formData.dishname
            .trim()
            .toLowerCase();

        const enteredCuisine = formData.cuisine
            .trim()
            .toLowerCase();

        return menuItems.some((item) => {
            if (editingId && item._id === editingId) {
                return false;
            }

            return (
                item.dishname.trim().toLowerCase() === enteredName &&
                item.cuisine.trim().toLowerCase() === enteredCuisine
            );
        });
    };

    // Add or update dish
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.dishname.trim() ||
            !formData.cuisine.trim() ||
            !formData.price
        ) {
            setMessage("Please fill in all fields.");
            return;
        }

        if (dishAlreadyExists()) {
            setMessage(
                "This dish already exists in the menu."
            );
            return;
        }

        try {
            if (editingId) {
                await axios.put(
                    `http://localhost:5000/api/menu/${editingId}`,
                    {
                        ...formData,
                        price: Number(formData.price)
                    }
                );

                setMessage("Dish updated successfully!");
            } else {
                const nextDishNumber = getNextDishNumber();

                await axios.post(
                    "http://localhost:5000/api/menu",
                    {
                        dishno: nextDishNumber,
                        ...formData,
                        price: Number(formData.price)
                    }
                );

                setMessage(
                    `Dish added successfully as Dish No. ${nextDishNumber}!`
                );
            }

            resetForm();
            fetchMenu();
        } catch (error) {
            console.error("Error saving dish:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to save dish."
            );
        }
    };

    // Edit dish
    const handleEdit = (item) => {
        setEditingId(item._id);

        setFormData({
            category: item.category,
            dishname: item.dishname,
            cuisine: item.cuisine,
            price: item.price
        });

        setMessage("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete dish
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this dish?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5000/api/menu/${id}`
            );

            setMessage("Dish deleted successfully!");

            fetchMenu();
        } catch (error) {
            console.error("Error deleting dish:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to delete dish."
            );
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            category: "Breakfast",
            dishname: "",
            cuisine: "",
            price: ""
        });

        setEditingId(null);
    };

    // Filter menu
    const filteredItems = menuItems.filter((item) => {
        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

        const search = searchTerm
            .trim()
            .toLowerCase();

        const matchesSearch =
            search === "" ||
            item.dishname.toLowerCase().includes(search) ||
            item.cuisine.toLowerCase().includes(search) ||
            item.dishno.toString().includes(search);

        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="admin-menu-page">
                <h1>Loading menu...</h1>
            </div>
        );
    }

    return (
        <div className="admin-menu-page">
            <div className="admin-menu-container">

                <h1>Manage Menu</h1>

                <p className="admin-menu-subtitle">
                    Add, update, search, and manage VNREats dishes.
                </p>

                {/* Add / Edit Form */}
                <div className="admin-menu-form-card">
                    <h2>
                        {editingId
                            ? "Update Dish"
                            : "Add New Dish"}
                    </h2>

                    {!editingId && (
                        <p className="next-dish-number">
                            Next Dish Number:{" "}
                            <strong>
                                {getNextDishNumber()}
                            </strong>
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="admin-form-row">

                            <div className="admin-form-group">
                                <label>Category</label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {formCategories.map(
                                        (category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="admin-form-group">
                                <label>Price (₹)</label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    min="0"
                                />
                            </div>

                        </div>

                        <div className="admin-form-row">

                            <div className="admin-form-group">
                                <label>Dish Name</label>

                                <input
                                    type="text"
                                    name="dishname"
                                    value={formData.dishname}
                                    onChange={handleChange}
                                    placeholder="Enter dish name"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label>Cuisine</label>

                                <input
                                    type="text"
                                    name="cuisine"
                                    value={formData.cuisine}
                                    onChange={handleChange}
                                    placeholder="e.g. Indian"
                                />
                            </div>

                        </div>

                        <div className="admin-form-buttons">

                            <button
                                type="submit"
                                className="admin-save-btn"
                            >
                                {editingId
                                    ? "Update Dish"
                                    : "Add Dish"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="admin-cancel-btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                    {message && (
                        <p className="admin-menu-message">
                            {message}
                        </p>
                    )}
                </div>

                {/* Search */}
                <div className="admin-menu-tools">

                    <input
                        type="text"
                        className="admin-search"
                        placeholder="Search by dish name, cuisine, or dish number..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                    {/* Category filters */}
                    <div className="admin-category-buttons">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={
                                    selectedCategory === category
                                        ? "admin-category-btn active"
                                        : "admin-category-btn"
                                }
                                onClick={() =>
                                    setSelectedCategory(category)
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Menu list */}
                <div className="admin-menu-list">

                    <div className="admin-menu-list-header">
                        <h2>Current Menu</h2>

                        <span>
                            Showing {filteredItems.length} of{" "}
                            {menuItems.length} items
                        </span>
                    </div>

                    {filteredItems.length === 0 ? (
                        <div className="no-menu-results">
                            <h3>No dishes found</h3>
                            <p>
                                Try changing your search or category.
                            </p>
                        </div>
                    ) : (
                        <div className="admin-menu-grid">

                            {filteredItems.map((item) => (
                                <div
                                    className="admin-menu-item"
                                    key={item._id}
                                >

                                    <div className="admin-menu-info">

                                        <span className="menu-category">
                                            {item.category}
                                        </span>

                                        <h3>
                                            {item.dishname}
                                        </h3>

                                        <p>
                                            {item.cuisine}
                                        </p>

                                        <strong>
                                            ₹{item.price}
                                        </strong>

                                        <small>
                                            Dish No: {item.dishno}
                                        </small>

                                    </div>

                                    <div className="admin-menu-actions">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(item)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    item._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default AdminMenu;