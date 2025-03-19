import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (data) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/user/login", data);

      console.log("User ID:", res.data.user._id);
      console.log("API Response:", res.data);

      if (res.status === 200) {
        localStorage.setItem("id", res.data.user._id);
        localStorage.setItem("role", res.data.user.role.name);

        if (res.data.user.role.name === "User") {
          navigate("/user");
        } else if (res.data.user.role.name === "Admin") {
          navigate("/admin");
        }
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
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
    background: "#ff7e5f",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#fff", marginBottom: "15px" }}>🔒 Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
