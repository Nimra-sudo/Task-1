import "../App.css";
function Dashboard() {
  return (
  <div class="dashboard-page">
<div className="top-section">
<h2>Analytics Dashboard</h2>
<div className="action-buttons">
<button className="add-btn">+ Add New Bus</button>
<button className="booking-btn">Create Booking</button></div> </div>
      <div class="stats-container">
        <div class="stat-card">
          <h4>Total Bookings</h4>
          <h2>32</h2> </div>
       <div class="stat-card">
          <h4>Total Buses</h4>
          <h2>166</h2> </div>
        <div class="stat-card">
          <h4>Total Customers</h4>
          <h2>1240</h2>
        </div></div>
      <div class="chart-container">
 <div class="chart-card">
          <h3>Booking Trends</h3>
          <div className="fake-chart line-chart"></div> </div>
       <div className="chart-card">
          <h3>Revenue Analytics</h3>
          <div className="fake-chart bar-chart">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>   </div> 
          </div>
    
      <div class="table-section">
        <h3>Recent Bookings</h3>
         <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Passenger</th>
              <th>Route</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#BK101</td>
              <td>Ali Khan</td>
              <td>Karachi - Lahore</td>
              <td>$120</td>
              <td><span className="status">Confirmed</span></td>
            </tr>

            <tr>
              <td>#BK102</td>
              <td>Ahmed</td>
              <td>Islamabad - Karachi</td>
              <td>$90</td>
              <td><span className="status">Confirmed</span></td>
            </tr>

            <tr>
              <td>#BK103</td>
              <td>Sara</td>
              <td>Lahore - Multan</td>
              <td>$60</td>
              <td><span className="status">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div></div>

 
  );
}

export default Dashboard;