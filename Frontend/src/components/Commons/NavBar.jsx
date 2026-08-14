import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/dashboard")}>
        <h2>
          Code <span>Chronicle</span>
        </h2>
      </div>

      <div className="nav-actions">
        <button className="nav-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
