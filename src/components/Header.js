import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./css/Header.module.css";
import "./css/darkMode.css";
import logo from "./img/image1.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      if (!prevMode) {
        document.body.setAttribute("data-dark", "true");
      } else {
        document.body.removeAttribute("data-dark");
      }
      return !prevMode;
    });
  };

  /* const toggleMobileMenu = () => {
    console.log("Toggling menu");
    setMobileMenuOpen(!mobileMenuOpen);
  }; */

  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute("data-dark", "true");
    } else {
      document.body.removeAttribute("data-dark");
    }

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [darkMode]);

  return (
    <header className={`navbar navbar-expand-lg ${styles.customNav}`}>
      <div className={`container-fluid ${styles.customLogoContainer}`}>
        <img
          src={logo}
          alt="Logo"
          className={`navbar-brand ${styles.customHeaderLogo}`}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={toggleNavCollapse}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")`
            }}
          ></span>
        </button>
      </div>

      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNav"
      >
        <ul className={`navbar-nav ms-auto ${styles.customMenuItems}`}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              className="nav-link"
              activeClassName={styles.customActiveMenuItem}
              style={{ color: 'lightgray' }}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/services"
              className="nav-link"
              activeClassName={styles.customActiveMenuItem}
              style={{ color: 'lightgray' }}
            >
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/estimate"
              className="nav-link"
              activeClassName={styles.customActiveMenuItem}
              style={{ color: 'lightgray' }}
            >
              Estimate
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className="nav-link"
              activeClassName={styles.customActiveMenuItem}
              style={{ color: 'lightgray' }}
            >
              Contact
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="/messages"
                  className="nav-link"
                  activeClassName={styles.customActiveMenuItem}
                  style={{ color: 'lightgray' }}
                >
                  Messages
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/logout"
                  className="nav-link"
                  activeClassName={styles.customActiveMenuItem}
                  style={{ color: 'lightgray' }}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
                activeClassName={styles.customActiveMenuItem}
                style={{ color: 'lightgray' }}
              >
                Admin Portal
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <button onClick={toggleDarkMode} className="btn">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
