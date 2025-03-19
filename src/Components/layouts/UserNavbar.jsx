import React from "react";

const UserNavbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          &#9776;
        </button>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Home</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Contact</a>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <i className="bi bi-search" style={{ cursor: "pointer" }}></i>
        <div style={{ position: "relative" }}>
          <i className="bi bi-chat-text" style={{ cursor: "pointer" }}></i>
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "red",
              color: "white",
              fontSize: "12px",
              borderRadius: "50%",
              padding: "3px 6px",
            }}
          >
            3
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <i className="bi bi-bell-fill" style={{ cursor: "pointer" }}></i>
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "yellow",
              color: "black",
              fontSize: "12px",
              borderRadius: "50%",
              padding: "3px 6px",
            }}
          >
            15
          </span>
        </div>
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          style={{ borderRadius: "50%", cursor: "pointer" }}
        />
      </div>
    </nav>
  );
};

export default UserNavbar;
