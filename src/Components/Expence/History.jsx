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
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const budgetResponse = await axios.get("/user/budget/");
      const salaryResponse = await axios.get("/user/salary/");

      const budgetData = budgetResponse.data;
      const salaryData = salaryResponse.data;

      const formattedExpenses = budgetData.map((expense) => ({
        id: expense._id,
        date: expense.date || "N/A",
        category: expense.category_id,
        type: "Expense",
        amount: expense.amount,
        description: expense.description || "N/A",
      }));

      const formattedSalaries = salaryData.map((salary) => ({
        id: salary._id,
        date: salary.date || "N/A",
        category: "-",
        type: "Income",
        amount: salary.amount,
        description: salary.source || "Salary",
      }));

      const combinedHistory = [...formattedExpenses, ...formattedSalaries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

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

  const handleDelete = async (id, type) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) return;

    try {
      if (type === "Expense") {
        await axios.delete(`/user/budget/${id}`);
      } else if (type === "Income") {
        await axios.delete(`/user/salary/${id}`);
      }
      // Refresh the data
      fetchHistory();
    } catch (error) {
      alert("Failed to delete entry.");
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = (entry) => {
    // Placeholder: open modal or redirect
    console.log("Update clicked for:", entry);
    alert(`Update logic for ${entry.type} with ID: ${entry.id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <UserSidebar />
      </div>

      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Transaction History</h2>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={styles.cardExpense}>
            <h4 style={styles.cardTitle}>Total Expense</h4>
            <p style={styles.cardAmount}>₹{totalExpense.toFixed(2)}</p>
          </div>

          <div style={styles.cardBalance}>
            <h4 style={styles.cardTitle}>Remaining Balance</h4>
            <p style={styles.cardAmount}>₹{(totalIncome - totalExpense).toFixed(2)}</p>
          </div>
        </div>

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
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry, index) => (
                <tr
                  key={index}
                  style={entry.type === "Income" ? styles.incomeRow : styles.expenseRow}
                >
                  <td style={styles.td}>{entry.date}</td>
                  <td style={styles.td}>{entry.category}</td>
                  <td style={styles.td}>{entry.type}</td>
                  <td style={styles.td}>₹{entry.amount.toFixed(2)}</td>
                  <td style={styles.td}>{entry.description}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleUpdate(entry)} style={styles.updateButton}>
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id, entry.type)}
                      style={styles.deleteIcon}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Styles
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
  cardExpense: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "180px",
    textAlign: "center",
    backgroundColor: "#fee2e2",
  },
  cardBalance: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "180px",
    textAlign: "center",
    backgroundColor: "#d1fae5",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardAmount: {
    fontSize: "20px",
    fontWeight: "600",
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
    backgroundColor: "#d1fae5",
  },
  expenseRow: {
    backgroundColor: "#fee2e2",
  },
  updateButton: {
    padding: "6px 10px",
    marginRight: "8px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  deleteIcon: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#dc2626",
  },
};

export default History;
