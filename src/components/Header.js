import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./css/Header.module.css";
import "./css/darkMode.css";
import logo from "./img/image1.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    console.log("Toggling menu");
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
    <>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.headerLogo} />
      </div>
      <nav className={mobileMenuOpen ? `${styles.nav} ${styles.open}` : styles.nav}> 
        <div className={styles.hamburger} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.menuItems}>
          <NavLink exact to="/" activeClassName={styles.active}>
            Home
          </NavLink>
          {/* <NavLink to="/portfolio" activeClassName={styles.active}>
            Portfolio
          </NavLink> */}
          <NavLink to="/services" activeClassName={styles.active}>
            Services
          </NavLink>
          {/* <NavLink to="/blog" activeClassName={styles.active}>
            Blog
          </NavLink> */}
          <NavLink to="/estimate" activeClassName={styles.active}>
            Estimate
          </NavLink>
          <NavLink to="/contact" activeClassName={styles.active}>
            Contact
          </NavLink>
          {user ? (
            <>
              <NavLink to="/messages" activeClassName={styles.active}>
                Messages
              </NavLink>
              <NavLink to="/logout" activeClassName={styles.active}>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" activeClassName={styles.active}>Admin Portal</NavLink>
          )}
          <button onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
        </div>
      </nav>
    </>
  );  
};

export default Header;
