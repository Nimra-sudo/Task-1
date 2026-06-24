import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";

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
  const buses = Array(5).fill({
    code: "LEC-9980",
    name: "BUS NAME",
    type: "AC Business Class • 30 Seats",
    from: "DOUALA",
    fromTerminal: "Terminal 1",
    to: "YAOUNDÉ",
    toTerminal: "Terminal 2",
    price: "$2500",
  });

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header
          title="FLEET OVERVIEW"
          subtitle="3 buses registered • 2 active"
        />

        {/* STAT CARDS */}
        <div className="fleet-stats">
          <div className="fleet-stat-card">
            <div>
              <p>Total Fleets</p>
              <h3>32</h3>
            </div>

            <div className="fleet-icon green">
              <HiOutlineTruck />
            </div>
          </div>

          <div className="fleet-stat-card">
            <div>
              <p>Active Trips</p>
              <h3>156</h3>
            </div>

            <div className="fleet-icon blue">
              <HiOutlineMap />
            </div>
          </div>

          <div className="fleet-stat-card">
            <div>
              <p>Bookings Today</p>
              <h3>1,240</h3>
            </div>

            <div className="fleet-icon orange">
              <HiOutlineUserGroup />
            </div>
          </div>

          <div className="fleet-stat-card">
            <div>
              <p>Revenue</p>
              <h3>$12.4K</h3>
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
          {buses.map((bus, index) => (
            <div className="bus-card" key={index}>
              <div className="bus-top">
                <div className="bus-icon">
                  <HiOutlineTruck />
                </div>

                <h4>{bus.code}</h4>
              </div>

              <h3>{bus.name}</h3>
              <p>{bus.type}</p>

              <div className="route-box">
                <div>
                  <span className="route-city">
                    🔵 {bus.from}
                  </span>

                  <small>{bus.fromTerminal}</small>
                </div>

                <span className="time">
                  <LuClock3 />
                  Arr: 16:00
                </span>
              </div>

              <div className="route-box">
                <div>
                  <span className="route-city">
                    🟠 {bus.to}
                  </span>

                  <small>{bus.toTerminal}</small>
                </div>

                <span className="time">
                  <LuClock3 />
                  Arr: 16:00
                </span>
              </div>

              <div className="bus-footer">
                <div>
                  <small>Avg Price</small>
                  <h5>{bus.price}</h5>
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