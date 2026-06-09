import "../App.css";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/");
  };

  const sendOtp = () => {
    navigate("/otp");
  };

  return (
    <div className="container">
      <div className="login-card">

        
        <div className="logo">
          <h1>Alonzii</h1>
        </div>

        
        <div className="text-block">
          <p className="back-link" onClick={goToLogin}>
            Back To Login
          </p>

          <h2 className="title">Reset Password</h2>
        </div>

        
        <p className="subtitle-text">
          Enter your registered phone number to receive a 6 digit OTP.
        </p>

      
        <div className="input-group">
          <label>Phone Number</label>
          <input type="text" placeholder="+237 000 000 000" />
        </div>

      
        <button className="login-btn" onClick={sendOtp}>
          Send OTP Code
        </button>

   
        <div className="footer">
          Powered by Alonzii Tech © 2026
        </div>

      </div>
    </div>
  );
}

export default ForgetPassword;