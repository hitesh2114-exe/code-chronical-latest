import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SplitText from "../Animation/SplitText";
import HeroImage from "../../public/hero-image.jpg";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSigningIn) return;

    setIsSigningIn(true);

    try {
      const response = await axios.post(
        "https://code-chronical-latest-backend.onrender.com/api/auth/login",
        formData
      );
      setError("");
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "something went wrong");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <Box className="login-container">
      <img src={HeroImage} alt="Hero Background" className="login-bg-image" />
      <Box className="login-gradient-overlay" />

      {/* Top Bar Navigation */}
      <Box className="login-back-home">
        <h3 className="login-back-home-text">
          back to{" "}
          <Link to="/" className="login-home-anchor">
            home page
          </Link>
        </h3>
      </Box>

      {/* Left Vertical Side Title */}
      <Box className="login-vertical-title">
        <h1 className="login-rotated-heading">
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
      <Box className="login-form-card">
        <Box className="login-header-group">
          <h1 className="login-form-header">
            <SplitText
              text="Login"
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
          <p className="login-subtext">Welcome back! Please enter your details.</p>
        </Box>

        <form onSubmit={handleLogin} className="login-form">
          <Box className="login-input-group">
            <TextField
              id="email"
              label="Email address"
              variant="outlined"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className="login-custom-textfield"
              autoComplete="email"
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              name="password"
              value={formData.password}
              className="login-custom-textfield"
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((visible) => !visible)}
                        onMouseDown={(event) => event.preventDefault()}
                        edge="end"
                        sx={{
                          color: "#f0f6fc",
                          "&:hover": { color: "#58a6ff" },
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box className="login-error-box">
            {error && (
              <p className="login-error-message">{error}, please try again.</p>
            )}
          </Box>

          <Button
            variant="contained"
            type="submit"
            className="login-submit-btn"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Box className="login-footer-box">
          <p className="login-footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="login-link-anchor">
              Register
            </Link>
          </p>
        </Box>
      </Box>

      {/* Bottom Right Tagline */}
      <Box className="login-tagline-box">
        <h3 className="login-tagline-text">every commit tells a story.</h3>
      </Box>
    </Box>
  );
}

export default Login;
