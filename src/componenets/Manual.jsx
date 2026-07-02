import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { IoSearchOutline } from "react-icons/io5";

function Manual() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [roundTrip, setRoundTrip] = useState(false);
  const [buses, setBuses] = useState([]);

   const navigate = useNavigate();
      
        const searchBuses = () => {
          fetch(
              `https://nimra-backend.onrender.com/manual-buses?from_city=${fromCity}&to_city=${toCity}&travel_date=${travelDate}&passengers=${passengers}&round_trip=${roundTrip}`,
              {
                credentials: "include",
              }
            )
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setBuses(data.tickets);
              }
            })
            .catch((err) => console.log(err));
        };

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
          title="MANUAL TICKET ISSUANCE"
          subtitle="Walk-in customers · Cash transactions only"
        />


        <div className="manual-container">
          <div className="manual-icon">
            <IoSearchOutline size={24} />
          </div>

          <h2>FIND AVAILABLE BUS</h2>

          <p className="manual-subtitle">
            Select departure and arrival terminals to view available fleets.
          </p>

          <div className="manual-card">
            
            <div className="manual-row">
              <div className="manual-field">
                <label>Origin City</label>

                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  >
                  <option value="">Departure City</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>

              <div className="manual-field">
                <label>Destination City</label>
                <select
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                >
                  <option value="">Arrival City</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>
            </div>

          
            <div className="manual-row">
              <div className="manual-field">
                <label>Numbers Of Passengers</label>

                <div className="passenger-box">
                  <button
                    onClick={() =>
                      setPassengers((prev) =>
                        prev > 1 ? prev - 1 : 1
                      )
                    }
                  >
                    -
                  </button>

                  <span>{passengers}</span>

                  <button
                    onClick={() =>
                      setPassengers((prev) => prev + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="manual-field">
                <label>Travel Date</label>

                <div className="date-row">
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />

                  <button className="small-btn active">
                    Today
                  </button>

                  <button className="small-btn">
                    Tomorrow
                  </button>

                  <button className="small-btn">
                    Other
                  </button>
                </div>
              </div>
            </div>

           
            <div className="round-trip-box">
              <div>
                <h4>Round Trip</h4>
                <small>
                  Book onward + return together
                </small>
              </div>

              <label className="switch">
                <input
                    type="checkbox"
                    checked={roundTrip}
                    onChange={(e) =>
                      setRoundTrip(e.target.checked)
                    }
                  />
                <span className="slider"></span>
              </label>
            </div>

              <button
                  className="search-bus-btn"
                  onClick={searchBuses}
                >
              <IoSearchOutline size={18} />
              Search Available Buses
            </button>


          </div>
        </div>
        <div className="manual-results">
          {buses.map((bus) => (
            <div key={bus.id} className="manual-bus-card">
              <div className="manual-bus-header">
                <h3>{bus.bus_name}</h3>
                <span className="price-badge">
                  FCFA {bus.average_price}
                </span>
              </div>

              <p className="route-text">
                📍 {bus.from_city} → {bus.to_city}
              </p>

              <p className="bus-details">
                🚌 {bus.bus_type} • {bus.total_seats} Seats
              </p>

              <p className="travel-info">
                👥 {passengers} Passenger(s)
              </p>

              <button className="book-btn">
                Book Now
              </button>
            </div>
          ))}
          {buses.length === 0 && (
            <div className="no-bus-found">
              No buses found for the selected route.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Manual;