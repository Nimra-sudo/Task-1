import { Routes, Route } from "react-router-dom";

import Login from "./componenets/Login";
import ForgetPassward from "./componenets/Forgetpassward";
import OtpVarify from "./componenets/Otpvarify";
import Recreate from "./componenets/Recreate";
import Update from "./componenets/Update";
import Dashboard from "./componenets/Dashboard";
import Signup from "./componenets/Signup";
import Bookings from "./componenets/Bookings";
import Manual from "./componenets/Manual";
import Finance from "./componenets/Finance";
import RoleManagement from "./componenets/RoleManagement";
import Buses from "./componenets/Buses";
import AgencySettings from "./componenets/AgencySetting";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/forget" element={<ForgetPassward />} />
      <Route path="/otp" element={<OtpVarify />} />
      <Route path="/recreate" element={<Recreate />} />
      <Route path="/update" element={<Update />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<Bookings />} />
    
     <Route path="/mannual-booking" element={<Manual />} />
     <Route path="/finance" element={<Finance />} />
     <Route path="/management" element={<RoleManagement />} />
       <Route path="/bus" element={<Buses />} />
              <Route path="/settings" element={<AgencySettings />} />
      
    </Routes>
  );
}

export default App;