import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <div className="home-card">
                <h1>VNREats MultiCuisine Restaurant ✨</h1>

                <p>
                    Welcome to VNREats! Explore delicious dishes,
                    place orders, make reservations, and more.
                </p>

                <div className="home-buttons">
                    <Link to="/customer">
                        <button className="primary-btn">Customer</button>
                    </Link>

                    <Link to="/admin">
                        <button className="secondary-btn">
                            Administrator
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;