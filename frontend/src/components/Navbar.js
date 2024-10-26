// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import user icon from react-icons
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // To track authentication state
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsAuthenticated(false); // Set to false after logout
    navigate("/login");
  };

  // Refresh handler to check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Set authentication to true if token exists
    } else {
      setIsAuthenticated(false); // No token means user is not authenticated
    }
  }, []); // Empty dependency array ensures this runs on initial render and refresh

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            RAIL MADAD <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/complaintform" className="nav-links" onClick={closeMobileMenu}>
                Complaint
              </Link>
            </li>

            {/* Conditionally render based on authentication status */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/result" className="nav-links" onClick={closeMobileMenu}>
                  Result
                </Link>
              </li>
            )}

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-links" onClick={closeMobileMenu}>
                    Sign-Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    to="#" // Use "#" to maintain link behavior
                    className="nav-links" 
                    onClick={() => { 
                      handleLogout(); 
                      closeMobileMenu(); 
                    }}
                  >
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <FaUser className="profile-icon" />
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
