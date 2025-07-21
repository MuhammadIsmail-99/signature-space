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
  const [favoriteRentals, setFavoriteRentals] = useState({})
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

  const toggleFavorite = (rentalId) => {
    setFavoriteRentals((prev) => ({
      ...prev,
      [rentalId]: !prev[rentalId],
    }))
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
              setActiveRentalTab("daily")
              setVisiblePropertyCount(PROPERTIES_PER_LOAD)
            }}
          >
            Daily Rentals
          </button>
          <button
            className={`rental-tab ${activeRentalTab === "monthly" ? "active" : ""}`}
            onClick={() => {
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
                  <div className="rental-image-container" style={{ position: "relative" }}>
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
                    <button
                      className={`action-btn favorite-btn ${favoriteRentals[rental.id] ? "favorited" : ""}`}
                      onClick={() => toggleFavorite(rental.id)}
                      aria-label={favoriteRentals[rental.id] ? "Remove from favorites" : "Add to favorites"}
                      style={{ position: "absolute", top: "8px", right: "8px", zIndex: 10 }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill={favoriteRentals[rental.id] ? "currentColor" : "none"}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 14L7.05 13.15C3.4 9.86 1 7.74 1 5.25C1 3.42 2.42 2 4.25 2C5.27 2 6.27 2.49 7 3.24C7.73 2.49 8.73 2 9.75 2C11.58 2 13 3.42 13 5.25C13 7.74 10.6 9.86 6.95 13.15L8 14Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
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
