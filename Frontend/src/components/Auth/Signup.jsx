import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SplitText from "../Animation/SplitText";
import HeroImage from "../../public/hero-image.jpg";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://code-chronical-latest-backend.onrender.com/api/auth/register",
        formData
      );
      setError("");
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "something went wrong");
    }
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <Box className="signup-container">
      <img src={HeroImage} alt="Hero Background" className="signup-bg-image" />
      <Box className="signup-gradient-overlay" />

      {/* Top Bar Navigation */}
      <Box className="signup-back-home">
        <h3 className="signup-back-home-text">
          back to{" "}
          <Link to="/" className="signup-home-anchor">
            home page
          </Link>
        </h3>
      </Box>

      {/* Left Vertical Side Title */}
      <Box className="signup-vertical-title">
        <h1 className="signup-rotated-heading">
          <SplitText
            text="code chronicle"
            className="text-2xl font-semibold text-center"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            showCallback
          />
        </h1>
      </Box>

      {/* Glassmorphic Auth Box */}
      <Box className="signup-form-card">
        <Box className="signup-header-group">
          <h1 className="signup-form-header">
            <SplitText
              text="Register"
              className="text-2xl font-semibold text-center"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
              showCallback
            />
          </h1>
          <p className="signup-subtext">Create an account to get started.</p>
        </Box>

        <form onSubmit={handleRegister} className="signup-form">
          <Box className="signup-input-group">
            <TextField
              id="username"
              label="Username"
              onChange={handleChange}
              name="username"
              value={formData.username}
              variant="outlined"
              className="signup-custom-textfield"
              autoComplete="username"
            />
            <TextField
              id="email"
              label="Email address"
              variant="outlined"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className="signup-custom-textfield"
              autoComplete="email"
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              className="signup-custom-textfield"
              autoComplete="new-password"
            />
          </Box>

          <Box className="signup-error-box">
            {error && (
              <p className="signup-error-message">{error}, please try again.</p>
            )}
          </Box>

          <Button
            variant="contained"
            type="submit"
            className="signup-submit-btn"
          >
            Create Account
          </Button>
        </form>

        <Box className="signup-footer-box">
          <p className="signup-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="signup-link-anchor">
              Login
            </Link>
          </p>
        </Box>
      </Box>

      {/* Bottom Right Tagline */}
      <Box className="signup-tagline-box">
        <h3 className="signup-tagline-text">every commit tells a story.</h3>
      </Box>
    </Box>
  );
}

export default Signup;
