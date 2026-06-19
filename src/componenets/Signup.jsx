import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !userName || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (!agree) {
        alert("Please accept terms & conditions");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const res = await fetch("https://nimra-backend.onrender.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            userName,
            password,
        }),
        });

        const data = await res.json();

        if (data.success) {
        alert("Signup Successful");
        navigate("/login");
        } else {
        alert(data.message);
        }

    } catch (error) {
        console.log(error);
        alert("Server not responding");
    }
    };

  return (
    <div className="container">
      <div className="login-card">

        <div className="logo">
          <h1>Alonzii</h1>
        </div>

        <p className="subtitle">Create your account</p>

        <div className="row">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <label>I agree with Terms & Conditions</label>
        </div>

        <button className="login-btn" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="back-link" onClick={() => navigate("/login")}>
          ← Back to Login
        </p>

        <div className="footer">
          Powered by Alonzii Tech © 2026
        </div>

      </div>
    </div>
  );
}

export default Signup;