import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineTruck,
HiOutlineMap,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { FaBus } from "react-icons/fa";

import {
  LuSearch,LuGrid2X2,  LuList,LuPencil,LuTrash2,LuPlus,LuClock3,
} from "react-icons/lu";

function Buses() {
  const [summary, setSummary] = useState({
    totalFleets: 0,
    activeTrips: 0,
    bookingsToday: 0,
    revenue: 0,
  });
  const [buses, setBuses] = useState([]);

  const navigate = useNavigate();

    useEffect(() => {
      fetch("https://nimra-backend.onrender.com/bus-summary", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSummary(data.summary);
          }
        })
        .catch((err) => console.log(err));
      }, []);
    useEffect(() => {
      fetch("https://nimra-backend.onrender.com/buses", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBuses(data.buses);
          }
        })
        .catch((err) => console.log(err));
    }, []);



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
          title="FLEET OVERVIEW"
          subtitle={`${summary.totalFleets} buses registered • ${summary.activeTrips} active`}
        />

        {/* STAT CARDS */}
        <div className="fleet-stats">
          <div className="fleet-stat-card">
            <div>
              <p>Total Fleets</p>
              <h3>{summary.totalFleets}</h3>
            </div>

            <div className="fleet-icon green">
              <HiOutlineTruck />
            </div>
          </div>

          <div className="fleet-stat-card">
            <div>
              <p>Active Trips</p>
              <h3>{summary.activeTrips}</h3>
            </div>

            <div className="fleet-icon blue">
              <HiOutlineMap />
            </div>
          </div>

          <div className="fleet-stat-card">
            <div>
              <p>Bookings Today</p>
              <h3>{summary.bookingsToday}</h3>
            </div>

            <div className="fleet-icon orange">
              <HiOutlineUserGroup />
            </div>
          </div>

          <div className="fleet-stat-card">
            <div>
              <p>Revenue</p>
              <h3>FCFA {summary.revenue.toLocaleString()}</h3>
            </div>

            <div className="fleet-icon red">
              <HiOutlineCurrencyDollar />
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="fleet-header">
          <h3>ACTIVE FLEET LIST</h3>

          <div className="fleet-actions">
            <div className="finance-search-box">
              <LuSearch />
              <input
                type="text"
                placeholder="Enter user name"
              />
            </div>

            <button className="btn-success">
              <LuPlus />
              Add New Bus
            </button>

            <button className="view-btn active">
              <LuGrid2X2 />
            </button>

            <button className="view-btn">
              <LuList />
            </button>
          </div>
        </div>

        {/* BUS GRID */}
        <div className="bus-grid">
          {buses.map((bus) => (
            <div className="bus-card" key={bus.id}>
              <div className="bus-top">
                <div className="bus-icon">
                  <HiOutlineTruck />
                </div>

                <h4>{bus.bus_code}</h4>
              </div>

              <h3>{bus.bus_name}</h3>

              <p>
                {bus.bus_type} • {bus.total_seats} Seats
              </p>

              <div className="route-box">
                <div>
                  <span className="route-city">
                     {bus.from_city}
                  </span>

                  <small>{bus.from_terminal}</small>
                </div>

                <span className="time">
                  <LuClock3 />
                  Arr: {bus.arrival_time?.slice(0, 5)}
                </span>
              </div>

              <div className="route-box">
                <div>
                  <span className="route-city">
                     {bus.to_city}
                  </span>

                  <small>{bus.to_terminal}</small>
                </div>

                <span className="time">
                  <LuClock3 />
                  Arr: {bus.arrival_time?.slice(0, 5)}
                </span>
              </div>

              <div className="bus-footer">
                <div>
                  <small>Avg Price</small>
                  <h5>FCFA {bus.average_price}</h5>
                </div>

                <div className="bus-actions">
                  <button>
                    <LuPencil />
                  </button>

                  <button>
                    <LuTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Buses;