import { Link } from "react-router-dom";

function CustomerDashboard() {
    return (
        <div className="dashboard-page">
            <div className="dashboard-card">
                <h1>Customer Dashboard</h1>

                <p className="dashboard-subtitle">
                    What would you like to do today?
                </p>

                <div className="dashboard-buttons">
                    <Link to="/menu">
                        <button>Display Menu</button>
                    </Link>

                    <Link to="/order">
                        <button>Order Dishes</button>
                    </Link>

                    <Link to="/reservation">
                        <button>Make a Reservation</button>
                    </Link>

                    <Link to="/rating">
                        <button>Rate Us</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;