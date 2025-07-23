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
import AgentCard from "../home/components/AgentCard"
import AgentDetailModal from "../home/components/AgentDetailModal"
import AvailabilitySection from "./components/AvailabilitySection"
import StillLookingCard from "./components/StillLookingCard"
import { dummyProperties } from "../utils/dummyData"
import HomeHeader from "../home/components/HomeHeader"
import Footer from "../home/components/Footer"

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
  const [guests, setGuests] = useState(1);

  const [showModal, setShowModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)

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

  // AgentCard props and logic
  const agents = propertyData.agent ? [propertyData.agent] : [];
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    // Show agent cards after mount for animation
    setCardsVisible(true);
  }, []);

  // Delay for staggered animation
  const getItemDelay = useCallback((index) => index * 100, []);

  // Simple star icon renderer
  const renderIcon = useCallback((type, size = 16, color = "currentColor") => {
    if (type === "star") {
      return (
        <svg width={size} height={size} fill={color} viewBox="0 0 20 20"></svg>
      );
    }
    return null;
  }, [scrollToSection]);

  // Handler for AgentCard to open modal
  const handleContactAgent = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAgent(null);
  };

  return (
    <div>
      <HomeHeader />
      <ImageGallery images={propertyData.images} />
      <div className="tabs-row">
        <button className="tab-button" onClick={() => scrollToSection(yourStayRef)}>
          Your Stay
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
              checkInDate={checkInDate ? new Date(checkInDate) : null}
              checkOutDate={checkOutDate ? new Date(checkOutDate) : null}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              bookedDates={bookedDates}
            />
          </div>

          {/* <div id="cancellation-section" ref={cancellationRef} className="">
            <h2>Cancellation Policy</h2>
            <p>{propertyData.cancellationPolicy}</p>
          </div> */}
        </div>
        <div className="sidebar-area">
          <BookingWidget
            pricePerNight={propertyData.price}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
            bookedDates={bookedDates}
            propertyData={propertyData}
            guests={guests}
            setGuests={setGuests}
          />
          <AgentCard
            agents={agents}
            cardsVisible={cardsVisible}
            getItemDelay={getItemDelay}
            renderIcon={renderIcon}
            handleContactAgent={handleContactAgent}
          />
        </div>
        <StillLookingCard />
      </div>
      <Footer />
      {showModal && <AgentDetailModal agent={selectedAgent} onClose={handleCloseModal} />}
    </div>
  );
}
