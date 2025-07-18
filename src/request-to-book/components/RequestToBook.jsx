import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingSteps from './BookingSteps';
import PropertyDetailsCard from './PropertyDetailsCard';
import LoginSignupModal from '../../register/signup';
import '../styles/styles.css'; 
import { ArrowLeft } from 'lucide-react';

function RequestToBook({ propertyData, checkInDate, checkOutDate, pricePerNight }) {
  propertyData = propertyData || {};
  const navigate = useNavigate();

  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSignupModal = () => {
    setIsSignupOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupOpen(false);
  };

  const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalNights = calculateNights(checkInDate, checkOutDate);
  const totalPrice = (pricePerNight || 0) * totalNights;

  const formattedCheckIn = checkInDate
    ? new Date(checkInDate).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
    : "Add date";
  const formattedCheckOut = checkOutDate
    ? new Date(checkOutDate).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
    : "Add date";

  return (
    <div className="request-to-book-container">
      <div className="header">
        <button
          className="back-button"
          onClick={() => navigate('/property-details')}
        >
          <ArrowLeft size={24} />
        </button>
        <h1>Request to book</h1>
      </div>
      <div className="content-area">
        <div className="booking-steps-section">
          <BookingSteps onContinue={openSignupModal} />
        </div>
        <div className="property-details-section">
          <PropertyDetailsCard data={propertyData || { pricePerNight: 0 }} />
        </div>
      </div>
      <LoginSignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
    </div>
  );
}

export default RequestToBook;
