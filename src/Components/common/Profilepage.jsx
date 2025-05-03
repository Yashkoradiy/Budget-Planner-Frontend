import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:8000/addprofile/");
        setUserData(res.data);
        setUpdatedData({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          
        });
      } catch (err) {
        toast.error("⚠️ Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", updatedData.firstName);
    formData.append("lastName", updatedData.lastName);
    formData.append("email", updatedData.email);
    formData.append("phone", updatedData.phone);
    
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const res = await axios.put("/user/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("🎉 Profile updated successfully!");
      setUserData(res.data);
    } catch (err) {
      toast.error("⚠️ Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url('src/Image/profile-background.jpg') no-repeat center center/cover`,
  };

  const cardStyle = {
    width: "350px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.8)",
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
    background: "rgba(255, 255, 255, 0.7)",
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
      <ToastContainer />
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "15px" }}>Profile</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <img
              src={userData.profileImage || "default-profile.jpg"}
              alt="Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                background: "rgba(255, 255, 255, 0.7)",
                marginBottom: "15px",
                color: "#fff",
              }}
            />
          </div>

          <input
            type="text"
            name="firstName"
            value={updatedData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="lastName"
            value={updatedData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            style={inputStyle}
            required
          />
          <input
            type="email"
            name="email"
            value={updatedData.email}
            onChange={handleChange}
            placeholder="Email"
            style={inputStyle}
            required
          />
          <input
            type="tel"
            name="phone"
            value={updatedData.phone}
            onChange={handleChange}
            placeholder="Phone"
            style={inputStyle}
            required
          />
         

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? <div style={spinnerStyle}></div> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
