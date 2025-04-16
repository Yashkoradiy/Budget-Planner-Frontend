import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserSidebar } from "/src/Components/layouts/UserSidebar";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch expenses from Budget API
        const budgetResponse = await axios.get("user/budget/");
        const budgetData = budgetResponse.data;

        // Fetch salaries from Salary API
        const salaryResponse = await axios.get("user/salary/");
        const salaryData = salaryResponse.data;

        // Format expenses
        const formattedExpenses = budgetData.map((expense) => ({
          date: expense.date || "N/A",
          category: expense.category_id,
          type: "Expense",
          amount: expense.amount,
          description: expense.description || "N/A",
        }));

        // Format salaries
        const formattedSalaries = salaryData.map((salary) => ({
          date: salary.date || "N/A",
          type: "Income",
          amount: salary.amount,
          description: salary.source || "Salary",
        }));

        // Combine and sort transactions by date (newest first)
        const combinedHistory = [...formattedExpenses, ...formattedSalaries].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Calculate totals
        const expenseTotal = formattedExpenses.reduce((sum, e) => sum + e.amount, 0);
        const incomeTotal = formattedSalaries.reduce((sum, i) => sum + i.amount, 0);

        setTotalExpense(expenseTotal);
        setTotalIncome(incomeTotal);
        setHistoryData(combinedHistory);
      } catch (error) {
        setError("Failed to fetch transaction history");
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Transaction History</h2>

        {/* Cards */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              minWidth: "180px",
              textAlign: "center",
              backgroundColor: "#fee2e2",
            }}
          >
            <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>Total Expense</h4>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>₹{totalExpense.toFixed(2)}</p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              minWidth: "180px",
              textAlign: "center",
              backgroundColor: "#d1fae5",
            }}
          >
            <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>Remaining Balance</h4>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>
              ₹{(totalIncome - totalExpense).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p style={styles.loading}>Loading history...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : historyData.length === 0 ? (
          <p style={styles.noData}>No transactions found</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Description</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry, index) => (
                <tr
                  key={index}
                  style={entry.type === "Income" ? styles.incomeRow : styles.expenseRow}
                >
                  <td style={styles.td}>{entry.date}</td>
                  <td style={styles.td}>{entry.category || "-"}</td>
                  <td style={styles.td}>{entry.type}</td>
                  <td style={styles.td}>₹{entry.amount.toFixed(2)}</td>
                  <td style={styles.td}>{entry.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1a202c",
    padding: "20px",
    color: "white",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  loading: {
    textAlign: "center",
    color: "#666",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  noData: {
    textAlign: "center",
    color: "#666",
  },
  table: {
    width: "100%",
    maxWidth: "800px",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "5px",
    overflow: "hidden",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#1f2937",
    color: "#ffffff",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #374151",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  incomeRow: {
    backgroundColor: "#d1fae5", // Light green for income
  },
  expenseRow: {
    backgroundColor: "#fee2e2", // Light red for expense
  },
};

export default History;
