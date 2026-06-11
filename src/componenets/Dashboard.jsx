import "../App.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">Techon Venture</h2>
<p className="tag">Software House Panel</p>
<nav>
<a href="#" className="active">Overview</a>
<a href="#">Projects</a>
 <a href="#">Clients</a>
 <a href="#">Teams</a>
 <a href="#">Settings</a>
        </nav></aside>
      <main class="main">
        <div className="topbar">
          <h2>Dashboard Overview</h2>
          <button className="btn">New Project</button> </div>
        <div classe="cards">
<div class="card">
     <h4>Active Projects</h4>
        <p>18</p> </div>
<div class="card">
            <h4>Clients</h4>
            <p>42</p></div>
          <div class="card">
  <h4>Revenue</h4>
            <p>$28,400</p> </div>   </div>
         <div className="graph">  </div> </main>
 </div>
)
}

export default Dashboard