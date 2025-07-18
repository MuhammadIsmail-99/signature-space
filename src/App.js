"use client"

import { Routes, Route } from "react-router-dom"
import HomePage from "./home/page.jsx"
import PropertyManagementPage from "./property-management/page.jsx"
import AreasOfOurHomesPage from "./areas-of-our-homes/page.jsx"
import PropertyDetailsPage from "./property-details/page.jsx"
import RequestToBookPage from "./request-to-book/page.jsx"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/areas-of-our-homes" element={<AreasOfOurHomesPage />} />
        <Route path="/listing" element={<AreasOfOurHomesPage />} />
        <Route path="/property-details" element={<PropertyDetailsPage />} />
        <Route path="/property-management" element={<PropertyManagementPage />} />
        <Route path="/request-to-book" element={<RequestToBookPage />} />
      </Routes>
    </div>
  )
}

export default App
