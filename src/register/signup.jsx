"use client"

import { useState, useEffect } from "react"
import "./signup.css"

const SignupForm = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState({})

  // Load existing user data if available
  useEffect(() => {
    const savedUserData = localStorage.getItem("userSignupData")
    if (savedUserData) {
      const userData = JSON.parse(savedUserData)
      setFormData((prev) => ({
        ...prev,
        fullName: userData.fullName || "",
        username: userData.username || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
      }))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.username.trim()) newErrors.username = "Username is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    // Password strength validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    // Save user data to localStorage
    localStorage.setItem("userSignupData", JSON.stringify(formData))
    localStorage.setItem(
      "userAuthData",
      JSON.stringify({
        email: formData.email,
        username: formData.username,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        isRegistered: true,
      }),
    )

    console.log("User registered:", formData)
    alert("Account created successfully!")
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`)
    // Simulate social login
    localStorage.setItem(
      "userAuthData",
      JSON.stringify({
        provider: provider,
        isRegistered: true,
        loginMethod: "social",
      }),
    )
    alert(`Signed up with ${provider}`)
  }

  const handleWhatsAppSignup = () => {
    if (!formData.phoneNumber.trim()) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Phone number is required for WhatsApp signup",
      }))
      return
    }

    console.log("WhatsApp signup with:", formData.phoneNumber)
    localStorage.setItem(
      "userAuthData",
      JSON.stringify({
        phoneNumber: formData.phoneNumber,
        isRegistered: true,
        loginMethod: "whatsapp",
      }),
    )
    alert("WhatsApp verification sent!")
  }

  return (
    <div className="auth-container">
      <div className="background-image"></div>
      <div className="form-overlay">
        <div className="auth-card">
          <h1 className="form-title">Create Your Account</h1>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`form-input ${errors.fullName ? "error" : ""}`}
                required
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-input ${errors.username ? "error" : ""}`}
                required
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? "error" : ""}`}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number (for WhatsApp)"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.phoneNumber ? "error" : ""}`}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? "error" : ""}`}
                required
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                required
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="auth-button primary">
              Sign Up
            </button>
          </form>

            <span className="divider">or sign up with</span>

          <div className="social-buttons">
            <button className="social-button whatsapp" onClick={handleWhatsAppSignup}>
              <span className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="#25D366">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </span>
              WhatsApp
            </button>

            <button className="social-button google" onClick={() => handleSocialLogin("Google")}>
              <span className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="#EA4335">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                </svg>
              </span>
              Email
            </button>

            <button className="social-button facebook" onClick={() => handleSocialLogin("Facebook")}>
              <span className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="#1877F3">
                  <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
                </svg>
              </span>
              Facebook
            </button>

            <button className="social-button apple" onClick={() => handleSocialLogin("Apple")}>
              <span className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20" fill="#fff">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
              </span>
              Apple
            </button>
          </div>

          <div className="auth-link">
            Already have an account?
            <button onClick={() => onNavigate("signin")} className="link-button">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
