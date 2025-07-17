// app/home/components/ReviewsSection.jsx
"use client"

import { useState } from "react"
import { reviews } from "../../utils/dummyData" // Corrected import path for reviews
import { renderIcon } from "../utils"

export default function ReviewsSection() {
  const [reviewsCurrentSlide, setReviewsCurrentSlide] = useState(0)

  const nextReviewsSlide = () => {
    // Assuming 2 review cards are visible at a time, based on the `reviews.length - 2` logic
    const numVisibleReviews = 2; // Adjust this if your layout shows a different number of cards
    if (reviewsCurrentSlide < reviews.length - numVisibleReviews) {
      setReviewsCurrentSlide(reviewsCurrentSlide + 1)
    }
  }

  const prevReviewsSlide = () => {
    if (reviewsCurrentSlide > 0) {
      setReviewsCurrentSlide(reviewsCurrentSlide - 1)
    }
  }

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <div className="reviews-title-container">
            {renderIcon("star", 24, "currentColor")}
            <h2 className="reviews-title" style={{marginBottom:"0"}}>Popular Reviews</h2>
          </div>
        </div>

        <div className="reviews-slider-container">
          <div className="reviews-wrapper">
            {/* Ensure 280px matches the width of a review-card + its margin/gap */}
            <div className="reviews-slider" style={{ transform: `translateX(-${reviewsCurrentSlide * 280}px)` }}>
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    {/* Use the image directly if it's a require, otherwise provide a fallback */}
                    <img src={review.image || "/placeholder.svg"} alt={review.name} className="reviewer-image" />
                    <div className="reviewer-info">
                      <div className="reviewer-name-container">
                        <h4 className="reviewer-name">{review.name}</h4>
                        {review.verified && (
                          <div className="verified-badge">
                            {renderIcon("verified", 12, "currentColor")}
                            <span>Verified Buyer</span>
                          </div>
                        )}
                      </div>
                      <p className="review-date">{review.date}</p>
                    </div>
                  </div>

                  <div className="review-rating">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>{renderIcon("star", 16, index < review.rating ? "currentColor" : "none")}</span>
                    ))}
                  </div>

                  <p className="review-text">{review.review}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="nav-button prev reviews-prev"
            onClick={prevReviewsSlide}
            disabled={reviewsCurrentSlide === 0}
          >
            {renderIcon("chevron-left", 20)}
          </button>

          <button
            className="nav-button next reviews-next"
            onClick={nextReviewsSlide}
            disabled={reviewsCurrentSlide >= reviews.length - 2} // Assuming 2 reviews visible
          >
            {renderIcon("chevron-right", 20)}
          </button>
        </div>
      </div>
    </section>
  )
}