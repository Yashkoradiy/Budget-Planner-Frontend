import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import UserNavbar from './UserNavbar';
import ExpenceForm from './ExpenceForm';

export const UserSidebar = () => {
  return (
    <>
      {/* Navbar */}
      <UserNavbar />

      {/* Sidebar */}
      <aside
        className="app-sidebar shadow-lg"
        style={{
          position: "fixed",
          width: "260px",
          height: "100vh",
          top: "0",
          left: "0",
          backgroundColor: "#343a40",
          paddingTop: "80px",
          color: "white",
        }}
      >
        <div className="sidebar-brand text-center py-3 border-bottom">
          <Link to="/" className="text-white text-decoration-none">
            <h5>User Dashboard</h5>
          </Link>
        </div>

        <nav className="mt-4 px-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/budget-form" className="nav-link text-white">
                <i className="bi bi-person-circle me-2" /> Budget Form
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/budget-diagram" className="nav-link text-white">
                <i className="bi bi-palette me-2" /> Report
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/widgets" className="nav-link text-white">
                <i className="bi bi-box-seam-fill me-2" /> Widgets
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          marginLeft: "260px",
          paddingTop: "80px",
          padding: "20px",
          backgroundColor: "#f1f3f5",
          minHeight: "100vh",
        }}
      >
        <ExpenceForm />
      </main>
    </>
  );
};
