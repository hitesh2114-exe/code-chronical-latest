import React from "react";
import Box from "@mui/material/Box";
import SpecularButton from "../Animation/SpecularButton";
import LiquidEther from "../Animation/LiquidEther";
import { useNavigate } from "react-router-dom";
import "./AnimationOne.css";

function AnimationOne() {
  const navigate = useNavigate();

  return (
    <Box className="animation-one">
      <div className="animation-one-background">
        <LiquidEther
          colors={["#697565", "#C5D2C0", "#8F9D8A"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#697565"
          color1="#C5D2C0"
          color2="#8F9D8A"
        />
      </div>

      <div className="animation-one-overlay"></div>

      <div className="animation-one-content">
        <h2>.chron</h2>

        <SpecularButton
          size="lg"
          radius={18}
          tint="#ffffff"
          tintOpacity={0}
          blur={0}
          textColor="#f5f5f5"
          lineColor="#ffffff"
          baseColor="#525252"
          intensity={1}
          shineSize={10}
          shineFade={40}
          thickness={1}
          speed={0.35}
          followMouse
          proximity={250}
          autoAnimate={false}
          onClick={() => navigate("/dashboard")}
        >
          continue to dashboard...
        </SpecularButton>
      </div>
    </Box>
  );
}

export default AnimationOne;