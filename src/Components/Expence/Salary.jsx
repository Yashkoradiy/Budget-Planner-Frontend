import React, { useState } from "react";

const Salary = () => {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.date) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/salary/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Salary added successfully!");
        setFormData({ amount: "", date: "" });
      } else {
        setMessage("Failed to add salary.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div style={{ width: "300px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "5px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
      <h3 style={{ textAlign: "center" }}>Salary Form</h3>
      {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
            required
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Salary;
