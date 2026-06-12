import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "pass123") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <div className="login-card">

        <div className="logo">
          <h1>Alonz</h1>
        </div>

        <p className="subtitle">Welcome back! Please enter your details.</p>
        <div className="input-group">
          <label>Admin/Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <div className="label-row">
            <label>Password</label>

            <a
              onClick={() => navigate("/forget")}
              style={{ cursor: "pointer", color: "blue" }}>
              Forgot Password?
            </a>
          </div>

         <div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <span
    className="eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
  </span>
</div>

        </div>
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}</p>
        )}

        <button className="login-btn" onClick={handleLogin}>
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