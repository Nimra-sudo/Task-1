import { useNavigate } from "react-router-dom";
import "../App.css";

function Recreate() {
    const navigate = useNavigate()
    function handleclick(){
        navigate ("/update")
    }
  return (
    <div className="container">
      <div className="login-card">
        <div className="logo">
          <h1>Alonzii</h1>
        </div>

        <p className="subtitle">
          Create new password
          <p>our new passward must be differnet from previous passward</p>
        </p>

        <div className="input-group">
          <label>New Password</label>
          <input type="password" placeholder="Enter password" />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm password" />
        </div>

        <button onClick={handleclick} className="login-btn">Reset Password</button>

        <div className="footer">
          Powered by Alonzii Tech © 2026
        </div>
      </div>
    </div>
  );
}

export default Recreate;