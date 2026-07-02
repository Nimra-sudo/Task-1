import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Sidebar from "./Sidebar";


// const bookings = 
// [
//   { id:"BK-1001", passenger:"John Doe",   
//       passId:"AD-1234", bus:"Bus Name",
//        busId:"AD-1134", route:"To: Okearia → Yaramki",
//         date:"Oct 8, 2026",  seats:"W11, W12 / W41, B42",
//          amount:"₦24,500", fee:"₦5,000", status:"confirmed",
//           payment:"Mobile Money" },
//   { id:"BK-1002", passenger:"Jane Smith",  
//      passId:"AD-2201", bus:"Bus Name", busId:"AD-1135", route:"To: Okearia → Yaramki", date:"Oct 8, 2026",  seats:"W11, W12 / W41, B42", amount:"₦18,000", fee:"₦3,000", status:"pending",   payment:"Mobile Money" },
//   { id:"BK-1003", 
//     passenger:"Mike Johnson", passId:"AD-3312", 
//     bus:"Bus Name", busId:"AD-1136", route:"To: Okearia → Yaramki", date:"Oct 9, 2026",  seats:"W11, W12 / W21, W22", amount:"₦22,000", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
//   { id:"BK-1004",
//      passenger:"Sarah Brown",  passId:"AD-4423",
//       bus:"Bus Name", busId:"AD-1137", route:"To: Okearia → Yaramki", date:"Oct 9, 2026",  seats:"W11, W12 / B41, B42", amount:"₦16,500", fee:"₦3,000", status:"cancelled", payment:"Card"         },
//   { id:"BK-1005",
//     passenger:"Chris Evans",  passId:"AD-5534",
//      bus:"Bus Name", busId:"AD-1138", route:"To: Okearia → Yaramki", date:"Oct 10, 2026", seats:"W21, W22 / B41, B42", amount:"₦28,000", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
//   { id:"BK-1006",
//      passenger:"Emily Clark",  passId:"AD-6645",
//       bus:"Bus Name", busId:"AD-1139", route:"To: Okearia → Yaramki",
//        date:"Oct 10, 2026", seats:"W11, W12 / W41, B42", amount:"₦21,000", fee:"₦5,000", status:"confirmed", payment:"Mobile Money" },
//   { id:"BK-1007",
//      passenger:"Ryan Doe",     passId:"AD-7756",
//       bus:"Bus Name", busId:"AD-1140", route:"To: Okearia → Yaramki",
//        date:"Oct 11, 2026", seats:"B11, B12 / B41, B42",
//         amount:"₦19,500", fee:"₦5,000",
//          status:"confirmed",
//          payment:"Mobile Money" },
//   { id:"BK-1008",
//      passenger:"Linda White",  passId:"AD-8867",
//       bus:"Bus Name", busId:"AD-1141",
//        route:"To: Okearia → Yaramki",
//        date:"Oct 11, 2026", 
//        seats:"W11, W12 / W41, B42",
//         amount:"₦24,000", 
//         fee:"₦5,000", 
//         status:"pending", 
//           payment:"Mobile Money" },
// ];



function BookingTrendChart({ trendData }) {
  const width = 340;
  const height = 120;
  const padLeft = 30;
  const padBottom = 20;

  if (!trendData.length) {
    return <p>No booking data available</p>;
  }

  const chartWidth = width - padLeft - 10;
  const chartHeight = height - padBottom - 10;

  const values = trendData.map(
    (item) => Number(item.total)
  );

  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  const points = values.map((val, i) => {
    const x =
      padLeft +
      (i / (values.length - 1 || 1)) *
        chartWidth;

    const y =
      10 +
      (1 -
        (val - minVal) /
          (maxVal - minVal || 1)) *
        chartHeight;

    return `${x},${y}`;
  });

  const polylinePoints = points.join(" ");

  const firstX = padLeft;
  const lastX = padLeft + chartWidth;
  const bottomY = 10 + chartHeight;

  const areaPath = `
    M ${points[0]}
    L ${points.join(" L ")}
    L ${lastX},${bottomY}
    L ${firstX},${bottomY}
    Z
  `;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id="areaGradient"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#1a7f5a"
            stopOpacity="0.25"
          />
          <stop
            offset="100%"
            stopColor="#1a7f5a"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      <path
        d={areaPath}
        fill="url(#areaGradient)"
      />

      <polyline
        points={polylinePoints}
        fill="none"
        stroke="#1a7f5a"
        strokeWidth="2.5"
      />

      {trendData.map((item, i) => {
        const x =
          padLeft +
          (i / (trendData.length - 1 || 1)) *
            chartWidth;

        return (
          <text
            key={i}
            x={x}
            y={height - 4}
            textAnchor="middle"
            className="chart-axis-label"
          >
            {item.day}
          </text>
        );
      })}
    </svg>
  );
}

function RevenueBarChart({ revenueData }) {
  const width = 340;
  const height = 120;
  const padLeft = 30;
  const padBottom = 20;

  if (!revenueData.length) {
    return <p>No revenue data available</p>;
  }

  const chartWidth = width - padLeft - 10;
  const chartHeight = height - padBottom - 10;

  const values = revenueData.map(
    (item) => Number(item.total)
  );

  const maxVal = Math.max(...values);

  const barCount = values.length;
  const barSpacing = chartWidth / barCount;
  const barWidth = barSpacing * 0.55;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {values.map((val, i) => {
        const barHeight =
          (val / (maxVal || 1)) *
          chartHeight;

        const x =
          padLeft +
          i * barSpacing +
          (barSpacing - barWidth) / 2;

        const y =
          10 + chartHeight - barHeight;

        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill="#1a7f5a"
            rx={3}
          />
        );
      })}

      {revenueData.map((item, i) => {
        const x =
          padLeft +
          i * barSpacing +
          barSpacing / 2;

        return (
          <text
            key={i}
            x={x}
            y={height - 4}
            textAnchor="middle"
            className="chart-axis-label"
          >
            {item.day}
          </text>
        );
      })}
    </svg>
  );
}

function StatusTag({ status }) {
  return (
    <span className={`status-tag ${status}`}>
      <span className="status-dot-small" />
      {status
        ? status.charAt(0).toUpperCase() +
          status.slice(1)
        : "Unknown"}
    </span>
  );
}

export default function Dashboard() {

const [bookingTrends, setBookingTrends] = useState([]);
const [revenueAnalytics, setRevenueAnalytics] = useState([]);


  const [summary, setSummary] = useState({
  totalBuses: 0,
  activeTrips: 0,
  totalBookings: 0,
  revenue: 0,
});

const [bookings, setBookings] = useState([]);
const statCards = [
  {
    icon: <FaBus />,
    iconClass: "blue",
    value: summary.totalBuses,
    label: "Total Buses",
    change: "",
    changeType: "up",
  },
  {
    icon: <BiSolidNavigation />,
    iconClass: "green",
    value: summary.activeTrips,
    label: "Active Trips",
    change: "",
    changeType: "up",
  },
  {
    icon: <FaUserGroup />,
    iconClass: "orange",
    value: summary.totalBookings,
    label: "Total Bookings",
    change: "",
    changeType: "up",
  },
  {
    icon: <IoWalletOutline />,
    iconClass: "blue",
    value: `₦${Number(summary.revenue).toLocaleString()}`,
    label: "Revenue",
    change: "",
    changeType: "up",
  },
];
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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

useEffect(() => {
  const fetchData = async () => {
    try {
      const [
        dashboardRes,
        trendRes,
        revenueRes,
      ] = await Promise.all([
        fetch(
          "https://nimra-backend.onrender.com/dashboard-summary",
          {
            credentials: "include",
          }
        ),
        fetch(
          "https://nimra-backend.onrender.com/booking-trends",
          {
            credentials: "include",
          }
        ),
        fetch(
          "https://nimra-backend.onrender.com/revenue-analytics",
          {
            credentials: "include",
          }
        ),
      ]);

      if (
        dashboardRes.status === 401 ||
        trendRes.status === 401 ||
        revenueRes.status === 401
      ) {
        navigate("/login");
        return;
      }

      const dashboardData =
        await dashboardRes.json();
      const trendData =
        await trendRes.json();
      const revenueData =
        await revenueRes.json();

      if (dashboardData.success) {
        setSummary(
          dashboardData.summary
        );
        setBookings(
          dashboardData.bookings
        );
      }

      if (trendData.success) {
        setBookingTrends(
          trendData.trends
        );
      }

      if (revenueData.success) {
        setRevenueAnalytics(
          revenueData.revenue
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [navigate]);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
  String(b.id)
    .toLowerCase()
    .includes(
      searchQuery.toLowerCase()
    ) ||
  (b.passenger_name || "")
    .toLowerCase()
    .includes(
      searchQuery.toLowerCase()
    ) ||
  (b.bus_name || "")
    .toLowerCase()
    .includes(
      searchQuery.toLowerCase()
    );

    const matchesStatus = statusFilter === "All" || b.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-layout">
      <Sidebar />
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
            <BookingTrendChart
                trendData={bookingTrends}
              />
          </div>
          <div className="chart-card">
            <div className="chart-title">REVENUE ANALYTICS</div>
            <div className="chart-subtitle">Monthly revenue — last 10 days (bar)</div>
            <RevenueBarChart
              revenueData={revenueAnalytics}
            />
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

          <div className="bookings-table-wrapper">
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
              {filteredBookings.map((booking, index) => (
                <tr key={booking.id || index}>
                  <td><div className="booking-id">ID: {booking.id || index}</div></td>
      
                  <td>
                    <div className="passenger-name">{booking.passenger_name}</div>
                  </td>
                  <td>
                    <div className="bus-name">{booking.bus_name}</div>
                  </td>
                  <td>
                    <div>
                      {booking.origin} → {booking.destination}
                    </div>
                    <div className="route-info">
                      {new Date(
                          booking.travel_date
                        ).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="seats-info">
                      {booking.seat_number}
                    </div>
                  </td>
            
                 <td>
                  <div className="amount-value">
                    ₦{Number(
                      booking.amount
                    ).toLocaleString()}
                  </div>
                </td>
                    
                 <td>
                    <StatusTag status={booking.status} />
                  </td>
                 <td>
  <div className="payment-method">
    {booking.payment_method}
  </div>
</td>
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
        </div>

      </main>
    </div>
  );
}


