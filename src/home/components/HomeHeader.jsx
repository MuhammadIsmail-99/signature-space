// app/home/components/HomeHeader.jsx
"use client"

import { useNavigate } from "react-router-dom"
import { renderIcon } from "../utils"
import logo from "../../assets/logo.png"

import React, { useState } from "react";

export default function HomeHeader({ onSelectRentalTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProfileClick = () => {
    // Assuming 'signin' is a route you want to navigate to
    window.location.href = "/signin";
  };

  const handleRentalTabClick = (tab) => {
    if (onSelectRentalTab) {
      onSelectRentalTab(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <a href="/" className="logo">
          <div className="logo-icon">
            <img src={logo} alt="Logo" />
          </div>
        </a>

        <ul className="nav-links">
          <li>
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <button
              className="nav-link button-link"
              onClick={() => handleRentalTabClick("monthly")}
            >
              Monthly Properties
            </button>
          </li>
          <li>
            <button
              className="nav-link button-link"
              onClick={() => handleRentalTabClick("daily")}
            >
              Daily Properties
            </button>
          </li>
          <li>
            <a href="/property-management" className="nav-link">
              List Property (Owner)
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Blog
            </a>
          </li>
        </ul>

        <div className="nav-right">
          <div
            className="profile-icon"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            {renderIcon("profile", 20)}
          </div>

          <div className="hamburger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <a href="#" className="logo">
            <div className="logo-icon">
              <img src={logo} alt="Logo" />
            </div>
          </a>
          <button className="close-mobile-menu" onClick={toggleMobileMenu}>
            {renderIcon("close", 24)}
          </button>
        </div>
        <ul>
          <li>
            <a href="/" className="nav-link" onClick={toggleMobileMenu}>
              Home
            </a>
          </li>
          <li>
            <button
              className="nav-link button-link"
              onClick={() => {
                handleRentalTabClick("monthly");
                toggleMobileMenu();
              }}
            >
              Monthly Properties
            </button>
          </li>
          <li>
            <button
              className="nav-link button-link"
              onClick={() => {
                handleRentalTabClick("daily");
                toggleMobileMenu();
              }}
            >
              Daily Properties
            </button>
          </li>
          <li>
            <a href="#" className="nav-link" onClick={toggleMobileMenu}>
              List Property (Owner)
            </a>
          </li>
          <li>
            <a href="#" className="nav-link" onClick={toggleMobileMenu}>
              Blog
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                handleProfileClick();
                toggleMobileMenu();
              }}
              className="nav-link mobile-login-link"
            >
              Log in
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
