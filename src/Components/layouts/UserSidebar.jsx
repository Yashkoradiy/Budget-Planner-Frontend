import React from "react";
import { Link } from "react-router-dom";

export const UserSidebar = () => {
  const styles = {
    sidebar: {
      position: "fixed",
      width: "260px",
      height: "100vh",
      top: "0",
      left: "0",
      backgroundColor: "#1f2937",
      paddingTop: "80px",
      color: "#ffffff",
      boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
    },
    sidebarBrand: {
      textAlign: "center",
      padding: "20px",
      borderBottom: "1px solid #374151",
      fontSize: "18px",
      fontWeight: "bold",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 20px",
      color: "#d1d5db",
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
      backgroundColor: "#f3f4f6",
      minHeight: "100vh",
    },
  };

  return (
    <div>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <Link to="/user" style={{ color: "#fff", textDecoration: "none" }}>
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
                to="/salary-form"
                style={styles.navItem}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.navItemHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.navItem)}
              >
                <i className="bi bi-cash-coin me-2"></i> Salary
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                style={styles.navItem}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.navItemHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.navItem)}
              >
                <i className="bi bi-clock-history me-2"></i> History
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}></main>
    </div>
  );
};
