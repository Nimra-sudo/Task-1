import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="login-card">
        
        <div className="logo">
          <h1>Alonz</h1>
        </div>

        <p className="subtitle">
          Welcome back! Please enter your details.
        </p>

        <div className="input-group">
          <label>Admin/Username</label>
          <input type="text" placeholder="Enter username" />
        </div>

        <div className="input-group">
          <div className="label-row">
            <label>Password</label>

            <a
              onClick={() => navigate("/forget")}style={{ cursor: "pointer", color: "blue" }}>
              Forgot Password?
            </a>
          </div>

          <input type="password" placeholder="Enter password" />
        </div> 
        <button
          className="login-btn"
          onClick={() => navigate("/otp")}   
        >
          Login
        </button>

        <div className="footer">
          Powered by Alonzii Tech © 2026
        </div>

      </div>
    </div>
  );
}

export default Login;