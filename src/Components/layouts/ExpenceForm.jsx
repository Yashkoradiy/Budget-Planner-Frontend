import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserSidebar } from "./UserSidebar";

const ExpenseForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log("Form Data:", formData);

    try {
      const response = await axios.post("http://localhost:8000/user/budget", formData);
      console.log("Response:", response.data);

      if (response.status === 201) {
        toast.success("✅ Budget added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        reset(); // Clear the form after successful submission
      } else {
        toast.error("❌ Failed to add budget. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Error adding budget: " + (error.response?.data?.detail || "Unknown error"), {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="light" />

        <h2 style={styles.title}>Add Budget</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <label style={styles.label}>Amount:</label>
          <input type="number" {...register("amount", { required: true })} style={styles.input} />

          <label style={styles.label}>Description:</label>
          <input type="text" {...register("description", { required: true })} style={styles.input} />

          <label style={styles.label}>Category:</label>
          <input type="text" {...register("category_id", { required: true })} style={styles.input} />

          <label style={styles.label}>Sub-Category:</label>
          <input type="text" {...register("sub_category_id", { required: true })} style={styles.input} />

          <label style={styles.label}>Date:</label>
          <input
            type="date"
            {...register("date", { required: true })}
            style={styles.input}
            defaultValue={new Date().toISOString().split("T")[0]}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Adding..." : "Add Budget"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline CSS styles
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "40px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  form: {
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ExpenseForm;
