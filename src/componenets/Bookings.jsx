import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const bookings = [
  {
    id: "BK-1001",
    passenger: "John Doe",
    bus: "Volvo V72 v8",
    route: "Douala → Yaoundé",
    date: "Apr 10, 2026",
    seats: "S11 / S12",
    amount: "5,000",
    status: "confirmed",
    payment: "Mobile Money",
  },
  {
    id: "BK-1002",
    passenger: "John Doe",
    bus: "Volvo V72 v8",
    route: "Douala → Yaoundé",
    date: "Apr 11, 2026",
    seats: "S21 / S22",
    amount: "5,000",
    status: "pending",
    payment: "Mobile Money",
  },
  {
    id: "BK-1003",
    passenger: "John Doe",
    bus: "Volvo V72 v8",
    route: "Douala → Yaoundé",
    date: "Apr 12, 2026",
    seats: "S31 / S32",
    amount: "5,000",
    status: "cancelled",
    payment: "Card",
  },
];

function StatusTag({ status }) {
  return (
    <span className={`status-tag ${status}`}>
      <span className="status-dot-small"></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Bookings() {
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.passenger.toLowerCase().includes(search.toLowerCase())
  );

  const navigate = useNavigate();
    
      useEffect(() => {
        fetch("https://nimra-backend.onrender.com/dashboard", {
          credentials: "include",
        })
          .then((res) => {
            if (res.status === 401) {
              navigate("/login");
              return;
            }
    
            return res.json();
          })
          .then((data) => {
            if (data && !data.success) {
              navigate("/login");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }, [navigate]);
    

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header
          title="BOOKINGS"
          subtitle="18 total bookings across all routes"
        />

        <div className="bookings-card">
          <div className="bookings-header">
            <div className="bookings-filters">
              <input
                type="text"
                className="search-input"
                placeholder="Search by booking ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <input
                type="date"
                className="filter-select"
              />

              <input
                type="date"
                className="filter-select"
              />

              <select className="filter-select">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>

              <button className="export-btn">
                Export Reports
              </button>
            </div>
          </div>

          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Passenger</th>
                  <th>Bus</th>
                  <th>Route & Date</th>
                  <th>Seats No</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.passenger}</td>
                    <td>{booking.bus}</td>

                    <td>
                      <div>{booking.route}</div>
                      <div className="route-info">
                        {booking.date}
                      </div>
                    </td>

                    <td>{booking.seats}</td>

                    <td className="amount-value">
                      FCFA {booking.amount}
                    </td>

                    <td>
                      <StatusTag status={booking.status} />
                    </td>

                    <td>{booking.payment}</td>

                    <td>
                      <button className="action-btn">
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Bookings;