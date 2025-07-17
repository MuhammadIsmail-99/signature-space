"use client"

import { Routes, Route } from "react-router-dom"
import HomePage from "./home/page.jsx"
import PropertyManagementPage from "./property-management/page.jsx"
import SigninForm from "./register/signin.jsx"
import SignupForm from "./register/signup.jsx"
import AreasOfOurHomesPage from "./areas-of-our-homes/page.jsx"
import PropertyDetailsPage from "./property-details/page.jsx"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/areas-of-our-homes" element={<AreasOfOurHomesPage />} />
        <Route path="/listing" element={<AreasOfOurHomesPage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/property-details" element={<PropertyDetailsPage />} />
        <Route path="/property-management" element={<PropertyManagementPage />} />
        <Route path="/property-management" element={require('./property-management/page.jsx').default} />
      </Routes>
    </div>
  )
}

export default App
