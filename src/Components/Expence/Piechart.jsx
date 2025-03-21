import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

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

  return (
    <div style={{ width: "250px", height: "250px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
