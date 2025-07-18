import React from 'react';
import '../styles/styles.css';

function xookingSteps({ onContinue }) {
  return (
    <div className="booking-steps">
      <div className="step active">
        <span className="step-number">1.</span> Log in or sign up
        <button className="continue-button" onClick={onContinue}>Continue</button>
      </div>
      <div className="step">
        <span className="step-number">2.</span> Add a payment method
      </div>
      <div className="step">
        <span className="step-number">3.</span> Review your request
      </div>
    </div>
  );
}

export default BookingSteps;