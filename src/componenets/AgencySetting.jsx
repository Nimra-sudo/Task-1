import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";
import { HiOutlineCamera } from "react-icons/hi2";
import { LuCircleCheck } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AgencySetting() {
  const [agency, setAgency] = useState(null);
  const [originalAgency, setOriginalAgency] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);
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
    fetch("https://nimra-backend.onrender.com/agency-settings", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAgency(data.agency);
          setOriginalAgency(data.agency);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://nimra-backend.onrender.com/agency-settings",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agency),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAgency(data.agency);
        setOriginalAgency(data.agency);
        setIsEditing(false);
        alert("Agency settings updated successfully!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDiscard = () => {
    setAgency(originalAgency);
    setIsEditing(false);
  };

  // Frontend preview only
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setAgency({
      ...agency,
      cover_photo: imageUrl,
    });
  };

  if (!agency) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <h2>Loading...</h2>
        </main>
      </div>
    );
  }

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
            <button
              className="btn-dark"
              onClick={handleDiscard}
            >
              Discard Changes
            </button>

            <button
              className="btn-success"
              onClick={handleSave}
            >
              Save Profile Settings
            </button>
          </div>
        </div>

        <div className="agency-cover-card">
          <div className="agency-cover">
            <img
              src={agency.cover_photo || "./images.jpg"}
              alt="Agency Cover"
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />

            <button
              className="upload-btn"
              onClick={() =>
                fileInputRef.current.click()
              }
            >
              <HiOutlineCamera />
              Upload Cover Photo
            </button>
          </div>

          <div className="agency-profile">
            <div className="agency-logo">
              {agency.logo || "ALONZII"}
            </div>

            <div className="agency-info">
              <div className="agency-title">
                <h3>{agency.agency_name}</h3>

                <p>
                  Fleet Operator Partner • Active since{" "}
                  {agency.active_since
                    ? new Date(
                        agency.active_since
                      ).toLocaleDateString()
                    : ""}
                </p>
              </div>

              <button
                className="edit-btn"
                onClick={() =>
                  setIsEditing(!isEditing)
                }
              >
                {isEditing
                  ? "Cancel Edit"
                  : "Edit Info"}
              </button>
            </div>
          </div>
        </div>

        <div className="agency-form-card">
          <h3>GENERAL INFORMATION</h3>

          <p className="section-text">
            Edit Agency Core Configurations Details
            Visible To Booking Desks.
          </p>

          <label>Agency Name</label>
          <input
            type="text"
            disabled={!isEditing}
            value={agency.agency_name || ""}
            onChange={(e) =>
              setAgency({
                ...agency,
                agency_name: e.target.value,
              })
            }
          />

          <label>Description / Bio</label>

          <textarea
            rows="4"
            disabled={!isEditing}
            value={agency.description || ""}
            onChange={(e) =>
              setAgency({
                ...agency,
                description: e.target.value,
              })
            }
          />

          <div className="form-grid">
            <div>
              <label>
                Operational Email Address
              </label>

              <input
                type="text"
                disabled={!isEditing}
                value={
                  agency.operational_email || ""
                }
                onChange={(e) =>
                  setAgency({
                    ...agency,
                    operational_email:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Contact Hotline</label>

              <input
                type="text"
                disabled={!isEditing}
                value={
                  agency.contact_hotline || ""
                }
                onChange={(e) =>
                  setAgency({
                    ...agency,
                    contact_hotline:
                      e.target.value,
                  })
                }
              />
            </div>
          </div>

          <hr />

          <h3>
            REGIONAL SETTINGS & LOCALIZATION
          </h3>

          <div className="form-grid">
            <div>
              <label>
                Base Headquarters Location
              </label>

              <input
                type="text"
                disabled={!isEditing}
                value={
                  agency.headquarters_location ||
                  ""
                }
                onChange={(e) =>
                  setAgency({
                    ...agency,
                    headquarters_location:
                      e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Operating Timezone</label>

              <input
                type="text"
                disabled={!isEditing}
                value={agency.timezone || ""}
                onChange={(e) =>
                  setAgency({
                    ...agency,
                    timezone: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AgencySetting;