import React from "react";
import Box from "@mui/material/Box";
import HeroImage from "../../public/hero-image.jpg";
import Button from "@mui/material/Button";
import "./Hero.css";
import { Link } from "react-router-dom";
import SplitText from "../Animation/SplitText";

function Hero() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          position: "relative",
          // backgroundColor: "red",
        }}
      >
        <img
          src={HeroImage}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            filter: "brightness(60%)",
          }}
        />
        <h1
          style={{
            position: "absolute",
            color: "whitesmoke",
            top: "45%",
            left: "13%",
            fontSize: "4rem",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: "300",
          }}
        >
          <SplitText
            text="Capture every milestone of your project"
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
        <h2
          style={{
            position: "absolute",
            color: "whitesmoke",
            bottom: "5%",
            left: "44.5%",
            fontSize: "1.6rem",
            zIndex: "2",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: "300",
          }}
        >
          Code Chronicle
        </h2>
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
            width: "8rem",
            height: "2rem",
            // backgroundColor: "red",
            position: "absolute",
            top: "1.5rem",
            right: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              textShadow: "0px 4px 10px rgba(232, 229, 229, 0.85)",
            }}
          >
            <h3
              style={{
                color: "whitesmoke",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: "300",
              }}
            >
              login
            </h3>
          </Link>

          <Link
            to={"/signup"}
            style={{
              textDecoration: "none",
              textShadow: "0px 4px 10px rgba(232, 229, 229, 0.85)",
            }}
          >
            <h3
              style={{
                color: "whitesmoke",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: "300",
              }}
            >
              sign up
            </h3>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Hero;
