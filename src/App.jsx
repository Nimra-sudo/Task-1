import { Routes, Route } from "react-router-dom";

import Login from "./componenets/Login";
import ForgetPassward from "./componenets/Forgetpassward";
import OtpVarify from "./componenets/Otpvarify";
import Recreate from "./componenets/Recreate";
import Update from "./componenets/Update";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget" element={<ForgetPassward />} />
      <Route path="/otp" element={<OtpVarify />} />
      <Route path="/recreate" element={<Recreate />} />
      <Route path="/update" element={<Update/>} />
    
    </Routes>
  );
}

export default App;