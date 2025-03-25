import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (data) => {
    setLoading(true);
    setError("");

    data.role_id = "67c55cb94afdb81cecd9eceb";
    data.status = data.status === "true";

    try {
      const res = await axios.post("/user", data);
      console.log("Signup Response:", res.data);

      if (res.status === 201) {
        toast.success("🎉 Signup successful! Redirecting...", {
          position: "top-center",
          autoClose: 3000, // 3 seconds
        });
        setTimeout(() => navigate("/login"), 3000); // Redirect after toast
      } else {
        toast.error("❌ Signup failed. Please try again.");
      }
    } catch (err) {
      toast.error("⚠️ Error signing up. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url('src/Image/sign-up.jpg') no-repeat center center/cover`,
  };

  const cardStyle = {
    width: "350px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "10px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "none",
    borderRadius: "5px",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    background: loading ? "#ccc" : "#ff7e5f",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.3s",
  };

  const spinnerStyle = {
    width: "18px",
    height: "18px",
    border: "2px solid white",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  };

  return (
    <div style={containerStyle}>
      {/* Toast Notifications */}
      <ToastContainer />

      <style>
        {`
          ::placeholder {
            color: rgba(255, 255, 255, 0.7);
            opacity: 1;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={cardStyle}>
        <h2 style={{ color: "#fff", marginBottom: "15px" }}>📝 Signup</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit(submitHandler)}>
          <input type="text" placeholder="First Name" {...register("firstName")} style={inputStyle} required />
          <input type="text" placeholder="Last Name" {...register("lastName")} style={inputStyle} required />
          <input type="number" placeholder="Age" {...register("age")} style={inputStyle} required />
          <input type="text" placeholder="Status (true/false)" {...register("status")} style={inputStyle} required />
          <input type="email" placeholder="Email" {...register("email")} style={inputStyle} required />
          <input type="password" placeholder="Password" {...register("password")} style={inputStyle} required />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? <div style={spinnerStyle}></div> : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};
