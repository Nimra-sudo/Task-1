import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  HiOutlineBanknotes,
  HiOutlineBuildingLibrary,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";

import {
  LuSearch,
  LuDownload,
  LuEllipsisVertical,
  LuPlus,
  LuTicket,
} from "react-icons/lu";

function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    bankTransfers: 0,
    cashPayments: 0,
    mobileMoney: 0,
  });

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All Methods");
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
  const getSummary = () => {
    fetch("https://nimra-backend.onrender.com/finance-summary", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSummary(data.summary);
        }
      });
  };

  getSummary();

  const interval = setInterval(getSummary, 5000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  fetch("https://nimra-backend.onrender.com/finance", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setTransactions(data.transactions);
      }
    })
    .catch((err) => console.log(err));
}, []);

const filteredTransactions = transactions.filter(
  (item) => {
    const matchSearch =
      item.transaction_id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.customer_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.booking_id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchMethod =
      method === "All Methods" ||
      item.payment_method === method;

    return matchSearch && matchMethod;
  }
);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header
          title="FINANCE"
          subtitle="Fleet operations overview — April 2026"
        />

        {/* SEARCH + BUTTONS */}
        <div className="finance-top-row">
          <div className="finance-search">
            <input
              type="text"
              placeholder="Enter user name"
              className="search-input"
            />
          </div>

          <div className="finance-btns">
            <button className="btn-success">
              <LuPlus />
              Add New Bus
            </button>

            <button className="btn-dark">
              <LuTicket />
              Create Booking
            </button>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="finance-cards">
          <div className="finance-card">
            <div className="finance-icon green">
              <HiOutlineBanknotes />
            </div>

            <div>
              <p>Total Revenue</p>
              <h3>
              FCFA {summary.totalRevenue.toLocaleString()}
            </h3>
            </div>
          </div>

          <div className="finance-card">
            <div className="finance-icon blue">
              <HiOutlineBuildingLibrary />
            </div>

            <div>
              <p>Online Transfers</p>
              <h3>
              FCFA {summary.bankTransfers.toLocaleString()}
            </h3>
            </div>
          </div>

          <div className="finance-card">
            <div className="finance-icon orange">
              <HiOutlineBanknotes />
            </div>

            <div>
              <p>Cash Payments</p>
              <h3>
                FCFA {summary.cashPayments.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="finance-card">
            <div className="finance-icon red">
              <HiOutlineDevicePhoneMobile />
            </div>

            <div>
              <p>Mobile Money</p>
              <h3>
                FCFA {summary.mobileMoney.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bookings-card">
          <div className="finance-header">
            <div>
              <h3>PAYMENT TRANSACTIONS</h3>
              <p>Real-time payments tracking and verification</p>
            </div>

            <div className="finance-actions">
              <div className="finance-search-box">
                <LuSearch />
                <input
                  type="text"
                  placeholder="Search by Transaction Id"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                    className="filter-select"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                <option>All Methods</option>
                <option>Cash</option>
                <option>Bank</option>
                <option>Mobile Money</option>
              </select>

              <button className="export-btn">
                <LuDownload />
                Export Reports
              </button>
            </div>
          </div>

          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Transaction ID</th>
                  <th>Route & Date</th>
                  <th>Amount</th>
                  <th>Cashier Name</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
<tbody>
  {filteredTransactions.map((item) => (
    <tr key={item.id}>
      <td>
        {new Date(item.transaction_date).toLocaleDateString()}
        <br />
        <small>{item.transaction_time}</small>
      </td>

      <td>{item.booking_id}</td>

      <td>{item.customer_name}</td>

      <td>{item.transaction_id}</td>

      <td>{item.route}</td>

      <td className="amount-text">
        FCFA {item.amount}
      </td>

      <td>{item.cashier_name}</td>

      <td>
        <span
          className={
            item.status === "Confirmed"
              ? "status-confirmed"
              : "status-pending"
          }
        >
          {item.status}
        </span>
      </td>

      <td>{item.payment_method}</td>

      <td className="action-cell">
        <LuEllipsisVertical />
      </td>
    </tr>
  ))}
</tbody>
              {/* <tbody>
                {transactions.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.date}
                      <br />
                      <small>{item.time}</small>
                    </td>

                    <td>{item.bookingId}</td>
                    <td>{item.customer}</td>
                    <td>{item.transactionId}</td>
                    <td>{item.route}</td>

                    <td className="amount-text">
                      {item.amount}
                    </td>

                    <td>{item.cashier}</td>

                    <td>
                      <span className="status-confirmed">
                        {item.status}
                      </span>
                    </td>

                    <td>{item.payment}</td>

                    <td className="action-cell">
                      <LuEllipsisVertical />
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Finance;