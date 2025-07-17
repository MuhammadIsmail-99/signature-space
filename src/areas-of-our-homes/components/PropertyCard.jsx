"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PropertyCard({ property, isFavorite, onToggleFavorite, onShare }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleViewDeal = () => {
    navigate("/property-details", { state: { property } })
  }

  const handleExpand = () => {
    alert("Opening full gallery view")
  }

  return (
    <div className="property-card-horizontal">
      {/* Image Section */}
      <div className="property-image-section">
        <img
          src={property.images[currentImageIndex] || "/placeholder.svg?height=300&width=400"}
          alt="Property view"
          className="main-property-image"
        />

        {/* Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <button className="image-nav-btn prev-btn" onClick={prevImage}>
              ‹
            </button>
            <button className="image-nav-btn next-btn" onClick={nextImage}>
              ›
            </button>
          </>
        )}

        {/* Expand Button */}
        <button className="expand-btn-horizontal" onClick={handleExpand}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 2L6 6M2 2V6M2 2H6M14 14L10 10M14 14V10M14 14H10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Image Dots */}
        {property.images.length > 1 && (
          <div className="image-dots-horizontal">
            {property.images.map((_, index) => (
              <span
                key={index}
                className={`dot-horizontal ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="property-content-section">
        {/* Header with Actions */}
        <div className="property-header-horizontal">
          <div className="property-actions-horizontal">
            <button className="action-btn-horizontal share-btn" onClick={onShare}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L8 11M8 1L4 5M8 1L12 5M3 11V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`action-btn-horizontal favorite-btn ${isFavorite ? "favorited" : ""}`}
              onClick={onToggleFavorite}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill={isFavorite ? "currentColor" : "none"}>
                <path
                  d="M8 14L7.05 13.15C3.4 9.86 1 7.74 1 5.25C1 3.42 2.42 2 4.25 2C5.27 2 6.27 2.49 7 3.24C7.73 2.49 8.73 2 9.75 2C11.58 2 13 3.42 13 5.25C13 7.74 10.6 9.86 6.95 13.15L8 14Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Property Info */}
        <div className="property-info-horizontal">
          <h3 className="property-title-horizontal">{property.title}</h3>
          <h2 className="property-name-horizontal">{property.name}</h2>
          <p className="property-location-horizontal">{property.location}</p>
        </div>

        {/* Amenities */}
        <div className="amenities-horizontal">
          {property.amenities.join(", ").length < 35 ? (
            <span className="amenity-icon-horizontal">{'{...}'}</span>
          ) : (
            property.amenities.map((amenity, index) => (
              <span key={index} className="amenity-icon-horizontal">
                {amenity}
                {index < property.amenities.length - 1 ? ',' : ''}
              </span>
            ))
          )}
        </div>

        {/* Rating */}
        {property.rating && (
          <div className="rating-horizontal">
            <span className="star">⭐</span>
            <span className="rating-score">{property.rating}</span>
            <span className="rating-count">({property.reviewCount} reviews)</span>
          </div>
        )}

        {/* Pricing and CTA */}
        <div className="pricing-section-horizontal">
          <div className="price-info-horizontal">
            <span className="price-from-horizontal">from</span>
            <span className="price-horizontal">US${property.price}</span>
            <span className="price-period-horizontal">per night, incl. fees</span>
          </div>
        </div>

        <button className="view-deal-btn-horizontal" onClick={handleViewDeal}>
          View deal
        </button>
      </div>
    </div>
  )
}
