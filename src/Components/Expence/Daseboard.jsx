import React from "react";
import { UserSidebar } from "/src/Components/layouts/UserSidebar";

const Daseboard = () => {
  const styles = {
    pageLayout: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "250px",
      backgroundColor: "#f5f5f5", // Optional custom sidebar background
    },
    container: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "60px",
      background: "linear-gradient(to right, #e0f7fa, #ffffff)",
    },
    textContainer: {
      width: "50%",
    },
    subHeading: {
      color: "#5C6BC0",
      fontWeight: "bold",
      fontSize: "14px",
      letterSpacing: "1px",
      marginBottom: "20px",
    },
    heading: {
      fontSize: "42px",
      fontWeight: "700",
      color: "#263238",
      marginBottom: "20px",
      lineHeight: "1.3",
    },
    description: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "30px",
    },
    button: {
      backgroundColor: "#5C6BC0",
      color: "white",
      padding: "12px 24px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
    },
    imageContainer: {
      width: "40%",
      textAlign: "center",
    },
    image: {
      width: "100%",
      borderRadius: "12px",
    }
  };

  return (
    <div style={styles.pageLayout}>
      <div style={styles.sidebar}>
        <UserSidebar />
      </div>
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <p style={styles.subHeading}>SMART BUDGETING MADE EASY</p>
          <h1 style={styles.heading}>
            Plan your budget. <br />
            We’ll help you stay on track.
          </h1>
          <p style={styles.description}>
            Whether you're saving for a trip or managing daily expenses, our budget planner gives you control.
            Monitor your spending, set financial goals, and make every rupee count.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img
            src="src/Image/Daseboard.jpg"
            alt="Planner"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Daseboard;
