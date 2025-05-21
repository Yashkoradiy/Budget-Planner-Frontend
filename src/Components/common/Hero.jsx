import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
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
    hero: {
      backgroundImage: "url('src/Image/hero-image.jpg')",
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
    featuresSection: {
      padding: "60px 20px",
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      flexWrap: "wrap",
      backgroundColor: "#fff",
    },
    featureCard: {
      width: "300px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      textAlign: "center",
    },
    featureImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "15px",
    },
    featureTitle: {
      fontSize: "1.3em",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    featureText: {
      fontSize: "1em",
      color: "#555",
    },
    footer: {
      backgroundColor: "#222",
      color: "#fff",
      padding: "40px 20px",
      textAlign: "center",
    },
    footerLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    footerLink: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "1em",
    },
    copyright: {
      fontSize: "0.9em",
      color: "#bbb",
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
              <Link to="/login" style={styles.navLink}>Login</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/signup" style={styles.navLink}>Sign Up</Link>
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
          <Link to="/signup" style={styles.heroButton}>Sign Up</Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featureCard}>
          <img src="https://cdn-icons-png.flaticon.com/512/1904/1904425.png" alt="Track Budget" style={styles.featureImage} />
          <div style={styles.featureTitle}>Track Your Budget</div>
          <div style={styles.featureText}>
            Record income & expenses with categories. <br />
            
          </div>
        </div>
        <div style={styles.featureCard}>
          <img src="https://cdn-icons-png.flaticon.com/512/4228/4228709.png" alt="Analytics" style={styles.featureImage} />
          <div style={styles.featureTitle}>Visualize Analytics</div>
          <div style={styles.featureText}>
            Get monthly spending charts and stats. <br />
            
          </div>
        </div>
        <div style={styles.featureCard}>
          <img src="https://cdn-icons-png.flaticon.com/512/9068/9068776.png" alt="Set Goals" style={styles.featureImage} />
          <div style={styles.featureTitle}>Set Financial Goals</div>
          <div style={styles.featureText}>
            Create savings goals to stay motivated. <br />
            
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <Link to="/about" style={styles.footerLink}>About</Link>
          <Link to="/contact" style={styles.footerLink}>Contact</Link>
          <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
          <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
        </div>
        <p style={styles.copyright}>
          &copy; {new Date().getFullYear()} BudgetWise. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Hero;
