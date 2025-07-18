// App.js
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react'; // Using Lucid-React for the arrow icon
import { Link } from 'react-router-dom';
import LoginSignupModal from "../register/signup";  


// Consolidated CSS for all components
const appStyles = `
  /* App.css */
  body {
    font-family: 'Inter', Arial, sans-serif; /* Using Inter as per instructions */
    margin: 0;
    background-color: #f0f0f0;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 40px;
    flex-wrap: wrap; /* Allows wrapping on smaller screens */
  }

  /* Header.css */
  .header {
    display: flex;
    align-items: center;
    padding: 20px 40px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .back-arrow {
    margin-right: 20px;
    cursor: pointer;
    color: #333;
  }

  .header h1 {
    font-size: 22px;
    margin: 0;
    font-weight: 600;
  }

  /* BookingSteps.css */
  .booking-steps {
    flex: 1;
    max-width: 500px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 30px;
  }

  .step-item {
    display: flex;
    flex-direction: column; /* Changed to column to stack title and content */
    align-items: flex-start; /* Align items to the start */
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }

  .step-item:last-child {
    border-bottom: none;
  }

  .step-header {
    display: flex;
    align-items: center;
    width: 100%; /* Ensure header takes full width */
  }

  .step-number {
    font-size: 18px;
    font-weight: bold;
    margin-right: 15px;
    color: #888;
  }

  .step-title {
    font-size: 18px;
    color: #555;
    flex-grow: 1;
  }

  .step-item.active .step-number,
  .step-item.active .step-title {
    color: #333;
  }

  .continue-button {
    background-color: #e00; /* Airbnb-like red */
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px; /* Space from the step title */
  }

  .continue-button:hover {
    background-color: #c00;
  }

  /* PaymentMethod.css (integrated) */
  .payment-method-form {
    width: 100%;
    margin-top: 20px;
  }

  .payment-option {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }

  .payment-option:last-of-type {
    border-bottom: none;
  }

  .payment-option input[type="radio"] {
    margin-right: 15px;
    transform: scale(1.2); /* Make radio buttons slightly larger */
  }

  .payment-option label {
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .payment-option label img {
    height: 20px; /* Adjust as needed for logos */
    margin-left: 10px;
  }

  .payment-option label span {
    margin-left: 5px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #555;
  }

  .input-field {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box; /* Include padding in width */
    display: flex;
    align-items: center;
  }

  .input-field input {
    border: none;
    outline: none;
    flex-grow: 1;
    font-size: 16px;
    padding: 0; /* Remove default input padding */
  }

  .input-field svg {
    margin-right: 10px;
    color: #888;
  }

  .input-row {
    display: flex;
    gap: 15px;
  }

  .input-row .form-group {
    flex: 1;
  }

  .country-select-wrapper {
    position: relative;
    width: 100%;
  }

  .country-select {
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    background-color: #fff;
    cursor: pointer;
    padding-right: 40px; /* Space for custom arrow */
  }

  .country-select-wrapper .select-arrow {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; /* Allow clicks to pass through to select */
    color: #888;
  }

  .next-button {
    background-color: #333; /* Darker button for "Next" */
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    margin-top: 30px;
  }

  .next-button:hover {
    background-color: #000;
  }

  .rare-find-message {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #e00; /* Red color for warning/highlight */
    margin-top: 20px;
    padding: 15px;
    background-color: #ffebeb; /* Light red background */
    border-radius: 8px;
  }

  .rare-find-message svg {
    color: #e00;
  }

  /* BookingSummary.css */
  .booking-summary {
    width: 350px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 25px;
    border: 1px solid #ddd; /* Light border as seen in the image */
  }

  .property-card {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .property-image {
    width: 100px;
    height: 90px;
    border-radius: 8px;
    object-fit: cover;
  }

  .property-details h3 {
    font-size: 16px;
    margin: 0 0 5px 0;
    font-weight: 600;
  }

  .rating {
    font-size: 14px;
    color: #555;
  }

  .stars {
    margin-right: 10px;
  }

  .refund-policy {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .refund-policy a {
    color: #333;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer; /* Indicate it's clickable */
  }

  .trip-details {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .trip-details h4 {
    font-size: 16px;
    margin: 0 0 10px 0;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .trip-details p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
  }

  .change-button {
    background: none;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 8px 15px;
    font-size: 14px;
    cursor: pointer;
    color: #333;
  }

  .price-details {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .price-details:last-child {
      border-bottom: none; /* No border for the last section */
      padding-bottom: 0;
      margin-bottom: 0;
  }


  .price-details h4 {
    font-size: 16px;
    margin: 0 0 10px 0;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;
  }

  .total-price {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
  }

  .price-breakdown-link {
    font-size: 14px;
    color: #333;
    font-weight: 600;
    text-decoration: underline;
    display: block;
    margin-top: 10px;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #fff;
    border-radius: 12px;
    padding: 20px;
    width: 90%;
    max-width: 400px; /* Adjusted max-width for 1 month */
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  .modal-header h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    flex-grow: 1;
    text-align: center;
  }

  .modal-close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: #555;
  }

  .modal-tabs {
    display: flex;
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 20px;
  }

  .modal-tab-button {
    flex: 1;
    padding: 10px 15px;
    border: none;
    background-color: transparent;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .modal-tab-button.active {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  /* Guests Tab Specific Styles */
  .guest-counter-section {
    padding: 10px 0;
  }

  .guest-counter-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }

  .guest-counter-item:last-of-type {
    border-bottom: none;
  }

  .guest-type-info h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  .guest-type-info p {
    margin: 2px 0 0;
    font-size: 14px;
    color: #777;
  }

  .counter-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .counter-button {
    background: none;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    color: #555;
    transition: background-color 0.2s ease;
  }

  .counter-button:hover:not(:disabled) {
    background-color: #eee;
  }

  .counter-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .counter-value {
    font-size: 16px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
  }

  .guest-limit-message {
    font-size: 14px;
    color: #777;
    margin-top: 15px;
    text-align: center;
  }

  .guest-service-animal-link {
    display: block;
    margin-top: 15px;
    font-size: 14px;
    color: #333;
    text-decoration: underline;
  }

  /* Dates Tab Specific Styles */
  .calendar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
  }

  .calendar-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    margin-bottom: 20px;
  }

  .calendar-navigation button {
    background: none;
    border: none; /* Removed border */
    border-radius: 0; /* Removed border-radius */
    width: auto; /* Allow width to adjust to content */
    height: auto; /* Allow height to adjust to content */
    padding: 0 5px; /* Added slight horizontal padding */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #333; /* Darker color for the arrows */
    font-size: 24px; /* Make arrows larger */
    transition: opacity 0.2s ease; /* Transition for hover */
    box-shadow: none; /* Removed box-shadow */
  }

  .calendar-navigation button:hover {
    background-color: transparent; /* Ensure no background on hover */
    opacity: 0.7; /* Slight opacity change on hover */
    box-shadow: none; /* Ensure no shadow on hover */
  }

  .calendar-months-display {
    display: flex;
    gap: 30px; /* Space between months */
    justify-content: center;
    width: 100%;
  }

  .calendar-month {
    flex: 1; /* Allow months to take equal space */
    max-width: 250px; /* Limit width for each month */
    text-align: center;
  }

  .calendar-month-title {
    font-size: 18px;
    font-weight: 600; /* Ensure bold */
    margin-bottom: 15px;
    text-align: center; /* Ensure centered */
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    width: 100%;
    text-align: center;
  }

  .calendar-day-header {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    padding: 8px 0;
  }

  .calendar-day {
    padding: 10px 0;
    border-radius: 50%; /* Make days circular */
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    font-size: 14px;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1; /* Keep circular shape */
  }

  .calendar-day.empty {
    background-color: transparent;
    cursor: default;
  }

  .calendar-day.disabled {
    color: #ccc;
    cursor: not-allowed;
    background-color: transparent;
  }

  .calendar-day.selected-start,
  .calendar-day.selected-end {
    background-color: #333; /* Dark background for start/end dates */
    color: #fff;
    font-weight: bold;
  }

  .calendar-day.in-range {
    background-color: #f7f7f7; /* Light gray for range */
    border-radius: 0; /* Remove border-radius for range */
  }

  /* Specific styling for start/end of range to make them rounded */
  .calendar-day.selected-start {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  .calendar-day.selected-end {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  /* If a single day is selected, it should be fully rounded */
  .calendar-day.selected-single {
    border-radius: 50%;
    background-color: #333;
    color: #fff;
  }

  /* When a day is both start/end and in range (i.e., a single day selection) */
  .calendar-day.selected-start.selected-end {
    border-radius: 50%;
  }

  /* Adjust background for days in range that are also start/end */
  .calendar-day.selected-start.in-range {
    background-color: #333;
  }
  .calendar-day.selected-end.in-range {
    background-color: #333;
  }

  /* Ensure the range background extends correctly */
  .calendar-day.in-range:not(.selected-start):not(.selected-end) {
    border-radius: 0;
  }

  /* Cancellation Policy Modal Specific Styles */
  .cancellation-policy-modal .modal-content {
    max-width: 500px; /* Adjust width for this specific modal */
    padding: 30px;
  }

  .cancellation-policy-modal .modal-header {
    border-bottom: none; /* No border for this header */
    margin-bottom: 10px; /* Reduced margin */
  }

  .cancellation-policy-modal .modal-header h2 {
    font-size: 18px; /* Slightly smaller title */
    font-weight: 700; /* Bolder */
  }

  .cancellation-policy-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .cancellation-policy-section:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .cancellation-policy-section h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 5px 0;
  }

  .cancellation-policy-section p {
    font-size: 14px;
    color: #555;
    margin: 0;
  }

  .cancellation-policy-time {
    font-size: 14px;
    color: #777;
    margin-top: 5px;
  }

  .learn-more-link {
    display: block;
    margin-top: 20px;
    font-size: 14px;
    color: #333;
    text-decoration: underline;
    font-weight: 600;
    cursor: pointer;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
      align-items: center;
      padding: 20px;
      gap: 20px;
    }

    .header {
      padding: 15px 20px;
    }

    .header h1 {
      font-size: 20px;
    }

    .booking-steps,
    .booking-summary {
      width: 100%;
      max-width: unset; /* Remove max-width constraint */
      padding: 20px;
    }

    .modal-content {
      width: 95%;
      padding: 15px;
    }

    .modal-header h2 {
      font-size: 18px;
    }

    .calendar-navigation button {
      font-size: 20px;
    }

    .calendar-month-title {
      font-size: 16px;
    }

    .calendar-day,
    .calendar-day-header {
      font-size: 12px;
      padding: 8px 0;
    }

    .payment-option label {
      font-size: 14px;
    }

    .input-field input,
    .country-select {
      font-size: 14px;
      padding: 10px 12px;
    }

    .next-button,
    .continue-button {
      padding: 10px 20px;
      font-size: 14px;
    }

    .property-details h3 {
      font-size: 15px;
    }

    .rating,
    .refund-policy,
    .trip-details p,
    .price-item,
    .price-breakdown-link,
    .rare-find-message,
    .guest-limit-message,
    .guest-service-animal-link,
    .cancellation-policy-section p,
    .cancellation-policy-time {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    .header {
      padding: 10px 15px;
    }

    .header h1 {
      font-size: 18px;
    }

    .main-content {
      padding: 15px;
    }

    .booking-steps,
    .booking-summary {
      padding: 15px;
    }

    .modal-content {
      padding: 10px;
    }

    .modal-header h2 {
      font-size: 16px;
    }

    .modal-tab-button {
      font-size: 14px;
      padding: 8px 10px;
    }

    .counter-button {
      width: 28px;
      height: 28px;
      font-size: 18px;
    }

    .counter-value {
      font-size: 14px;
    }
  }
`;

// Header Component
function Header() {
  return (
    <header className="header">
      <Link to="/property-details">
        <ArrowLeft size={24} className="back-arrow" />
      </Link>
      <h1>Request to book</h1>
    </header>
  );
}

// BookingSteps Component
function BookingSteps({ currentStep, onContinue }) {
  return (
    <div className="booking-steps">
      <div className={`step-item ${currentStep === 1 ? 'active' : ''}`}>
        <div className="step-number">1.</div>
        <div className="step-title">Log in or sign up</div>
        <button className="continue-button" onClick={onContinue}>Continue</button>
      </div>
      <div className={`step-item ${currentStep === 2 ? 'active' : ''}`}>
        <div className="step-number">2.</div>
        <div className="step-title">Add a payment method</div>
        {/* This section would render the payment form when currentStep is 2 */}
      </div>
      <div className={`step-item ${currentStep === 3 ? 'active' : ''}`}>
        <div className="step-number">3.</div>
        <div className="step-title">Review your request</div>
        {/* This section would render the review details when currentStep is 3 */}
      </div>
    </div>
  );
}

// BookingSummary Component
function BookingSummary() {
  return (
    <div className="booking-summary">
      <div className="property-card">
        {/* Placeholder image URL. In a real app, this would come from props or API. */}
        <img src="https://placehold.co/100x90/EAEAEA/333333?text=Property" alt="Arteo Cozy City-Center Studio" className="property-image" />
        <div className="property-details">
          <h3>Arteo Cozy City-Center Studio in Gulberg Beige</h3>
          <div className="rating">
            <span className="stars">★ 4.93 (128)</span>
            <span className="favorite">♡ Guest favorite</span>
          </div>
        </div>
      </div>

      <p className="refund-policy">
        This reservation is non-refundable. <a href="#">Full policy</a>
      </p>

      <div className="trip-details">
        <h4>Trip details</h4>
        <button className="change-button">Change</button>
        <p>Jul 19 - 20, 2025</p>
        <p>1 adult</p>
      </div>

      <div className="price-details">
        <h4>Price details</h4>
        <div className="price-item">
          <span>$31.63 x 1 night</span>
          <span>$31.63</span>
        </div>
        <div className="total-price">
          <span>Total USD</span>
          <span>$31.63</span>
        </div>
        <a href="#" className="price-breakdown-link">Price breakdown</a>
      </div>
    </div>
  );
}


function RequestToBookPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Login, 2: Payment, 3: Review
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContinue = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Optionally advance step after modal closes
    // setCurrentStep(prevStep => prevStep + 1);
  };

  return (
    <>
      <style>{appStyles}</style> {/* Inject consolidated CSS */}
      <div className="app-container">
        <Header />
        <div className="main-content">
          <BookingSteps currentStep={currentStep} onContinue={handleContinue} />
          <BookingSummary />
        </div>
        <LoginSignupModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </>
  );
}

export default RequestToBookPage;
