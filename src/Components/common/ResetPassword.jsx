import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserSidebar } from "../layouts/UserSidebar";

export const ResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/resetpassword", {
        password: data.password,
        token: token,
      });

      toast.success("✅ Password reset successfully!", { autoClose: 2000 });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error("❌ " + (err.response?.data?.detail || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "url('/src/img/pass.jpg') no-repeat center center/cover",
  };

  const cardStyle = {
    width: "350px",
    padding: "25px",
    background: "rgba(255, 255, 255, 0.2)", // Slightly transparent
    backdropFilter: "blur(10px)", // Frosted glass effect
    borderRadius: "10px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    fontSize: "16px",
    background: "rgba(255, 255, 255, 0.4)", // Slight transparency for input
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div style={cardStyle}>
        <h2 style={{ color: "#333", marginBottom: "15px" }}>🔑 Reset Password</h2>

        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="password"
            placeholder="Enter new password"
            {...register("password")}
            style={inputStyle}
            required
          />

          <button
            type="submit"
            style={loading ? { ...buttonStyle, background: "#999" } : buttonStyle}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};