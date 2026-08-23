import React from "react";
import Box from "@mui/material/Box";
import HeroImage from "../../public/hero-image.jpg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SplitText from "../Animation/SplitText";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const naviagte = useNavigate();

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

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

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
      naviagte("/");
    } catch (err) {
      console.log(
        setError(err.response.data.message || "something went wrong")
      );
    }
  };

  const handleSignup = () => {
    console.log("register button clicked");
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          // backgroundColor: "pink",
          overflow: "hidden",
        }}
      >
        <img
          src={HeroImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(60%)",
          }}
        />
        <Box
          sx={{
            width: "auto",
            heigth: "auto",
            // backgroundColor: "red",
            position: "absolute",
            top: "19.5rem",
            left: "13.5rem",
            color: "whitesmoke",
          }}
        >
          <h1
            style={{
              transform: "rotate(-90deg)",
              fontSize: "3.8rem",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "300",
            }}
          >
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
        <Box
          sx={{
            width: "auto",
            heigth: "auto",
            // backgroundColor: "red",
            position: "absolute",
            top: "35rem",
            left: "53rem",
            color: "whitesmoke",
            zIndex: "6",
          }}
        >
          <h3
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: "300" }}
          >
            every commit tells a story.
          </h3>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "42vh",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1))",
            position: "absolute",
            bottom: "0",
          }}
        ></Box>
        <Box
          sx={{
            width: "40%",
            height: "60%",
            // backgroundColor: "red",
            position: "absolute",
            top: "18%",
            left: "30%",
            border: "1px solid white",
            borderRadius: "1rem",
            backdropFilter: "blur(5px)",
            display: "flex",
          }}
        >
          <Box style={{ position: "absolute", top: "1rem", left: "1.8rem" }}>
            <h1 style={{ fontSize: "3rem", color: "whitesmoke" }}>
              {" "}
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
          </Box>
          <form onSubmit={handleRegister}>
            <Box
              sx={{
                width: "80%",
                height: "45%",
                // backgroundColor: " pink",
                position: "absolute",
                left: "3.5rem",
                top: "5.5rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="username"
                onChange={handleChange}
                name="username"
                value={formData.username}
                variant="outlined"
                sx={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />{" "}
              <br />
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                onChange={handleChange}
                name="email"
                value={formData.email}
                sx={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />{" "}
              <br />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                sx={{
                  width: "100%",
                  marginBottom: "0.5rem",
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />{" "}
            </Box>
            <Box
              sx={{
                width: "80%",
                height: "12%",
                // backgroundColor: "red",
                position: "absolute",
                left: "3.5rem",
                top: "17.5rem",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "1.5rem",
                  paddingLeft: "1rem",
                  paddingBottom: "0.5rem",
                }}
              >
                {error && (
                  <p
                    style={{
                      fontsize: "0.8rem",
                      color: "whitesmoke",
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: "300",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {error}, Try again.
                  </p>
                )}
              </Box>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  height: "3rem",
                  backgroundColor: "whitesmoke",
                  color: "black",
                  borderRadius: "1.5rem",
                }}
              >
                Register
              </Button>
            </Box>
          </form>

          <Box
            sx={{
              width: "80%",
              height: "7%",
              // backgroundColor: "blue",
              position: "absolute",
              left: "3.5rem",
              bottom: "2.7rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                color: "whitesmoke",
                marginTop: "1rem",
                fontSize: "1rem",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: "300",
              }}
            >
              already have account?{" "}
              <Link
                to={"/login"}
                style={{
                  textDecorationColor: "white",
                  color: "whitesmoke",
                  textShadow: "0 0 2px white",
                  textUnderlineOffset: "0.2rem",
                }}
              >
                login
              </Link>{" "}
              here
            </h3>
          </Box>
        </Box>
        <Box
          sx={{
            width: "auto",
            height: "2rem",
            position: "absolute",
            top: "6.3rem",
            left: "55rem",
          }}
        >
          <h3
            style={{
              color: "whitesmoke",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "300",
            }}
          >
            back to{" "}
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "whitesmoke",
                textShadow: "5px 5px 15px rgba(245, 245, 245, 0.89)",
              }}
            >
              home page
            </Link>
          </h3>
        </Box>
      </Box>
    </>
  );
}

export default Signup;
