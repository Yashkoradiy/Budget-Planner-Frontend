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

  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/budget")
      .then((response) => {
        const expenses = response.data;

        // Group by category and sum
        const categoryTotals = {};
        let total = 0;

        expenses.forEach((item) => {
          const category = item.category_id || "Uncategorized";
          if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
          }
          categoryTotals[category] += item.amount;
          total += item.amount;
        });

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Category-wise Expenses",
              data: data,
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              hoverOffset: 4,
            },
          ],
        });

        setTotalExpense(total);
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
    marginBottom: "30px",
  };

  const cardStyle = {
    backgroundColor: "#f0f4f8",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    width: "300px",
    marginBottom: "20px",
  };

  const cardTitleStyle = {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const cardAmountStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
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

        {/* Total Expense Card */}
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Total Expense</div>
          <div style={cardAmountStyle}>₹{totalExpense.toLocaleString()}</div>
        </div>

        {/* Pie Chart */}
        <div style={chartContainerStyle}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
