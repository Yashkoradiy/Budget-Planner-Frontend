import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AdminSignup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (data) => {
    setLoading(true);
    setError("");

    data.role_id = "67c158fd996242a915da42ba";
    data.status = data.status === "true" ? true : false;

    try {
      const res = await axios.post("/user", data);
      console.log("Signup Response:", res.data);

      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Error signing up. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #141e30, #243b55)",
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
        <h2 style={{ color: "#fff", marginBottom: "15px" }}>📝 Signup</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            style={inputStyle}
            required
          />
          <input
            type="number"
            placeholder="Age"
            {...register("age")}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Status (true/false)"
            {...register("status")}
            style={inputStyle}
            required
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};
