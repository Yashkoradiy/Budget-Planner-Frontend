import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { UserSidebar } from "../layouts/UserSidebar";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Food", "Rent", "Entertainment", "Transport", "Shopping"],
    datasets: [
      {
        label: "Expenses",
        data: [300, 700, 150, 200, 250], // Dummy expense values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom size
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Inline CSS for layout
  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  const sidebarStyle = {
    width: "250px",
    backgroundColor: "#1a202c",
    color: "white",
    padding: "20px",
  };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", // Align content to the top
    paddingTop: "40px", // Adds space at the top
  };

  const chartContainerStyle = {
    width: "350px",
    height: "350px",
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Budget Overview</h2>
        <div style={chartContainerStyle}>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
