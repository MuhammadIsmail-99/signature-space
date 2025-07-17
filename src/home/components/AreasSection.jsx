// app/home/components/AreasSection.jsx
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { areas } from "../../utils/dummyData" // Corrected import path
import { renderIcon } from "../utils"

export default function AreasSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const nextSlide = () => {
    // Assuming each card takes up 260px, and we want to see a full card move at a time
    // And assuming we show 3 cards at a time fully, with a fourth partially visible or as a buffer.
    // The previous logic `areas.length - 4` implied that 4 cards are visible at once.
    // Let's ensure we don't go past the end of the visible window.
    // If you have a specific number of cards visible, adjust the '4' accordingly.
    // For example, if 3 cards are visible, it would be areas.length - 3.
    // Given the `transform: translateX(-${currentSlide * 260}px)` and `areas.length - 4`
    // I'll assume 4 cards are intended to be visible.
    const numVisibleCards = 4; // Adjust this if your layout shows a different number of cards
    if (currentSlide < areas.length - numVisibleCards) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleViewProperties = (city) => {
    // Navigates to the listing page, pre-filtering by the selected city
    navigate(`/listing?city=${encodeURIComponent(city)}`)
  }

  return (
    <section className="areas-section">
      <h2 className="section-title">Areas of Our Homes</h2>
      <div className="areas-container">
        <div className="areas-wrapper">
          {/* Ensure 260px matches the width of an area-card + its margin/gap */}
          <div className="areas-slider" style={{ transform: `translateX(-${currentSlide * 260}px)` }}>
            {areas.map((area) => (
              <div key={area.id} className="area-card" onClick={() => handleViewProperties(area.title)}>
                {/* Use the image directly if it's a require, otherwise provide a fallback */}
                <img
                  src={area.image ? area.image : "/path/to/placeholder.png"} // Use a proper placeholder if area.image is missing
                  alt={area.title}
                  className="area-image"
                />
                <h3 className="area-title">{area.title}</h3>
                <button className="view-properties-btn">View properties</button>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Button */}
        <button className="nav-button prev" onClick={prevSlide} disabled={currentSlide === 0}>
          {renderIcon("chevron-left", 20)}
        </button>

        {/* Next Button */}
        <button className="nav-button next" onClick={nextSlide} disabled={currentSlide >= areas.length - 4}>
          {renderIcon("chevron-right", 20)}
        </button>
      </div>
    </section>
  )
}