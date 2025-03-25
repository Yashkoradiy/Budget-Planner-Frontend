import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenceForm = () => {
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

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Adding..." : "Add Budget"}
        </button>
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  form: {
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

export default ExpenceForm;
