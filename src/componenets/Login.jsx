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
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid login");
      }
    } catch (err) {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

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
              style={{ cursor: "pointer", color: "blue" }}
            >
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
            {error}
          </p>
        )}

       
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="footer">
          Powered by Alonzii Tech © 2026
        </div>

      </div>
    </div>
  );
}

export default Login;