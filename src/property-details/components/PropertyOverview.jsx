// app/property-details/components/PropertyOverview.jsx
"use client"

import { useState, useEffect } from "react"
// No need to import renderIcon if you're not using it
// import { renderIcon } from "../utils"

export default function PropertyOverview({ property }) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  // Debugging logs (you can remove these once it's working as expected)
  useEffect(() => {
    console.log("PropertyOverview: property prop received:", property);
    if (property && property.included) {
      console.log("PropertyOverview: property.included:", property.included);
      console.log("PropertyOverview: is property.included an array?", Array.isArray(property.included));
      if (Array.isArray(property.included)) {
        property.included.forEach((item, index) => {
          console.log(`PropertyOverview: included item ${index}:`, item);
          console.log(`PropertyOverview: item.text: ${item.text}`); // Only logging text now
        });
      }
    } else {
      console.log("PropertyOverview: property or property.included is missing/null/undefined.");
    }
  }, [property]);

  const includedAmenities = Array.isArray(property.included) ? property.included : [];

  const displayedAmenities = showAllAmenities
    ? includedAmenities
    : includedAmenities.slice(0, 6);

  return (
    <div className="card property-overview">
      <div className="property-summary">
        <h1>{property.title}</h1>
        <p>
          {property.type} · {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
        </p>
      </div>

      <div className="amenities-section mt-6">
        <h3>What's included</h3>
        {displayedAmenities.length > 0 ? (
          <div className="amenities-grid">
            {displayedAmenities.map((item, index) => (
              <div key={index} className="amenity-item">
                {/* Removed item.icon && renderIcon(item.icon) */}
                {item.text && <span>{item.text}</span>}
              </div>
            ))}
          </div>
        ) : (
          <p>No included amenities listed for this property.</p>
        )}

        {includedAmenities.length > 6 && (
          <button onClick={() => setShowAllAmenities(!showAllAmenities)} className="show-more-btn">
            {showAllAmenities ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  )
}