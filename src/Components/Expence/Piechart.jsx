import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { UserSidebar } from "../layouts/UserSidebar";
import axios from "axios";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Replace this URL with your actual FastAPI endpoint
    axios
      .get("user/budget/")
      .then((response) => {
        const { labels, data } = response.data;

        setChartData({
          labels,
          datasets: [
            {
              label: "Expenses",
              data,
              backgroundColor: [
                "Blue",
                "Red",
                "Green",
                "Yellow",
                "Purple",
                "Orange", // Add more if needed
              ],
              hoverOffset: 4,
            },
          ],
        });
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
        position: "bottom",
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
          {chartData.datasets.length > 0 ? (
            <Pie data={chartData} options={options} />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
