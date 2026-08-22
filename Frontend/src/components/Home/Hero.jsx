import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import HeroImage from "../../public/hero-image.jpg";
import "./Hero.css";

import { useNavigate } from "react-router-dom";
import SplitText from "../Animation/SplitText";
import StaggeredMenu from "../Animation/StaggeredMenu";

function Hero() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutDialogOpen(false);
    navigate("/login");
  };

  const menuItems = token
    ? [
        {
          label: "Home",
          ariaLabel: "Go to home page",
          link: "/",
        },
        {
          label: "Explore",
          ariaLabel: "Explore repositories",
          link: "/explore",
        },
        {
          label: "Dashboard",
          ariaLabel: "Open dashboard",
          link: "/dashboard",
        },
        {
          label: "Logout",
          ariaLabel: "Logout from Code Chronicle",
          link: "#",
          onClick: () => {
            setLogoutDialogOpen(true);
          },
        },
        {
          label: "Document",
          ariaLabel: "Open Documentation",
          link: "/documentation",
        },
      ]
    : [
        {
          label: "Home",
          ariaLabel: "Go to home page",
          link: "/",
        },
        {
          label: "Login",
          ariaLabel: "Login to Code Chronicle",
          link: "/login",
        },
        {
          label: "Register",
          ariaLabel: "Create a Code Chronicle account",
          link: "/signup",
        },
      ];

  const socialItems = [
    {
      label: "GitHub",
      link: "https://github.com",
    },
    {
      label: "LinkedIn",
      link: "https://linkedin.com",
    },
  ];

  return (
    <Box className="hero">
      <img src={HeroImage} alt="Code Chronicle" className="hero-image" />

      <Box className="hero-overlay" />

      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        changeMenuColorOnOpen
        colors={["#3C3D37", "#697565"]}
        logoUrl=""
        accentColor="#697565"
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
      />

      <Box className="hero-content">
        <Typography component="h1" className="hero-title">
          <SplitText
            text="Capture every milestone of your project"
            className="hero-split-text"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{
              opacity: 0,
              y: 40,
            }}
            to={{
              opacity: 1,
              y: 0,
            }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            showCallback
          />
        </Typography>
      </Box>

      <Box className="hero-brand">
        <Typography className="hero-brand-title">Code Chronicle</Typography>

        <Typography className="hero-brand-subtitle">
          Track • Commit • Chronicle
        </Typography>
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Logout?</DialogTitle>

        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Hero;
