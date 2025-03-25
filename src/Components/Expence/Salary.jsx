import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Salary = () => {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.date) {
      toast.error("❌ All fields are required!", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/salary/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("✅ Salary added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setFormData({ amount: "", date: "" });
      } else {
        toast.error("❌ Failed to add salary.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Server error. Try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <h3 style={{ textAlign: "center" }}>Salary Form</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    width: "300px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Salary;
