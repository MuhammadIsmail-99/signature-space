"use client"

import { useState } from "react"
import Home from "./home/home.jsx"
import SigninForm from "./register/signin.jsx"
import SignupForm from "./register/signup.jsx" // Import the SignupForm

function App() {
  const [currentPage, setCurrentPage] = useState("home") // 'home', 'signin', or 'signup'

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="App">
      {currentPage === "home" ? (
        <Home onNavigate={handleNavigation} />
      ) : currentPage === "signin" ? (
        <SigninForm onNavigate={handleNavigation} />
      ) : (
        <SignupForm onNavigate={handleNavigation} /> // Render SignupForm when currentPage is 'signup'
      )}
    </div>
  )
}

export default App
