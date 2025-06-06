import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  // Login Function
  const submitHandler = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("/user/login", data);

      console.log("User ID:", res.data.user._id);
      console.log("API Response:", res.data);

      if (res.status === 200) {
        localStorage.setItem("id", res.data.user._id);
        localStorage.setItem("role", res.data.user.role.name);

        toast.success("✅ Login successful!!", {
          position: "top-center",
          autoClose: 3000,
        });

        setTimeout(() => {
          if (res.data.user.role.name === "User") {
            navigate("/dashboard");
          } else if (res.data.user.role.name === "Admin") {
            navigate("/admin");
          }
        }, 3000);
      }
    } catch (err) {
      toast.error("❌ Invalid email or password. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Function
  const forgotPasswordHandler = async () => {
    if (!email) {
      toast.error("❌ Please enter your email!", { position: "top-center" });
      return;
    }

    setForgotLoading(true);
    try {
      const res = await axios.post(`/forgotpassword?email=${email}`);
      console.log(res.data);
      toast.success("📩 Reset link sent! Check your email.");
    } catch (err) {
      toast.error("❌ Error sending reset link!", { position: "top-center" });
    } finally {
      setForgotLoading(false);
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url('src/Image/login.jpg') no-repeat center center/cover`,
  };

  const cardStyle = {
    width: "350px",
    padding: "25px",
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
    color: "black",
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

  const forgotButtonStyle = {
    background: "none",
    color: "#ff7e5f",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div style={cardStyle}>
        <h2 style={{ color: "red", marginBottom: "15px" }}>🔒 Login</h2>

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

        {/* Forgot Password */}
        <button
          style={forgotButtonStyle}
          onClick={() => setForgotPasswordClicked(!forgotPasswordClicked)}
        >
          Forgot Password?
        </button>

        {forgotPasswordClicked && (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <button
              style={buttonStyle}
              onClick={forgotPasswordHandler}
              disabled={forgotLoading}
            >
              {forgotLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
