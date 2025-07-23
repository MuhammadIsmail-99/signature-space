// app/listing/page.jsx (Moved from app/page.jsx)
"use client" // Keep this directive if you're using React 18 with Server Components (even if client-side rendering)

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom"
import ListingHeader from "./components/ListingHeader" // Renamed import
import PropertyCard from "./components/PropertyCard"
import MapSection from "./components/MapSection"
import "./globals.css"
import { dummyProperties } from '../utils/dummyData';
import Footer from "../home/components/Footer.jsx"

// Assuming dummyProperties is correctly structured as per our last conversation

export default function ListingPage() {
  const [favorites, setFavorites] = useState([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const cityFilterParam = searchParams.get("city")
  const checkInParam = searchParams.get("checkIn")
  const checkOutParam = searchParams.get("checkOut")
  const adultsParam = parseInt(searchParams.get("adults")) || 1
  const childrenParam = parseInt(searchParams.get("children")) || 0
  const infantsParam = parseInt(searchParams.get("infants")) || 0
  const petsParam = parseInt(searchParams.get("pets")) || 0

  const [appliedFilters, setAppliedFilters] = useState({
    petFriendly: false,
    pool: false,
    wifi: false,
    kitchen: false,
    airConditioning: false,
    tv: false,
    parking: false,
    washingMachine: false,
    balconyPatio: false, // Not directly supported by current dummyProperties
    microwave: false, // Not directly supported by current dummyProperties
    instantBooking: false, // Not directly supported by current dummyProperties
    bookWithHomeToGo: false,
    priceMin: 10,
    priceMax: 1500, // Adjusted max price to cover example data
    adults: adultsParam,
    children: childrenParam,
    infants: infantsParam,
    pets: petsParam, // Changed from petsAllowed to pets for clarity
    bedrooms: 0,
    bathrooms: 0,
    accommodationTypes: [], // "daily", "monthly"
    reviews: "Any", // e.g., "4+", "4.5+"
    checkIn: checkInParam ? new Date(checkInParam) : null,
    checkOut: checkOutParam ? new Date(checkOutParam) : null,
    city: cityFilterParam || "",
    // Removed distanceToWater, distanceToSkiing as they are not in dummyProperties
  })

  // Effect to sync URL search params with filter state on initial load
  useEffect(() => {
    setAppliedFilters((prev) => ({
      ...prev,
      city: cityFilterParam || "",
      checkIn: checkInParam ? new Date(checkInParam) : null,
      checkOut: checkOutParam ? new Date(checkOutParam) : null,
      adults: adultsParam,
      children: childrenParam,
      infants: infantsParam,
      pets: petsParam,
    }))
  }, [searchParams, cityFilterParam, checkInParam, checkOutParam, adultsParam, childrenParam, infantsParam, petsParam]);

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const handleShare = (propertyId) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this vacation rental",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters)
    // Update URL search params for city (and other filters if needed)
    const params = {};
    if (filters.city) {
      params.city = filters.city;
    }
    // Add other filters to params if you want them reflected in the URL
    navigate({
      search: createSearchParams(params).toString()
    });
  }

  const filterProperties = () => {
    return dummyProperties.filter((property) => {
      // 1. City Filter (from URL)
      if (
        appliedFilters.city &&
        property.location &&
        !property.location.trim().toLowerCase().includes(appliedFilters.city.trim().toLowerCase())
      ) {
        return false;
      }

      // 2. Price Range Filter
      if (property.price < appliedFilters.priceMin || property.price > appliedFilters.priceMax) {
        return false
      }

      // 3. Amenity filters (mapping filter names to amenity strings/emojis)
      const amenityStringMap = {
        petFriendly: "Pets",
        pool: "Pool",
        wifi: "WiFi",
        kitchen: "Kitchen",
        airConditioning: "Air Conditioning",
        tv: "TV",
        parking: "Parking",
        washingMachine: "Washing Machine",
        balconyPatio: "Balcony/Patio",
        microwave: "Microwave",
      }

      for (const filterKey in amenityStringMap) {
        if (appliedFilters[filterKey]) {
          const amenityValue = amenityStringMap[filterKey];
          const hasAmenity = (property.amenities && property.amenities.includes(amenityValue)) ||
                             (property.essentials && property.essentials.includes(amenityValue));
          if (filterKey === "petFriendly" && property.hostAccepts && property.hostAccepts.includes("Pets")) {
            // Covered
          } else if (!hasAmenity) {
            return false;
          }
        }
      }

      // 4. Instant Booking & Book with HomeToGo
      if (appliedFilters.instantBooking) {
        return false;
      }
      if (appliedFilters.bookWithHomeToGo && property.provider !== "HomeToGo") {
        return false
      }

      // 5. Guests filter
      const propertyGuestsCapacity = property.guests || 0;
      const requiredGuests = appliedFilters.adults + appliedFilters.children + appliedFilters.pets;
      if (requiredGuests > 0 && propertyGuestsCapacity < requiredGuests) {
        return false;
      }

      // 6. Bedrooms filter
      const propertyBedrooms = property.bedrooms || 0;
      if (appliedFilters.bedrooms > 0 && propertyBedrooms < appliedFilters.bedrooms) {
        return false;
      }

      // 7. Bathrooms filter
      const propertyBathrooms = property.bathrooms || 0;
      if (appliedFilters.bathrooms > 0 && propertyBathrooms < appliedFilters.bathrooms) {
        return false;
      }

      // 8. Accommodation Types filter
      if (appliedFilters.accommodationTypes.length > 0) {
        if (!property.type || !appliedFilters.accommodationTypes.includes(property.type)) {
          return false;
        }
      }

      // 9. Reviews filter
      if (appliedFilters.reviews !== "Any") {
        const minRating = Number.parseFloat(appliedFilters.reviews.replace("+", ""))
        if (property.rating < minRating) {
          return false
        }
      }

      // 10. Check-in and Check-out date filter (if applicable)
      if (appliedFilters.checkIn && appliedFilters.checkOut) {
        const checkInDate = new Date(appliedFilters.checkIn)
        const checkOutDate = new Date(appliedFilters.checkOut)
        if (
          property.availableFrom &&
          property.availableTo &&
          (new Date(property.availableFrom) > checkInDate || new Date(property.availableTo) < checkOutDate)
        ) {
          return false
        }
      }

      return true
    })
  }

  const filteredProperties = filterProperties()

  return (
    <>
    <div className="app-wrapper">
      <ListingHeader onApplyFilters={handleApplyFilters} initialFilters={appliedFilters} />
      <div className="main-content-wrapper static-map-layout">
        <div className="listings-scrollable">
          <div className="listings-section">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={() => toggleFavorite(property.id)}
                  onShare={() => handleShare(property.id)}
                />
              ))
            ) : (
              <div className="no-results-message">No properties found matching your filters.</div>
            )}
          </div>
        </div>
        <div className="map-static">
          <MapSection />
        </div>
      </div>
    </div>
        <Footer/>
        </>
  )
}