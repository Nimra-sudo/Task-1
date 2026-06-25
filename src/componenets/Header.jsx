import "../App.css";
import { TbWorld } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";

function Header({ title, subtitle }) {
  return (
    <div className="topbar">
      <div>
        <h1>{title}</h1>
        <div className="topbar-subtitle">
          {subtitle}
        </div>
      </div>

      <div className="topbar-actions">
        <div className="status-badge">
          <div className="status-dot"></div>
          Online
        </div>

        <button className="topbar-icon-btn language-btn">
          <TbWorld />
              EN
        </button>

        <button className="topbar-icon-btn">
          <IoIosNotifications />
        </button>

        <div className="agency-name">
          Agency Name ▾
        </div>
      </div>
    </div>
  );
}

export default Header;