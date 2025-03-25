import React from "react";
import { Link } from "react-router-dom";

const HeroPage = () => {
  // Inline CSS styles
  const styles = {
    body: {
      fontFamily: "sans-serif",
      margin: "0",
      padding: "0",
      backgroundColor: "#f4f4f4",
    },
    header: {
      backgroundColor: "#ffffff",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      fontSize: "1.5em",
      fontWeight: "bold",
    },
    nav: {
      display: "flex",
      listStyle: "none",
      padding: "0",
    },
    navItem: {
      marginLeft: "20px",
    },
    navLink: {
      textDecoration: "none",
      color: "#333",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
    },
    searchInput: {
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    searchButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      marginLeft: "5px",
      cursor: "pointer",
    },
    hero: {
      backgroundImage: "url('src/Image/hero-image.jpg')", // Replace with your image
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      textAlign: "center",
      padding: "150px 20px",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    heroContent: {
      position: "relative",
      zIndex: "1",
    },
    heroTitle: {
      fontSize: "3em",
      marginBottom: "20px",
    },
    heroText: {
      fontSize: "1.2em",
      marginBottom: "30px",
    },
    heroButton: {
      backgroundColor: "#5cb85c",
      color: "white",
      border: "none",
      padding: "15px 30px",
      fontSize: "1.2em",
      borderRadius: "5px",
      cursor: "pointer",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.body}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>▲ BudgetWise</div>
        <nav>
  <ul style={styles.nav}>
    <li style={styles.navItem}>
      <Link to="/login" style={styles.navLink}>
        Login
      </Link>
    </li>
    <li style={styles.navItem}>
      <Link to="/signup" style={styles.navLink}>
        Sign Up
      </Link>
    </li>
    <li style={styles.navItem}>
      <Link to="/help" style={styles.navLink}>
        Help
      </Link>
    </li>
  </ul>
</nav>

       
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.overlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Take Charge of Your Finances</h1>
          <p style={styles.heroText}>Effortlessly manage your budget and achieve your financial goals.</p>
          <Link to="/signup" style={styles.heroButton}>
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
