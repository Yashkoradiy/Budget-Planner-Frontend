import React from "react";
import { Link } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import ExpenceForm from "./ExpenceForm";

export const UserSidebar = () => {
  // Sidebar and Main Layout Styling
  const styles = {
    sidebar: {
      position: "fixed",
      width: "260px",
      height: "100vh",
      top: "0",
      left: "0",
      backgroundColor: "#1f2937", // Dark gray (Tailwind `gray-800`)
      paddingTop: "80px",
      color: "#ffffff",
      boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
    },
    sidebarBrand: {
      textAlign: "center",
      padding: "20px",
      borderBottom: "1px solid #374151", // Slight separation
      fontSize: "18px",
      fontWeight: "bold",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 20px",
      color: "#d1d5db", // Light gray text
      textDecoration: "none",
      fontSize: "16px",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    navItemHover: {
      backgroundColor: "#374151",
      color: "#ffffff",
    },
    mainContent: {
      marginLeft: "260px",
      padding: "80px 20px",
      backgroundColor: "#f3f4f6", // Light gray
      minHeight: "100vh",
    },
  };

  return (
    <div>
      {/* Navbar */}
      <UserNavbar />

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            User Dashboard
          </Link>
        </div>

        <nav>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li>
              <Link
                to="/budget-form"
                style={styles.navItem}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.navItemHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.navItem)}
              >
                <i className="bi bi-wallet me-2"></i> Budget Form
              </Link>
            </li>
            <li>
              <Link
                to="/budget-diagram"
                style={styles.navItem}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.navItemHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.navItem)}
              >
                <i className="bi bi-bar-chart me-2"></i> Report
              </Link>
            </li>
            <li>
              <Link
                to="/widgets"
                style={styles.navItem}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.navItemHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.navItem)}
              >
                <i className="bi bi-cash-coin me-2"></i> Salary
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <ExpenceForm />
      </main>
    </div>
  );
};
