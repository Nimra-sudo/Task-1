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
  const transactions = Array(8).fill({
    date: "Apr 10, 2026",
    time: "09:30 AM",
    bookingId: "BK-1001",
    customer: "John Doe",
    transactionId: "REF: ALZ-24-1001-TX",
    route: "Douala → Yaounde",
    amount: "FCFA 5,000",
    cashier: "Cashier Name 1",
    status: "Confirmed",
    payment: "Mobile Money",
  });
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
              <h3>24.8K</h3>
            </div>
          </div>

          <div className="finance-card">
            <div className="finance-icon blue">
              <HiOutlineBuildingLibrary />
            </div>

            <div>
              <p>Online Transfers</p>
              <h3>15.2K</h3>
            </div>
          </div>

          <div className="finance-card">
            <div className="finance-icon orange">
              <HiOutlineBanknotes />
            </div>

            <div>
              <p>Cash Payments</p>
              <h3>9.6K</h3>
            </div>
          </div>

          <div className="finance-card">
            <div className="finance-icon red">
              <HiOutlineDevicePhoneMobile />
            </div>

            <div>
              <p>Mobile Money</p>
              <h3>7.3K</h3>
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
                />
              </div>

              <select className="filter-select">
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
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Finance;