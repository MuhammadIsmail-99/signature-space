// app/home/components/PropertyDetailsPage.jsx
"use client"

import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import ImageGallery from "./components/ImageGallery"
import PropertyOverview from "./components/PropertyOverview"
import RoomsSection from "./components/RoomsSection"
import AboutStay from "./components/AboutStay"
import BookingWidget from "./components/BookingWidget"
import LocationSection from "./components/LocationSection"
import ReviewsSection from "./components/ReviewsSection"
import AgentCard from "./components/AgentCard"
import AvailabilitySection from "./components/AvailabilitySection"
import StillLookingCard from "./components/StillLookingCard"
import { dummyProperties } from "../utils/dummyData" 
import HomeHeader from "../home/components/HomeHeader"

import "../globals.css"
import "./styles/property-details.css"

export default function PropertyDetailsPage() {
  const yourStayRef = useRef(null);
  const locationRef = useRef(null);
  const reviewsRef = useRef(null);
  const availabilityRef = useRef(null);
  const cancellationRef = useRef(null);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleDatesChange = useCallback((inDate, outDate) => {
    setCheckInDate(inDate);
    setCheckOutDate(outDate);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Use dummyProperties[0] directly for property data
  // Ensure dummyProperties[0] exists before accessing it
  const propertyData = dummyProperties[0] || {}; // Fallback to empty object

  // Add a memoized variable for bookedDates to ensure it's stable
  // and only re-calculates if propertyData.bookedDates changes.
  const bookedDates = useMemo(() => {
    return propertyData.bookedDates || [];
  }, [propertyData.bookedDates]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [propertyData]);

  return (
    <div className="property-details-page">
      <HomeHeader />
      <div className="container">
        <ImageGallery images={propertyData.images} />

        <div className="page-tabs">
          <button className="tab-button" onClick={() => scrollToSection(yourStayRef)}>
            Your stay
          </button>
          <button className="tab-button" onClick={() => scrollToSection(locationRef)}>
            Location
          </button>
          <button className="tab-button" onClick={() => scrollToSection(reviewsRef)}>
            Reviews
          </button>
          <button className="tab-button" onClick={() => scrollToSection(availabilityRef)}>
            Availability
          </button>
          <button className="tab-button" onClick={() => scrollToSection(cancellationRef)}>
            Cancellation
          </button>
        </div>

        <div className="content-layout">
          <div className="main-content-area">
            <div id="your-stay-section" ref={yourStayRef} className="">
              <PropertyOverview property={propertyData} />
              <RoomsSection rooms={propertyData.rooms} additionalRooms={propertyData.additionalRooms} />
              <AboutStay description={propertyData.description} />
            </div>

            <div id="location-section" ref={locationRef} className="">
              <LocationSection location={propertyData.location} locationDetails={propertyData.locationDetails} />
            </div>

            <div id="reviews-section" ref={reviewsRef} className="">
              <ReviewsSection reviews={propertyData.reviews} />
            </div>

            <div id="availability-section" ref={availabilityRef} className="">
              <AvailabilitySection
                onDatesChange={handleDatesChange}
                bookedDates={bookedDates} // <-- PASS THE BOOKED DATES HERE
              />
            </div>

            <div id="cancellation-section" ref={cancellationRef} className="">
              <h2>Cancellation Policy</h2>
              <p>{propertyData.cancellationPolicy}</p> {/* Use actual policy from data */}
            </div>
          </div>
          <div className="sidebar-area">
            <BookingWidget
              pricePerNight={propertyData.price}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
            <AgentCard agent={propertyData.agent} />
          </div>
          <StillLookingCard />
        </div>
      </div>
    </div>
  );
}