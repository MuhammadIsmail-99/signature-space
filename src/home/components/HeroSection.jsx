// app/home/components/HeroSection.jsx
"use client"

import SearchBar from "../../Searchbar/search-bar"
import headerImg from "../../assets/header-image.jpg"

export default function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${headerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content">
        <SearchBar />
      </div>
    </section>
  )
}
