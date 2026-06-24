// Sidebar.jsx

import { useState } from "react";
import { NavLink } from "react-router-dom";

import { AiTwotonePieChart } from "react-icons/ai";
import { FaBus } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

function Sidebar() {
  const [activeNav, setActiveNav] = useState("Home");

  const navItems = [
    { label: "Home", path: "/dashboard", icon: <AiTwotonePieChart /> },
    { label: "Buses", path: "/bus", icon: <FaBus /> },
    { label: "Bookings", path: "/bookings", icon: <TbBrandBooking /> },
    { label: "Mannual Booking", path: "/mannual-booking", icon: <TbBrandBooking /> },
    { label: "Finance", path: "/finance", icon: <IoWalletOutline /> },
    { label: "Role Management", path: "/management", icon: <FaUserGroup /> },
    { label: "AgencySetting", path: "/settings", icon: <CiSettings /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>A</span>lonzii
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="logout-btn">
          Logout
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;