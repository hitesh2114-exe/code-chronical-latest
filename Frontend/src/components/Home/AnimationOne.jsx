import React from "react";
import Box from "@mui/material/Box";
import StrokeText from "../Animation/StrokeText";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function AnimationOne() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            backgroundColor: "grey",
            position: "relative",
            top: "10rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            continue to dashboard
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AnimationOne;
