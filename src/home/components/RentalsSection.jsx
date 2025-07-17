 // app/home/components/RentalsSection.jsx
"use client";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProperties } from "../../utils/dummyData"; // Adjust path if necessary
import { renderIcon } from "../utils"; // Assuming renderIcon is correctly imported

const PROPERTIES_PER_LOAD = 8; // Define how many properties to show per load

export default function RentalsSection({ activeRentalTab, setActiveRentalTab }) {
  const [rentalImageIndexes, setRentalImageIndexes] = useState({});
  const [visiblePropertyCount, setVisiblePropertyCount] = useState(PROPERTIES_PER_LOAD);
  const navigate = useNavigate();

  const currentRentals = useMemo(() => {
    return dummyProperties.filter(
      (property) => property.type === activeRentalTab
    );
  }, [activeRentalTab]);

  const handleImageNavigation = (rentalId, direction) => {
    const currentIndex = rentalImageIndexes[rentalId] || 0;
    const rental = dummyProperties.find((r) => r.id === rentalId);

    if (!rental || !rental.images || rental.images.length === 0) {
      console.warn(`Rental with ID ${rentalId} or its images not found.`);
      return;
    }

    const maxIndex = rental.images.length - 1;

    let newIndex;
    if (direction === "next") {
      newIndex = currentIndex < maxIndex ? currentIndex + 1 : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    setRentalImageIndexes((prev) => ({
      ...prev,
      [rentalId]: newIndex,
    }));
  };

  const formatPrice = (price, type) => {
    if (type === "monthly") {
      return `From $${price}/month`;
    }
    return `From $${price}`;
  };

  const handleShowMore = () => {
    setVisiblePropertyCount((prevCount) => prevCount + PROPERTIES_PER_LOAD);
  };

  const displayedRentals = currentRentals.slice(0, visiblePropertyCount);
  const hasMoreProperties = visiblePropertyCount < currentRentals.length;

  return (
    <section className="rentals-section">
      <div className="rentals-container">
        <h2 className="rentals-title">Our top vacation rentals</h2>

        <div className="rental-tabs">
          <button
            className={`rental-tab ${activeRentalTab === "daily" ? "active" : ""}`}
            onClick={() => {
              setActiveRentalTab("daily");
              setVisiblePropertyCount(PROPERTIES_PER_LOAD);
            }}
          >
            Daily Rentals
          </button>
          <button
            className={`rental-tab ${activeRentalTab === "monthly" ? "active" : ""}`}
            onClick={() => {
              setActiveRentalTab("monthly");
              setVisiblePropertyCount(PROPERTIES_PER_LOAD);
            }}
          >
            Monthly Rentals
          </button>
        </div>

        <div className="rentals-grid">
          {displayedRentals.length > 0 ? (
            displayedRentals.map((rental) => {
              const currentImageIndex = rentalImageIndexes[rental.id] || 0;
              return (
                <div key={rental.id} className="rental-card">
                  <div className="rental-image-container">
                    <div
                      className="rental-images"
                      style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                      {rental.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt="Rental property"
                          className="rental-image"
                        />
                      ))}
                    </div>

                    {rental.images.length > 1 && currentImageIndex > 0 && (
                      <button
                        className="image-nav-btn prev"
                        onClick={() => handleImageNavigation(rental.id, "prev")}
                      >
                        {renderIcon("chevron-left", 16)}
                      </button>
                    )}

                    {rental.images.length > 1 && currentImageIndex < rental.images.length - 1 && (
                      <button
                        className="image-nav-btn next"
                        onClick={() => handleImageNavigation(rental.id, "next")}
                      >
                        {renderIcon("chevron-right", 16)}
                      </button>
                    )}

                    {rental.images.length > 1 && (
                      <div className="image-dots">
                        {rental.images.map((_, index) => (
                          <div
                            key={index}
                            className={`image-dot ${index === currentImageIndex ? "active" : ""}`}
                            onClick={() =>
                              setRentalImageIndexes((prev) => ({ ...prev, [rental.id]: index }))
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rental-info">
                    <div className="rental-price">{formatPrice(rental.price, rental.type)}</div>
                    <div className="rental-details">{rental.details}</div>
                    <div className="rental-location">
                      {renderIcon("location", 16)}
                      {rental.location}
                    </div>
                    <div className="rental-footer">
                      <div className="rating">
                        {renderIcon("star", 16, "currentColor")}
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
              );
            })
          ) : (
            <div className="no-rentals-message">No rentals available for this category yet.</div>
          )}
        </div>
        {hasMoreProperties && (
          <button
            className="show-more-btn" // Keep the class for potential future external CSS
            onClick={handleShowMore}
            // --- INLINE CSS APPLIED HERE ---
            style={{
              background: 'none',
              border: '2px solid',
              borderRadius: '50px',
              color: '#cba135',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '1rem',
              fontSize: '0.95rem',
              padding: '15px',
              width: '100%',
            }}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}
