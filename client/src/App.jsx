import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerDashboard from "./pages/CustomerDashboard";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Reservation from "./pages/Reservation";
import Rating from "./pages/Rating";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminOrders from "./pages/AdminOrders";
import AdminReservations from "./pages/AdminReservations";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer" element={<CustomerDashboard />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/order" element={<Order />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/rating" element={<Rating />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/menu" element={<AdminMenu />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/reservations" element={<AdminReservations />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;