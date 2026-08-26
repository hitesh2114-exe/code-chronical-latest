import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import LiquidEther from "../Animation/LiquidEther";
import "./Footer.css";

function Footer() {
  return (
    <Box className="footer-section">
      <div className="footer-background">
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

      <div className="footer-overlay"></div>

      <div className="footer-content">
        <div className="footer-brand">
          <h2>code chronicle</h2>

          <p>
            A lightweight version control system built around the terminal.
          </p>
        </div>

        <div className="footer-navigation">
          <Link to="/">Home</Link>
          <Link to="/documentation">Documentation</Link>
          <a
            href="https://github.com/hitesh2114-exe"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Code Chronicle</span>

          <span className="footer-status">
            <span className="status-dot"></span>
            Built for developers
          </span>
        </div>
      </div>
    </Box>
  );
}

export default Footer;