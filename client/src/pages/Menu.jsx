import { useEffect, useState } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching menu:", error);
                setLoading(false);
            });
    }, []);

    const filteredItems =
        selectedCategory === "All"
            ? menuItems
            : menuItems.filter(
                  (item) => item.category === selectedCategory
              );

    if (loading) {
        return <h1>Loading menu...</h1>;
    }

    return (
        <div className="menu-page">
            <h1>VNREats Menu</h1>

            <div className="category-buttons">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "category-btn active"
                                : "category-btn"
                        }
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="menu-grid">
                {filteredItems.map((item) => (
                    <MenuCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Menu;