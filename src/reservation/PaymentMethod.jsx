// App.js
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, MapPin, ChevronDown, X, Plus, Minus, Diamond } from 'lucide-react'; // Added icons for payment form and modal
import paypalLogo from '../assets/paypal-logo.svg'; // Import PayPal logo
import { Link } from 'react-router-dom';

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
      <Link to="/request-to-book">
        <ArrowLeft size={24} className="back-arrow" />
      </Link>
      <h1>Confirm and pay</h1> {/* Updated header text */}
    </header>
  );
}

// PaymentMethod Component
function PaymentMethod({ onNext }) {
  const [selectedPayment, setSelectedPayment] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiration: '',
    cvv: '',
    streetAddress: '',
    aptSuite: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan'
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send payment details to backend
    console.log("Submitting payment details:", { selectedPayment, cardDetails });
    onNext(); // Move to the next step
  };

  return (
    <form className="payment-method-form" onSubmit={handleSubmit}>
      <div className="payment-option">
        <input
          type="radio"
          id="creditCard"
          name="paymentOption"
          value="credit_card"
          checked={selectedPayment === 'credit_card'}
          onChange={() => setSelectedPayment('credit_card')}
        />
        <label htmlFor="creditCard">
          Credit or debit card
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Diners_Club_International_logo.svg" alt="Diners Club" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Discover_Card_logo.svg" alt="Discover" /> */}
        </label>
      </div>

      {selectedPayment === 'credit_card' && (
        <>
          <h3>Billing address</h3> {/* Moved Billing address inside credit card section */}
          <div className="form-group">
            <div className="input-field">
              <CreditCard size={20} />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="form-group">
              <div className="input-field">
                <input
                  type="text"
                  name="expiration"
                  placeholder="Expiration"
                  value={cardDetails.expiration}
                  onChange={handleCardChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <Lock size={20} />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  required
                />
              </div>
            </div>
          </div>


          <div className="form-group">
            <div className="input-field">
              <MapPin size={20} />
              <input
                type="text"
                name="streetAddress"
                placeholder="Street address"
                value={cardDetails.streetAddress}
                onChange={handleCardChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-field">
              <input
                type="text"
                name="aptSuite"
                placeholder="Apt or suite number"
                value={cardDetails.aptSuite}
                onChange={handleCardChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-field">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={cardDetails.city}
                onChange={handleCardChange}
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="form-group">
              <div className="input-field">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={cardDetails.state}
                  onChange={handleCardChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-field">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP code"
                  value={cardDetails.zipCode}
                  onChange={handleCardChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="country-select-wrapper">
              <select
                name="country"
                className="country-select"
                value={cardDetails.country}
                onChange={handleCardChange}
                required
              >
                <option value="Pakistan">Pakistan</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                {/* Add more countries as needed */}
              </select>
              <ChevronDown size={20} className="select-arrow" />
            </div>
          </div>
        </>
      )}

      <div className="payment-option">
        <input
          type="radio"
          id="paypal"
          name="paymentOption"
          value="paypal"
          checked={selectedPayment === 'paypal'}
          onChange={() => setSelectedPayment('paypal')}
        />
        <label htmlFor="paypal">
          PayPal
          <img src={paypalLogo} alt="PayPal" style={{ height: '20px', marginLeft: '10px' }} />
        </label>
      </div>

      <div className="payment-option">
        <input
          type="radio"
          id="googlePay"
          name="paymentOption"
          value="google_pay"
          checked={selectedPayment === 'google_pay'}
          onChange={() => setSelectedPayment('google_pay')}
        />
        <label htmlFor="googlePay">
          Google Pay
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="Google Pay" style={{ height: '20px', marginLeft: '10px' }} />
        </label>
      </div>

      <button type="submit" className="next-button">Next</button>
    </form>
  );
}


// BookingSteps Component
function BookingSteps({ currentStep, onContinue }) {
  return (
    <div className="booking-steps">
      <div className={`step-item ${currentStep === 1 ? 'active' : ''}`}>
        <div className="step-header">
          <div className="step-number">1.</div>
          <div className="step-title">Add a payment method</div>
        </div>
        {currentStep === 1 && (
          <PaymentMethod onNext={onContinue} />
        )}
      </div>
      <div className={`step-item ${currentStep === 2 ? 'active' : ''}`}>
        <div className="step-header">
          <div className="step-number">2.</div>
          <div className="step-title">Review your reservation</div>
        </div>
        {/* This section would render the review details when currentStep is 2 */}
      </div>
    </div>
  );
}

// ReservationChangeModal Component
function ReservationChangeModal({ show, onClose, currentGuests, currentDates, onApplyChanges }) {
  const [activeTab, setActiveTab] = useState('dates'); // Default to dates tab as per image
  const [guests, setGuests] = useState(currentGuests);
  const [selectedDates, setSelectedDates] = useState(currentDates);
  const [hoveredDate, setHoveredDate] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of day

  const [displayMonth, setDisplayMonth] = useState(today.getMonth());
  const [displayYear, setDisplayYear] = useState(today.getFullYear());

  // Helper to get days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get the first day of the month (0 for Sunday, 6 for Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setDisplayMonth(prevMonth => {
      if (prevMonth === 0) {
        setDisplayYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setDisplayMonth(prevMonth => {
      if (prevMonth === 11) {
        setDisplayYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  // Function to render a single month calendar
  const renderMonth = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month); // 0 = Sunday, 6 = Saturday
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

    const days = [];
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${year}-${month}-${i}`} className="calendar-day empty"></div>);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0); // Normalize date to start of day

      const isStartDate = selectedDates[0] && date.toDateString() === selectedDates[0].toDateString();
      const isEndDate = selectedDates[1] && date.toDateString() === selectedDates[1].toDateString();
      const isInRange = selectedDates[0] && selectedDates[1] && date > selectedDates[0] && date < selectedDates[1];
      const isHoveredInRange = hoveredDate && selectedDates[0] && !selectedDates[1] && date > selectedDates[0] && date < hoveredDate;

      const isDisabled = date < today; // Disable past dates

      let className = "calendar-day";
      if (isDisabled) className += " disabled";
      if (isStartDate) className += " selected-start";
      if (isEndDate) className += " selected-end";
      if (isInRange || isHoveredInRange) className += " in-range";
      if (isStartDate && isEndDate) className += " selected-single"; // For single day selection

      days.push(
        <div
          key={`${year}-${month}-${day}`}
          className={className}
          onClick={() => !isDisabled && handleDateSelect(date)}
          onMouseEnter={() => !isDisabled && setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="calendar-month">
        <div className="calendar-month-title">{monthName} {year}</div>
        <div className="calendar-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`header-${month}-${index}`} className="calendar-day-header">{day}</div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  const handleDateSelect = (date) => {
    // Logic for selecting a date range (start and end date)
    if (selectedDates.length === 0) {
      // First date selected
      setSelectedDates([date]);
    } else if (selectedDates.length === 1) {
      // Second date selected
      const startDate = selectedDates[0];
      if (date > startDate) {
        setSelectedDates([startDate, date]);
      } else {
        // If selected date is before start date, make it the new start date
        setSelectedDates([date]);
      }
    } else {
      // Both dates selected, reset to new start date
      setSelectedDates([date]);
    }
  };

  const handleGuestChange = (type, delta) => {
    setGuests(prevGuests => {
      const newCount = prevGuests[type] + delta;
      if (newCount < 0) return prevGuests; // Cannot go below zero

      // Max 2 guests excluding infants for adults/children
      if (type !== 'infants' && type !== 'pets' && (newCount + (prevGuests.adults + prevGuests.children) > 2) && delta > 0) {
        return prevGuests;
      }

      return { ...prevGuests, [type]: newCount };
    });
  };

  const handleApply = () => {
    onApplyChanges({ guests, dates: selectedDates });
    onClose();
  };

  if (!show) {
    return null;
  }

  // Calculate the month to display (only one month)
  const currentMonthDate = new Date(displayYear, displayMonth, 1);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button className="modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
          <h2>Change reservation details</h2>
          <div></div> {/* Placeholder for alignment */}
        </div>

        <div className="modal-tabs">
          <button
            className={`modal-tab-button ${activeTab === 'dates' ? 'active' : ''}`}
            onClick={() => setActiveTab('dates')}
          >
            Dates
          </button>
          <button
            className={`modal-tab-button ${activeTab === 'guests' ? 'active' : ''}`}
            onClick={() => setActiveTab('guests')}
          >
            Guests
          </button>
        </div>

        {activeTab === 'dates' && (
          <div className="calendar-container">
            <div className="calendar-navigation">
              <button onClick={handlePrevMonth}>
                &lt; {/* HTML entity for < */}
              </button>
              <div className="calendar-months-display">
                {renderMonth(currentMonthDate.getFullYear(), currentMonthDate.getMonth())}
              </div>
              <button onClick={handleNextMonth}>
                &gt; {/* HTML entity for > */}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'guests' && (
          <div className="guest-counter-section">
            <div className="guest-limit-message">
              This place has a maximum of 2 guests, not including infants. Pets aren't allowed.
            </div>
            <div className="guest-counter-item">
              <div className="guest-type-info">
                <h4>Adults</h4>
                <p>Age 13+</p>
              </div>
              <div className="counter-controls">
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('adults', -1)}
                  disabled={guests.adults <= 0}
                >
                  <Minus size={16} />
                </button>
                <span className="counter-value">{guests.adults}</span>
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('adults', 1)}
                  disabled={(guests.adults + guests.children) >= 2}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="guest-counter-item">
              <div className="guest-type-info">
                <h4>Children</h4>
                <p>Ages 2 – 12</p>
              </div>
              <div className="counter-controls">
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('children', -1)}
                  disabled={guests.children <= 0}
                >
                  <Minus size={16} />
                </button>
                <span className="counter-value">{guests.children}</span>
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('children', 1)}
                  disabled={(guests.adults + guests.children) >= 2}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="guest-counter-item">
              <div className="guest-type-info">
                <h4>Infants</h4>
                <p>Under 2</p>
              </div>
              <div className="counter-controls">
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('infants', -1)}
                  disabled={guests.infants <= 0}
                >
                  <Minus size={16} />
                </button>
                <span className="counter-value">{guests.infants}</span>
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('infants', 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="guest-counter-item">
              <div className="guest-type-info">
                <h4>Pets</h4>
              </div>
              <div className="counter-controls">
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('pets', -1)}
                  disabled={guests.pets <= 0}
                >
                  <Minus size={16} />
                </button>
                <span className="counter-value">{guests.pets}</span>
                <button
                  className="counter-button"
                  onClick={() => handleGuestChange('pets', 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <a href="#" className="guest-service-animal-link">Bringing a service animal?</a>
          </div>
        )}
        <button className="next-button" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
}

// CancellationPolicyModal Component
function CancellationPolicyModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay cancellation-policy-modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
          <h2>Cancellation policy</h2>
          <div></div> {/* Placeholder for alignment */}
        </div>

        <div className="cancellation-policy-section">
          <h3>Before</h3>
          <p>Jul 24</p>
          <p className="cancellation-policy-time">2:00 PM</p>
          <h3>Full refund</h3>
          <p>Get back 100% of what you paid.</p>
        </div>

        <div className="cancellation-policy-section">
          <h3>Before</h3>
          <p>Jul 25</p>
          <p className="cancellation-policy-time">2:00 PM</p>
          <h3>Partial refund</h3>
          <p>Get back every night but the first one. No refund of the first night or the service fee.</p>
        </div>

        <a href="#" className="learn-more-link">Learn more about cancellation policies</a>
      </div>
    </div>
  );
}


// BookingSummary Component
function BookingSummary() {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false); // New state for policy modal
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  // Initial dates matching the image (Jul 25 - 27, 2025)
  const [dates, setDates] = useState([new Date(2025, 6, 25), new Date(2025, 6, 27)]);

  const handleOpenCalendarModal = () => setShowCalendarModal(true);
  const handleCloseCalendarModal = () => setShowCalendarModal(false);

  const handleOpenPolicyModal = () => setShowPolicyModal(true); // New handler
  const handleClosePolicyModal = () => setShowPolicyModal(false); // New handler

  const handleApplyChanges = ({ guests: newGuests, dates: newDates }) => {
    setGuests(newGuests);
    setDates(newDates);
    // You might want to format dates for display here
    console.log("Applied Changes - Guests:", newGuests, "Dates:", newDates);
  };

  // Format dates for display in BookingSummary
  const formatDateRange = (datesArray) => {
    if (datesArray.length === 0) return "Select dates";
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    if (datesArray.length === 1) {
      return datesArray[0].toLocaleDateString('en-US', options);
    }
    const start = datesArray[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = datesArray[1].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <div className="booking-summary">
      <div className="property-card">
        {/* Placeholder image URL. In a real app, this would come from props or API. */}
        <img src="https://placehold.co/100x90/EAEAEA/333333?text=Property" alt="1-BHK Pool & Gym on RT" className="property-image" />
        <div className="property-details">
          <h3>1-BHK Pool & Gym on RT (Paid)</h3>
          <div className="rating">
            <span className="stars">★ 4.98 (41)</span>
            <span className="favorite">♡ Guest favorite</span>
          </div>
        </div>
      </div>

      <p className="refund-policy">
        Free cancellation <br/>
        Cancel before Jul 24 for a full refund. <a href="#" onClick={handleOpenPolicyModal}>Full policy</a>
      </p>

      <div className="trip-details">
        <h4>Trip details</h4>
        <button className="change-button" onClick={handleOpenCalendarModal}>Change</button>
        <p>{formatDateRange(dates)}</p>
        <p>{guests.adults + guests.children} guest(s)</p> {/* Display combined adults and children */}
      </div>

      <div className="price-details">
        <h4>Price details</h4>
        <div className="price-item">
          <span>$28.50 x 2 nights</span>
          <span>$56.99</span>
        </div>
        <div className="price-item">
          <span>Special offer</span>
          <span style={{color: '#008000'}}>- $0.50</span> {/* Green for discount */}
        </div>
        <div className="total-price">
          <span>Total USD</span>
          <span>$56.49</span>
        </div>
        <a href="#" className="price-breakdown-link">Price breakdown</a>
      </div>

      <ReservationChangeModal
        show={showCalendarModal}
        onClose={handleCloseCalendarModal}
        currentGuests={guests}
        currentDates={dates}
        onApplyChanges={handleApplyChanges}
      />

      <CancellationPolicyModal
        show={showPolicyModal}
        onClose={handleClosePolicyModal}
      />
    </div>
  );
}


function AddPaymentMethod() {
  // Start with step 1 (Add a payment method) as per the new image
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  return (
    <>
      <style>{appStyles}</style> {/* Inject consolidated CSS */}
      <div className="app-container">
        <Header />
        <div className="main-content">
          {/* Pass handleNextStep to BookingSteps, which then passes it to PaymentMethod */}
          <BookingSteps currentStep={currentStep} onContinue={handleNextStep} />
          <BookingSummary />
        </div>
      </div>
    </>
  );
}

export default AddPaymentMethod;
