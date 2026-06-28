import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { IoSearchOutline } from "react-icons/io5";

function Manual() {

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

                <select>
                  <option>Departure City</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Islamabad</option>
                </select>
              </div>

              <div className="manual-field">
                <label>Destination City</label>

                <select>
                  <option>Arrival City</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Islamabad</option>
                </select>
              </div>
            </div>

          
            <div className="manual-row">
              <div className="manual-field">
                <label>Numbers Of Passengers</label>

                <div className="passenger-box">
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
              </div>

              <div className="manual-field">
                <label>Travel Date</label>

                <div className="date-row">
                  <input type="date" />

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
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>

         
            <button className="search-bus-btn">
              <IoSearchOutline size={18} />
              Search Available Buses
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Manual;