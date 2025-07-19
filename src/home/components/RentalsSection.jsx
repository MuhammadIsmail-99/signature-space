// app/home/components/RentalsSection.jsx
"use client"

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProperties } from "../../utils/dummyData"
import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/useScrollAnimation"
import "../styles/RentalsSection.css"
import "../styles/animations.css"
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react"

const PROPERTIES_PER_LOAD = 8

export default function RentalsSection({ activeRentalTab, setActiveRentalTab }) {
  const [rentalImageIndexes, setRentalImageIndexes] = useState({})
  const [visiblePropertyCount, setVisiblePropertyCount] = useState(PROPERTIES_PER_LOAD)
  const navigate = useNavigate()

  // Animation hooks
  const [titleRef, titleVisible] = useScrollAnimation({ delay: 0 })
  const [tabsRef, tabsVisible] = useScrollAnimation({ delay: 200 })
  const [gridRef, gridVisible, getItemDelay] = useStaggeredAnimation(PROPERTIES_PER_LOAD, {
    staggerDelay: 100,
    threshold: 0.1,
  })
  const [buttonRef, buttonVisible] = useScrollAnimation({ delay: 300 })

  const currentRentals = useMemo(() => {
    return dummyProperties.filter((property) => property.type === activeRentalTab)
  }, [activeRentalTab])

  const handleImageNavigation = (rentalId, direction) => {
    setRentalImageIndexes((prev) => {
      const currentIndex = prev[rentalId] || 0
      const rental = dummyProperties.find((r) => r.id === rentalId)

      if (!rental || !rental.images || rental.images.length === 0) {
        console.warn(`Rental with ID ${rentalId} or its images not found.`)
        return prev
      }

      const maxIndex = rental.images.length - 1

      let newIndex
      if (direction === "next") {
        newIndex = currentIndex < maxIndex ? currentIndex + 1 : currentIndex
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
      }

      return {
        ...prev,
        [rentalId]: newIndex,
      }
    })
  }

  const formatPrice = (price, type) => {
    if (type === "monthly") {
      return `From $${price}/month`
    }
    return `From $${price}`
  }

  const handleShowMore = () => {
    setVisiblePropertyCount((prevCount) => prevCount + PROPERTIES_PER_LOAD)
  }

  const displayedRentals = currentRentals.slice(0, visiblePropertyCount)
  const hasMoreProperties = visiblePropertyCount < currentRentals.length

  return (
    <section className="rentals-section">
      <div className="rentals-container">
        <h2 ref={titleRef} className={`rentals-title animate-title ${titleVisible ? "visible" : ""}`}>
          Our top vacation rentals
        </h2>

        <div ref={tabsRef} className={`rental-tabs animate-tabs ${tabsVisible ? "visible" : ""}`}>
          <button
            className={`rental-tab ${activeRentalTab === "daily" ? "active" : ""}`}
            onClick={() => {
              // setActiveRentalTab("daily") will update the state
              setActiveRentalTab("daily")
              setVisiblePropertyCount(PROPERTIES_PER_LOAD)
            }}
          >
            Daily Rentals
          </button>
          <button
            className={`rental-tab ${activeRentalTab === "monthly" ? "active" : ""}`}
            onClick={() => {
              // setActiveRentalTab("monthly") will update the state
              setActiveRentalTab("monthly")
              setVisiblePropertyCount(PROPERTIES_PER_LOAD)
            }}
          >
            Monthly Rentals
          </button>
        </div>

        <div ref={gridRef} className="rentals-grid">
          {displayedRentals.length > 0 ? (
            displayedRentals.map((rental, index) => {
              const currentImageIndex = rentalImageIndexes[rental.id] || 0
              return (
                <div
                  key={rental.id}
                  className={`rental-card animate-card ${gridVisible ? "visible" : ""}`}
                  style={{
                    transitionDelay: `${getItemDelay(index)}ms`,
                  }}
                >
                  <div className="rental-image-container">
                    <div className="rental-images" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                      {rental.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg?height=240&width=320&query=rental property"}
                          alt="Rental property"
                          className="rental-image"
                        />
                      ))}
                    </div>

                    {rental.images.length > 1 && currentImageIndex > 0 && (
                      <button className="image-nav-btn prev" onClick={() => handleImageNavigation(rental.id, "prev")}>
                        <ChevronLeft size={16} />
                      </button>
                    )}

                    {rental.images.length > 1 && currentImageIndex < rental.images.length - 1 && (
                      <button className="image-nav-btn next" onClick={() => handleImageNavigation(rental.id, "next")}>
                        <ChevronRight size={16} />
                      </button>
                    )}

                    {rental.images.length > 1 && (
                      <div className="image-dots">
                        {rental.images.map((_, index) => (
                          <div
                            key={index}
                            className={`image-dot ${index === currentImageIndex ? "active" : ""}`}
                            onClick={() => setRentalImageIndexes((prev) => ({ ...prev, [rental.id]: index }))}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rental-info">
                    <div className="rental-price">{formatPrice(rental.price, rental.type)}</div>
                    <div className="rental-details">{rental.details}</div>
                    <div className="rental-location">
                      <MapPin size={16} />
                      {rental.location}
                    </div>
                    <div className="rental-footer">
                      <div className="rating">
                        <Star size={16} color="currentColor" />
                        {rental.rating}
                      </div>
                      <button
                        className="view-deal-btn"
                        style={{ background: "#cba135" }}
                        onClick={() => navigate("/property-details", { state: { property: rental } })}
                      >
                        View deal
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-rentals-message">No rentals available for this category yet.</div>
          )}
        </div>

        {hasMoreProperties && (
          <button
            ref={buttonRef}
            className={`show-more-btn animate-button ${buttonVisible ? "visible" : ""}`}
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  )
}