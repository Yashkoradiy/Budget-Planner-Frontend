import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { UserSidebar } from "../layouts/UserSidebar";
import axios from "axios";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Loading..."],
    datasets: [
      {
        label: "Loading",
        data: [1],
        backgroundColor: ["gray"],
      },
    ],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/budget") // Update this if needed
      .then((response) => {
        console.log("API response:", response.data);

        const labels = response.data.labels || [];
        const data = response.data.data || [];

        console.log("Labels:", labels);
        console.log("Data:", data);

        if (Array.isArray(labels) && Array.isArray(data) && data.length > 0) {
          setChartData({
            labels: labels,
            datasets: [
              {
                label: "Expenses",
                data: data,
                backgroundColor: [
                  "Blue",
                  "Red",
                  "Green",
                  "Yellow",
                  "Purple",
                  "Orange",
                  "#00CED1",
                  "#ADFF2F",
                  "#FF69B4",
                  "#CD5C5C",
                ],
                hoverOffset: 4,
              },
            ],
          });
        } else {
          console.warn("Invalid data from API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching pie chart data:", error);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

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
    justifyContent: "flex-start",
    paddingTop: "40px",
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
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Budget Overview
        </h2>
        <div style={chartContainerStyle}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
