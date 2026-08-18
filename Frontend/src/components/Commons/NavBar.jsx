import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

function NavBar() {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <h2>
            Code <span>Chronicle</span>
          </h2>
        </div>

        <div className="nav-actions">
          <button className="nav-btn back-btn" onClick={() => navigate(-1)}>
            ← back
          </button>

          {isLoggedIn ? (
            <button
              className="nav-btn logout-btn"
              onClick={() => setLogoutDialogOpen(true)}
            >
              logout
            </button>
          ) : (
            <button
              className="nav-btn login-btn"
              onClick={() => navigate("/login")}
            >
              login
            </button>
          )}

          <button
            className="nav-btn search-btn"
            onClick={() => navigate("/explore")}
          >
            search
          </button>

          <button
            className="nav-btn search-btn"
            onClick={() => navigate("/dashboard")}
          >
            dashboard
          </button>
        </div>
      </nav>

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

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              setLogoutDialogOpen(false);
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NavBar;
