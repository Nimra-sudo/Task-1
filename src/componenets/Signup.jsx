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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

 
  const validate = () => {
    let tempErrors = {};

    if (!firstName) tempErrors.firstName = "First name is required";
    else if (firstName.length < 3) tempErrors.firstName = "Min 3 characters required";

    if (!lastName) tempErrors.lastName = "Last name is required";

    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Invalid email format";

    if (!userName) tempErrors.userName = "Username is required";
    else if (userName.length < 4) tempErrors.userName = "Min 4 characters required";

    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6) tempErrors.password = "Min 6 characters required";
    if (confirmPassword !== password)
      tempErrors.confirmPassword = "Passwords do not match";

    if (!agree) tempErrors.agree = "You must accept terms";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  
  const handleSignup = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("https://nimra-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      alert("Server not responding");
    }

    setLoading(false);
  };

  const isDisabled =
    !firstName ||
    !lastName ||
    !email ||
    !userName ||
    !password ||
    !confirmPassword ||
    !agree ||
    loading;
  

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
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

    
        <div className="input-group">
          <label>Username</label>
          <input value={userName} onChange={(e) => setUserName(e.target.value)} />
          {errors.userName && <span className="error-text">{errors.userName}</span>}
        </div>

       
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

     
        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

       
        <div className="checkbox-group">
          <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
          <label>I agree with Terms & Conditions</label>
        </div>
        {errors.agree && <span className="error-text">{errors.agree}</span>}

        <button
          className="login-btn"
          onClick={handleSignup}
          disabled={isDisabled}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="back-link" onClick={() => navigate("/login")}>
          ← Back to Login
        </p>

      </div>
    </div>
  );
}

export default Signup;