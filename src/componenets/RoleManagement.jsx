import Sidebar from "./Sidebar";
import Header from "./Header";
import "../App.css";

import {
  HiOutlineUserGroup,
} from "react-icons/hi2";

import {
  LuSearch,
  LuUserPlus,
  LuPencil,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";

function RoleManagement() {
  const agents = Array(7).fill({
    name: "Emmanuel Abbo",
    phone: "+237 123 123 123",
    email: "emmanuelabbo23@gmail.com",
    role: "Booker",
    permissions: "+2 Permissions",
    status: "Active",
  });

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Header
          title="USER MANAGEMENT"
          subtitle="Manage roles and account details for your team"
        />

        <div className="role-cards">
          <div className="role-card">
            <div>
              <p>Total Roles</p>
              <h3>12</h3>
            </div>

            <div className="role-icon">
              <HiOutlineUserGroup />
            </div>
          </div>

          <div className="role-card">
            <div>
              <p>Total Agents</p>
              <h3>15</h3>
            </div>

            <div className="role-icon">
              <HiOutlineUserGroup />
            </div>
          </div>

          <div className="role-card">
            <div>
              <p>Active Agents</p>
              <h3>10</h3>
            </div>

            <div className="role-icon">
              <HiOutlineUserGroup />
            </div>
          </div>
        </div>

      
        <div className="bookings-card">
          <div className="role-header">
            <h3>MY AGENTS</h3>

            <div className="role-actions">
              <div className="finance-search-box">
                <LuSearch />
                <input
                  type="text"
                  placeholder="Search by name, role, email"
                />
              </div>
              
              <div class="role-bt">
                <button className="btn-dark">
                  Manage Roles
                </button>

                <button className="btn-success">
                  <LuUserPlus />
                  Add Agent
                </button>
              </div>
            </div>
          </div>

          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {agents.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>

                    <td>{item.phone}</td>

                    <td>{item.email}</td>

                    <td>
                      <span className="role-badge">
                        {item.role}
                      </span>

                      <span className="permission-text">
                        {item.permissions}
                      </span>
                    </td>

                    <td>
                      <span className="status-active">
                        {item.status}
                        <LuChevronDown />
                      </span>
                    </td>

                    <td>
                      <div className="action-icons">
                        <button>
                          <LuPencil />
                        </button>

                        <button>
                          <LuTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RoleManagement;