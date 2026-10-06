import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <div className="admin-page">
            <div className="admin-card">
                <h1>Administrator Dashboard</h1>

                <p className="admin-subtitle">
                    Manage the VNREats restaurant system.
                </p>

                <div className="admin-buttons">
                    <Link to="/admin/menu">
                        <button>Manage Menu</button>
                    </Link>

                    <Link to="/admin/orders">
                        <button>Manage Orders</button>
                    </Link>

                    <Link to="/admin/reservations">
                        <button>Manage Reservations</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;