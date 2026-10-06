function MenuCard({ item }) {
    return (
        <div className="menu-card">
            <div className="menu-card-content">
                <span className="menu-category">{item.category}</span>

                <h2>{item.dishname}</h2>

                <p className="menu-cuisine">{item.cuisine}</p>

                <p className="menu-price">₹{item.price}</p>
            </div>
        </div>
    );
}

export default MenuCard;