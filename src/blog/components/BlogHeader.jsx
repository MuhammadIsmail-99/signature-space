"use client"

import { useState } from "react"
import { renderIcon } from "@/utils/renderIcon"

export default function BlogHeader({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <header className="blog-hero">
      <div className="blog-hero-content">
        <h1>Our Real Estate Insights</h1>
        <p>Stay informed with the latest trends, expert advice, and local market updates from Signature Space.</p>
        <form onSubmit={handleSearch} className="blog-search-bar">
          <input
            type="text"
            placeholder="Search for articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            {renderIcon("Search", { className: "icon" })}
            Search
          </button>
        </form>
      </div>
    </header>
  )
}
