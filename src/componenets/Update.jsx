import { useNavigate } from "react-router-dom";
import "../App.css";

function UpdatePassword() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="login-card">

        <div className="logo">
          <h1>Alonzii</h1>
        </div>

        <p className="success-text">Successfully</p>

        <div className="check-circle">
          ✔
        </div>

        <h3 className="success-title">
          PASSWORD UPDATED
        </h3>

        <p className="success-message">
          Your password has been changed successfully. <br />
          You can now login with your new password.
        </p>

        <button className="back-btn" onClick={goToLogin}>
          Back to Login
        </button>

        <div className="footer">
          Powered by Alonzii Tech © 2026
        </div>

      </div>
    </div>
  );
}

export default UpdatePassword;