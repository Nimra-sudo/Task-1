import { useState } from "react";
import "../App.css";
import { AiTwotonePieChart } from "react-icons/ai";
import { FaBus } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { BiSolidNavigation } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const statCards = [
  { icon: <FaBus />, iconClass: "blue",   value: 32,      label: "Total Buses",    change: "+4 this month",  changeType: "up"   },
  { icon: <BiSolidNavigation />, iconClass: "green",  value: 156,     label: "Active Trips",   change: "+12 this week",  changeType: "up"   },
  { icon: <FaUserGroup/>,  iconClass: "orange", value: "1,240", label: "Booking Rating", change: "-3 this week",   changeType: "down" },
];
const trendData  = [12, 18, 14, 22, 19, 30, 28, 35, 32, 40, 38, 45, 42, 50];
const revenueData = [3200, 4100, 2800, 5500, 4800, 6200, 5700, 7100, 6600, 8000];

const bookings = [
  { id:"BK-1001", passenger:"John Doe",     passId:"AD-1234", bus:"Bus Name", busId:"AD-1134", route:"To: Okearia → Yaramki", date:"Oct 8, 2026",  seats:"W11, W12 / W41, B42", amount:"₦24,500", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
  { id:"BK-1002", passenger:"Jane Smith",   passId:"AD-2201", bus:"Bus Name", busId:"AD-1135", route:"To: Okearia → Yaramki", date:"Oct 8, 2026",  seats:"W11, W12 / W41, B42", amount:"₦18,000", fee:"₦3,000", status:"pending",   payment:"Mobile Money" },
  { id:"BK-1003", passenger:"Mike Johnson", passId:"AD-3312", bus:"Bus Name", busId:"AD-1136", route:"To: Okearia → Yaramki", date:"Oct 9, 2026",  seats:"W11, W12 / W21, W22", amount:"₦22,000", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
  { id:"BK-1004", passenger:"Sarah Brown",  passId:"AD-4423", bus:"Bus Name", busId:"AD-1137", route:"To: Okearia → Yaramki", date:"Oct 9, 2026",  seats:"W11, W12 / B41, B42", amount:"₦16,500", fee:"₦3,000", status:"cancelled", payment:"Card"         },
  { id:"BK-1005", passenger:"Chris Evans",  passId:"AD-5534", bus:"Bus Name", busId:"AD-1138", route:"To: Okearia → Yaramki", date:"Oct 10, 2026", seats:"W21, W22 / B41, B42", amount:"₦28,000", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
  { id:"BK-1006", passenger:"Emily Clark",  passId:"AD-6645", bus:"Bus Name", busId:"AD-1139", route:"To: Okearia → Yaramki", date:"Oct 10, 2026", seats:"W11, W12 / W41, B42", amount:"₦21,000", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
  { id:"BK-1007", passenger:"Ryan Doe",     passId:"AD-7756", bus:"Bus Name", busId:"AD-1140", route:"To: Okearia → Yaramki", date:"Oct 11, 2026", seats:"B11, B12 / B41, B42", amount:"₦19,500", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
  { id:"BK-1008", passenger:"Linda White",  passId:"AD-8867", bus:"Bus Name", busId:"AD-1141", route:"To: Okearia → Yaramki", date:"Oct 11, 2026", seats:"W11, W12 / W41, B42", amount:"₦24,000", fee:"₦5,000", status:"pending",   payment:"Mobile Money" },
];

const navItems = [
  { label: "Home",            icon: <AiTwotonePieChart/> },
  { label: "Buses",           icon: <FaBus /> },
  { label: "Bookings",        icon: <TbBrandBooking /> },
  { label: "Manual Booking",  icon: <TbBrandBooking />},
  { label: "Finance",         icon:  <IoWalletOutline />},
  { label: "Role Management", icon: <FaUserGroup /> },
  { label: "Settings",        icon: <CiSettings /> },
];

function BookingTrendChart() {
  const width = 340,
   height = 120,
    padLeft = 30,
     padBottom = 20;
  const chartWidth  = width  - padLeft   - 10;
  const chartHeight = height - padBottom - 10;

  const maxVal = Math.max(trendData);
  const minVal = Math.min(trendData);

  const points = trendData.map((val, i) => {
    const x = padLeft + (i / (trendData.length - 1)) * chartWidth;
    const y = 10 + (1 - (val - minVal) / (maxVal - minVal)) * chartHeight;
    return `${x},${y}`;
  });

  const polylinePoints = points.join(" ");
  const firstX = padLeft;
  const lastX  = padLeft + chartWidth;
  const bottomY = 10 + chartHeight;
  const areaPath = `M ${points[0]} L ${points.join(" L ")} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;

  const dayLabels = ["Jun 1",
     "Jun 3",
      "Jun 5",
      "Jun 7",
      "Jun 9", 
      "Jun 11", 
      "Jun 13"];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1a7f5a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1a7f5a" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGradient)" />
      <polyline points={polylinePoints} fill="none"
       stroke="#1a7f5a"
        strokeWidth="2.5" 
        strokeLinejoin="round" strokeLinecap="round" />
      {dayLabels.map((label, i) => {
        const x = padLeft + (i / (dayLabels.length - 1)) * chartWidth;
        return <text key={i} x={x} y={height - 4} textAnchor="middle" 
        className="chart-axis-label">{label}</text>;
      })}
    </svg>
  );
}

function RevenueBarChart() {
  const width = 340,
   height = 120,
    padLeft = 30,
     padBottom = 20;
  const chartWidth  = width  - padLeft   - 10;
  const chartHeight = height - padBottom - 10;

  const maxVal     = Math.max(...revenueData);
  const barCount   = revenueData.length;
  const barSpacing = chartWidth / barCount;
  const barWidth   = barSpacing * 0.55;

  const dayLabels = ["Oct 1",
    "Oct 2",
    "Oct 3",
    "Oct 4",
    "Oct 5",
    "Oct 6",
    "Oct 7",
    "Oct 8",
    "Oct 9",
    "Oct 10"];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {revenueData.map((val, i) => {
        const barHeight = (val / maxVal) * chartHeight;
        const x = padLeft + i * barSpacing + (barSpacing - barWidth) / 2;
        const y = 10 + chartHeight - barHeight;
        return <rect key={i} x={x} y={y} width={barWidth} 
        height={barHeight}
         fill="#1a7f5a" opacity={0.7 + (val / maxVal) * 0.3} rx={3} />;
      })}
      {dayLabels.map((label, i) => {
        if (i % 2 !== 0) return null;
        const x = padLeft + i * barSpacing + barSpacing / 2;
        return <text key={i} x={x} y={height - 4} textAnchor="middle" className="chart-axis-label">{label}</text>;
      })}
    </svg>
  );
}
function StatusTag({ status }) {
  return (
    <span className={`status-tag ${status}`}>
      <span className="status-dot-small" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeNav, setActiveNav]     = useState("Home");

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.passenger.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>A</span>lonzii</div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="logout-btn">
            <span className="nav-icon"></span>
            Logout
          </div>
        </div>
      </aside>
      <main className="main-content">

        <div className="topbar">
          <div>
            <h1>DASHBOARD</h1>
            <div className="topbar-subtitle">Last office update: Jun 11, 2026</div>
          </div>
          <div className="topbar-actions">
            <div className="status-badge"><div className="status-dot" /> Online</div>
            <button className="topbar-icon-btn"><TbWorld /> EN</button>
            <button className="topbar-icon-btn"><IoIosNotifications /></button>
            <div className="agency-name">Agency Name ▾</div>
          </div>
        </div>

        <section>
          <div className="section-header">
            <div>
              <div className="section-title">ANALYTICS</div>
              <div className="section-subtitle">Last 9 Days: 25 May 2026  03 June 2026</div>
            </div>
            <div className="analytics-header-actions">
              <button className="btn-secondary">+ Add New Bus</button>
              <button className="btn-primary">Create Booking</button>
              <select className="filter-select">
                <option>Filter by Date</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
              </select>
            </div>
          </div>

          <div className="stat-cards">
            {statCards.map((card) => (
              <div className="stat-card" key={card.label}>
                <div className={`stat-icon ${card.iconClass}`}>{card.icon}</div>
                <div>
                  <div className="stat-value">{card.value}</div>
                  <div className="stat-label">{card.label}</div>
                  <div className={`stat-change ${card.changeType}`}>{card.change}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="charts-row">
          <div className="chart-card">
            <div className="chart-title">BOOKING TRENDS</div>
            <div className="chart-subtitle">Daily bookings — last 14 days</div>
            <BookingTrendChart />
          </div>
          <div className="chart-card">
            <div className="chart-title">REVENUE ANALYTICS</div>
            <div className="chart-subtitle">Monthly revenue — last 10 days (bar)</div>
            <RevenueBarChart />
          </div>
        </div>
        <div className="bookings-card">
          <div className="bookings-header">
            <div>
              <div className="section-title">RECENT BOOKINGS</div>
              <div className="section-subtitle">Latest bookings: 30 days</div>
            </div>
            <div className="bookings-filters">
              <input
                className="search-input"
                type="text"
                placeholder="  Search by name or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <button className="export-btn"> Export Reports</button>
            </div>
          </div>

          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Passenger</th>
                <th>Bus</th>
                <th>Route & Date</th>
                <th>Seats No.</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td><div className="booking-id">ID: {booking.id}</div></td>
                  <td>
                    <div className="passenger-name">{booking.passenger}</div>
                    <div className="passenger-id">{booking.passId}</div>
                  </td>
                  <td>
                    <div className="bus-name">{booking.bus}</div>
                    <div className="route-info">{booking.busId}</div>
                  </td>
                  <td>
                    <div>{booking.route}</div>
                    <div className="route-info"> {booking.date}</div>
                  </td>
                  <td><div className="seats-info">{booking.seats}</div></td>
                  <td>
                    <div className="amount-value">{booking.amount}</div>
                    <div className="amount-fee">{booking.fee}</div>
                  </td>
                  <td><StatusTag status={booking.status} /></td>
                  <td><div className="payment-method">{booking.payment}</div></td>
                  <td><button className="action-btn">⋮</button></td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "30px", color: "#aaa" }}>
                    No bookings match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
