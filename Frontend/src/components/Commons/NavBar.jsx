import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import StaggeredMenu from "../Animation/StaggeredMenu";

function NavBar() {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setLogoutDialogOpen(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const menuItems = [
    {
      label: "Home",
      ariaLabel: "Go to home",
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
      label: "Document",
      ariaLabel: "Open documentation",
      link: "/documentation",
    },
    ...(isLoggedIn
      ? [
          {
            label: "Logout",
            ariaLabel: "Logout from Code Chronicle",
            link: "#",
            onClick: () => {
              setLogoutDialogOpen(true);
            },
          },
        ]
      : [
          {
            label: "Login",
            ariaLabel: "Login to Code Chronicle",
            link: "/login",
          },
        ]),
  ];

  const socialItems = [
    {
      label: "GitHub",
      link: "https://github.com",
    },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button
            className="nav-back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ←
          </button>

          <div
            className="logo"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate("/");
              }
            }}
          >
            <h2>
              Code <span>Chronicle</span>
            </h2>
          </div>
        </div>

        <div className="navbar-menu-trigger">
          <StaggeredMenu
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering
            menuButtonColor="#ffffff"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen
            colors={["#697565", "#3C3D37"]}
            accentColor="#697565"
            position="right"
            isFixed={true}
          />
        </div>
      </nav>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        PaperProps={{
          className: "logout-dialog",
        }}
      >
        <DialogTitle>Logout?</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to logout from Code Chronicle?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setLogoutDialogOpen(false)}
            className="dialog-cancel"
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleLogout}
            className="dialog-logout"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NavBar;
