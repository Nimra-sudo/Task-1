import { useNavigate } from "react-router-dom";
import "../App.css";

function OtpVerify() {
    const navigate = useNavigate()
    function handleclick(){
        navigate ("/recreate")
        
    }
  return (
    <div className="container">
      <div className="login-card">

        <div className="logo">
          <h1>Alonzii</h1>
        </div>

        <p className="subtitle">Account Recovery</p>

        <div className="input-group">
          <label><h2>Verify Otp</h2></label>

          <p className="otp-text">
            We have sent code to your phone number 03401225768
          </p>

      
          <div className="otp-boxes">
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
            <input type="text" maxLength="1" />
          </div>
        </div>

        <p className="resend-text">
          Didn’t receive code? <span>Resend</span>
        </p>

        <p className="sms-text">OTP sent via SMS</p>
       
        <button onClick={handleclick} className="login-btn">Verify OTP</button>

        <div className="footer">
          Powered by Alonzii Tech © 2026
        </div>

      </div>
    </div>
  );
}

export default OtpVerify;