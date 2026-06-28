import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";
import { HiOutlineCamera } from "react-icons/hi2";
import { LuCircleCheck } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AgencySetting() {
  
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
          title="AGENCY PROFILE SETTINGS"
          subtitle="Fleet operations overview — April 2026"
        />

     
        <div className="agency-alert">
          <div>
            <LuCircleCheck />
            Changes Will Be Saved To Memory. Resetting Page Restores Original
            Defaults.
          </div>

          <div className="agency-buttons">
            <button className="btn-dark">
              Discard Changes
            </button>

            <button className="btn-success">
              Save Profile Settings
            </button>
          </div>
        </div>

       
        <div className="agency-cover-card">
          <div className="agency-cover">
            <img
              src="./images.jpg"
              alt="Agency Cover"
            />

            <button className="upload-btn">
              <HiOutlineCamera />
              Upload Cover Photo
            </button>
          </div>

          <div className="agency-profile">
            <div className="agency-logo">
              Alonzii
            </div>

            <div className="agency-info">
              <div className="agency-title">
                <h3>ALONZII EXPRESS AGENCY</h3>

                <p>
                  Fleet Operator Partner • Active since April 2026
                </p>
              </div>

              <button className="edit-btn">
                Edit Info
              </button>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="agency-form-card">
          <h3>GENERAL INFORMATION</h3>

          <p className="section-text">
            Edit Agency Core Configurations Details Visible To Booking Desks.
          </p>

          <label>Agency Name</label>
          <input
            type="text"
            value="Alonzii Express Agency"
            readOnly
          />

          <label>Description / Bio</label>

          <textarea
            rows="4"
            defaultValue="Leading premium transport and fleet management operations across major inter-city routes. Committed to safety, comfort, and real-time operational efficiency."
          />

          <div className="form-grid">
            <div>
              <label>Operational Email Address</label>

              <input
                type="text"
                value="operations@alonzii-express.com"
                readOnly
              />
            </div>

            <div>
              <label>Contact Hotline</label>

              <input
                type="text"
                value="+237 678 901 234"
                readOnly
              />
            </div>
          </div>

          <hr />

          <h3>REGIONAL SETTINGS & LOCALIZATION</h3>

          <div className="form-grid">
            <div>
              <label>Base Headquarters Location</label>

              <input
                type="text"
                value="Douala, Cameroon"
                readOnly
              />
            </div>

            <div>
              <label>Operating Timezone</label>

              <input
                type="text"
                value="GMT +1 (West Africa Time)"
                readOnly
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AgencySetting;