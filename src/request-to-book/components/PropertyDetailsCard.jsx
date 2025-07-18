import React, { useState, useEffect } from 'react';
import { Star, Users, X } from 'lucide-react'; // Added X for close icon
import LoginSignupModal from '../../register/signup.jsx';


function PropertyDetailsCard({ data }) {

  // Initialize currentCardData directly with the provided data prop.
  // Provide fallback empty object if data is initially undefined to prevent errors.
  const [currentCardData, setCurrentCardData] = useState(data || {});

  const [showModal, setShowModal] = useState(false);
  const [showPriceBreakdownModal, setShowPriceBreakdownModal] = useState(false); // State for price breakdown modal
  const [showCancellationPolicyModal, setShowCancellationPolicyModal] = useState(false); // New state for cancellation policy modal
  const [showSignupModal, setShowSignupModal] = useState(false); // New state for signup modal
  const [activeTab, setActiveTab] = useState('dates'); // 'dates' or 'guests'

  // State for modal data
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [adultsCount, setAdultsCount] = useState(currentCardData.guests || 1); // Initialize with guests from data, or default to 1
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [petsCount, setPetsCount] = useState(0);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0); // New state for month navigation

  // Initialize modal state with current card data when modal opens
  useEffect(() => {
    if (showModal) {
      // Helper function to parse date strings (assuming format like "Mon Jul 25 2025 00:00:00 GMT...")
      // The tripDates in dummyProperties is not directly used for initial date selection here,
      // as it's a calculated display string. For robust date initialization,
      // you'd typically use a specific check-in/check-out date property from your data.
      // For now, we'll keep the current date logic or set to null.
      setSelectedStartDate(null); // Reset for new selection
      setSelectedEndDate(null);   // Reset for new selection

      setAdultsCount(currentCardData.guests || 1); // Re-initialize guests when modal opens
      setCurrentMonthOffset(0); // Always start from current month when modal opens
    }
  }, [showModal, currentCardData.guests]); // Depend on showModal and currentCardData.guests

  const handleSave = () => {
    let newTripDates = "Select Dates"; // Default message if no dates selected
    let newNights = 0;
    let newTotalPrice = 0;

    if (selectedStartDate && selectedEndDate) {
      newTripDates = `${selectedStartDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })} – ${selectedEndDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })}, ${selectedEndDate.getFullYear()}`;
      const diffTime = Math.abs(selectedEndDate.getTime() - selectedStartDate.getTime());
      newNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // Recalculate total price based on new nights and currentCardData.price
      newTotalPrice = (currentCardData.price * newNights) + (currentCardData.airbnbServiceFee || 0);
    } else if (selectedStartDate) {
        newTripDates = `${selectedStartDate.toLocaleString('en-US', { month: 'short', day: 'numeric' })}, ${selectedStartDate.getFullYear()}`;
        newNights = 1;
        newTotalPrice = (currentCardData.price * newNights) + (currentCardData.airbnbServiceFee || 0);
    }

    const newAdults = `${adultsCount} adult${adultsCount > 1 ? 's' : ''}`;

    // Update the state that holds the card's data immutably
    setCurrentCardData(prevData => ({
      ...prevData, // Spread previous data to keep other properties
      tripDates: newTripDates,
      adults: newAdults,
      nights: newNights,
      totalPrice: newTotalPrice,
    }));

    setShowModal(false);
  };

  const handleClearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  // Helper to generate calendar days (simplified for visual representation)
  const generateCalendarDays = (monthOffset) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

    const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const daysInMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = targetMonth.getDay(); // 0 for Sunday, 1 for Monday

    const days = [];
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${monthOffset}-${i}`} className="day-cell"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), i);
      date.setHours(0, 0, 0, 0); // Normalize current day's date for comparison

      const isSelected = (selectedStartDate && date.getTime() === selectedStartDate.getTime()) ||
                         (selectedEndDate && date.getTime() === selectedEndDate.getTime());
      const isWithinRange = selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate;
      const isPast = date < today; // Compare with normalized today

      let dayClasses = 'day-cell';
      if (isSelected) dayClasses += ' selected';
      if (isWithinRange) dayClasses += ' in-range';
      if (isPast) dayClasses += ' past-date';
      else dayClasses += ' hoverable';


      const handleDateClick = () => {
        if (isPast) return;

        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
          // If no start date, or both dates are selected, start a new selection
          setSelectedStartDate(date);
          setSelectedEndDate(null);
        } else if (date.getTime() === selectedStartDate.getTime()) {
          // If clicking the same start date, clear it
          setSelectedStartDate(null);
          setSelectedEndDate(null);
        }
        else if (date < selectedStartDate) {
          // If clicking a date before the current start date, make it the new start date
          setSelectedStartDate(date);
          setSelectedEndDate(null); // Clear end date as range is broken
        } else {
          // If clicking a date after the current start date, set it as the end date
          setSelectedEndDate(date);
        }
      };

      days.push(
        <div key={`day-${monthOffset}-${i}`} className={dayClasses} onClick={handleDateClick}>
          {i}
        </div>
      );
    }
    return days;
  };

  const getMonthName = (offset) => {
    const date = new Date();
    date.setMonth(date.getMonth() + offset);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <>
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .main-container {
          // min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          // padding: 1rem;
          background-color: #f3f4f6; /* gray-100 */
        }

        .property-card {
          max-width: 40rem; /* md:max-w-xl */
          width: 100%;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 0.75rem; /* rounded-xl */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
          overflow: hidden;
          padding: 1.5rem; /* p-6 */
        }

        .property-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem; /* mb-6 */
          gap: 1rem; /* space-x-4 */
        }

        .property-image {
          width: 6rem; /* w-24 */
          height: 6rem; /* h-24 */
          object-fit: cover;
          border-radius: 0.5rem; /* rounded-lg */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
          flex-shrink: 0;
        }

        .property-info {
          flex: 1;
          min-width: 0;
        }

        .property-info h3 {
          font-size: 1.25rem; /* text-xl */
          font-weight: 600; /* font-semibold */
          color: #1f2937; /* gray-900 */
          margin-bottom: 0.25rem; /* mb-1 */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; /* truncate */
        }

        .property-info p {
          color: #4b5563; /* gray-600 */
          font-size: 0.875rem; /* text-sm */
          display: flex;
          align-items: center;
          flex-wrap: wrap; /* flex-wrap */
        }

        .property-info .star-icon {
          width: 1rem; /* w-4 */
          height: 1rem; /* h-4 */
          color: #374151; /* gray-700 */
          margin-right: 0.25rem; /* mr-1 */
          flex-shrink: 0;
        }

        .property-info .guest-favorite {
          margin-left: 0; /* ml-0 */
          display: flex;
          align-items: center;
          color: #374151; /* gray-700 */
          font-weight: 500; /* font-medium */
          flex-wrap: wrap;
        }

        @media (min-width: 640px) { /* sm breakpoint */
          .property-info .guest-favorite {
            margin-left: 0.75rem; /* sm:ml-3 */
          }
        }

        .section-divider {
          border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
          padding-bottom: 1rem; /* pb-4 */
          margin-bottom: 1rem; /* mb-4 */
        }

        h4 {
          font-size: 1.125rem; /* text-lg */
          font-weight: 600; /* font-semibold */
          color: #374151; /* gray-800 */
          margin-bottom: 0.5rem; /* mb-2 */
        }

        .text-base {
          font-size: 1rem; /* text-base */
        }

        .text-sm {
          font-size: 0.875rem; /* text-sm */
        }

        .text-lg {
          font-size: 1.125rem; /* text-lg */
        }

        .text-gray-700 {
          color: #374151; /* gray-700 */
        }

        .text-blue-600 {
          color: #2563eb; /* blue-600 */
        }

        .hover-underline:hover {
          text-decoration: underline;
        }

        .change-button {
          padding: 0.5rem 1rem; /* px-4 py-2 */
          background-color: #f3f4f6; /* gray-100 */
          color: #374151; /* gray-800 */
          border-radius: 0.375rem; /* rounded-md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          margin-top: 0.5rem; /* mt-2 */
        }

        .change-button:hover {
          background-color: #e5e7eb; /* hover:bg-gray-200 */
        }

        .change-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.5); /* focus:ring-2 focus:ring-gray-300 */
        }

        @media (min-width: 640px) { /* sm breakpoint */
          .change-button {
            margin-top: 0; /* sm:mt-0 */
          }
        }

        .price-details-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem; /* mb-2 */
        }

        .price-details-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #1f2937; /* gray-900 */
          font-weight: 700; /* font-bold */
          margin-bottom: 1rem; /* mb-4 */
          font-size: 1.125rem; /* text-lg */
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5); /* bg-black bg-opacity-50 */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1rem; /* p-4 */
        }

        .modal-content {
          background-color: #ffffff;
          border-radius: 0.75rem; /* rounded-xl */
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-2xl */
          width: 100%;
          max-height: 90vh; /* max-h-[90vh] */
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .modal-header {
          position: relative;
          padding: 1.5rem; /* p-6 */
          border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
          flex-shrink: 0;
        }

        .modal-header h3 {
          font-size: 1.25rem; /* text-xl */
          font-weight: 700; /* font-bold */
          color: #1f2937; /* gray-900 */
          text-align: center;
        }

        .modal-close-button {
          position: absolute;
          top: 1rem; /* top-4 */
          right: 1rem; /* right-4 */
          padding: 0.5rem; /* p-2 */
          border-radius: 9999px; /* rounded-full */
          background-color: transparent;
          border: none;
          cursor: pointer;
        }

        .modal-close-button:hover {
          background-color: #f3f4f6; /* hover:bg-gray-100 */
        }

        .modal-close-button .x-icon {
          width: 1.25rem; /* w-5 */
          height: 1.25rem; /* h-5 */
          color: #4b5563; /* gray-600 */
        }

        .modal-tabs {
          display: flex;
          justify-content: center;
          padding: 1rem; /* p-4 */
          background-color: #f9fafb; /* gray-50 */
          border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
          flex-shrink: 0;
        }

        .tab-button {
          padding: 0.5rem 1.5rem; /* px-6 py-2 */
          border-radius: 9999px; /* rounded-full */
          font-size: 1.125rem; /* text-lg */
          font-weight: 500; /* font-medium */
          color: #4b5563; /* gray-600 */
          background-color: transparent;
          border: none;
          cursor: pointer;
        }

        .tab-button:hover {
          background-color: #f3f4f6; /* hover:bg-gray-100 */
        }

        .tab-button.active {
          background-color: #e5e7eb; /* bg-gray-200 */
          color: #1f2937; /* gray-900 */
        }

        .tab-button + .tab-button {
          margin-left: 1rem; /* ml-4 */
        }

        .modal-body {
          padding: 1.5rem; /* p-6 */
          overflow-y: auto;
          flex-grow: 1;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem; /* mb-4 */
        }

        .calendar-nav-button {
          padding: 0.5rem; /* p-2 */
          border-radius: 9999px; /* rounded-full */
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #4b5563; /* gray-600 */
        }

        .calendar-nav-button:hover {
          background-color: #f3f4f6; /* hover:bg-gray-100 */
        }

        .day-names {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem; /* gap-1 */
          text-align: center;
          color: #6b7280; /* gray-500 */
          font-size: 0.875rem; /* text-sm */
          margin-bottom: 1rem; /* mb-4 */
        }

        .day-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem; /* gap-1 */
          text-align: center;
        }

        .day-cell {
          width: 2.5rem; /* w-10 */
          height: 2.5rem; /* h-10 */
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px; /* rounded-full */
          font-size: 0.875rem; /* text-sm */
          cursor: pointer;
        }

        .day-cell.selected {
          background-color: #000000;
          color: #ffffff;
        }

        .day-cell.in-range {
          background-color: #e5e7eb; /* gray-200 */
        }

        .day-cell.past-date {
          color: #9ca3af; /* gray-400 */
          cursor: not-allowed;
        }

        .day-cell.hoverable:hover {
          background-color: #f3f4f6; /* hover:bg-gray-100 */
        }

        .clear-dates-button {
          margin-top: 1.5rem; /* mt-6 */
          color: #2563eb; /* blue-600 */
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem; /* text-base */
        }

        .clear-dates-button:hover {
          text-decoration: underline;
        }

        .guest-details-info {
          color: #4b5563; /* gray-600 */
          font-size: 0.875rem; /* text-sm */
          margin-bottom: 1rem; /* mb-4 */
        }

        .guest-counter-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem; /* py-3 */
          padding-bottom: 0.75rem; /* py-3 */
          border-bottom: 1px solid #e5e7eb; /* border-b border-gray-200 */
        }

        .guest-counter-item:last-child {
          border-bottom: none;
        }

        .guest-counter-label p:first-child {
          font-weight: 600; /* font-semibold */
          color: #374151; /* gray-800 */
        }

        .guest-counter-label p:last-child {
          font-size: 0.875rem; /* text-sm */
          color: #4b5563; /* gray-600 */
        }

        .guest-counter-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem; /* space-x-2 */
        }

        .counter-button {
          width: 2rem; /* w-8 */
          height: 2rem; /* h-8 */
          border-radius: 9999px; /* rounded-full */
          border: 1px solid #d1d5db; /* border border-gray-300 */
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4b5563; /* gray-600 */
          background-color: transparent;
          cursor: pointer;
        }

        .counter-button:hover {
          border-color: #6b7280; /* hover:border-gray-500 */
        }

        .counter-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .counter-value {
          font-weight: 500; /* font-medium */
          color: #374151; /* gray-800 */
          width: 1.5rem; /* w-6 */
          text-align: center;
        }

        .modal-footer {
          padding: 1.5rem; /* p-6 */
          border-top: 1px solid #e5e7eb; /* border-t border-gray-200 */
          display: flex;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .save-button {
          padding: 0.75rem 1.5rem; /* px-6 py-3 */
          background-color: #000000;
          color: #ffffff;
          border-radius: 0.375rem; /* rounded-md */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
          border: none;
          cursor: pointer;
        }

        .save-button:hover {
          background-color: #1f2937; /* hover:bg-gray-800 */
        }

        .save-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #000000; /* focus:ring-2 focus:ring-black */
        }

        /* Responsive adjustments for cancellation policy modal */
        .cancellation-policy-section {
          display: flex;
          flex-direction: column; /* Default to column on small screens */
          justify-content: space-between;
          align-items: flex-start; /* Align text to start */
          margin-bottom: 1rem; /* mb-4 */
        }

        @media (min-width: 640px) { /* sm breakpoint */
          .cancellation-policy-section {
            flex-direction: row; /* Row on larger screens */
            align-items: center; /* Center items vertically */
          }
          .cancellation-policy-section > div:first-child {
            margin-bottom: 0; /* Remove bottom margin on larger screens */
          }
          .cancellation-policy-section > div:last-child {
            text-align: right; /* Align text to right for the second div */
          }
        }
        `}
      </style>
      <div className="main-container">
        <div className="property-card">
          {/* Property Header */}
          <div className="property-header">
            <img
              className="property-image"
              src={currentCardData.images && currentCardData.images.length > 0 ? currentCardData.images[0] : "https://placehold.co/100x100/E0E0E0/333333?text=Property"}
              alt={currentCardData.name || "Property Image"}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/E0E0E0/333333?text=Property"; }}
            />
            <div className="property-info">
              <h3>{currentCardData.name || "N/A"}</h3>
              <p>
                <Star className="star-icon" />
                {currentCardData.rating || "N/A"} ({currentCardData.reviewsCount || 0})
                {currentCardData.isGuestFavorite && (
                  <span className="guest-favorite">
                    <Users className="star-icon" /> Guest favorite
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Free Cancellation Section */}
          <div className="section-divider">
            <h4>Free cancellation</h4>
            <p className="text-gray-700 text-base">
              {showCancellationPolicyModal ? (currentCardData.cancellationPolicy || "This reservation is non-refundable.") : "This reservation is non-refundable."}{" "}
              <a
                href="#"
                className="text-blue-600 hover-underline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCancellationPolicyModal(true);
                }}
              >
                Full policy
              </a>
            </p>
          </div>

          {/* Trip Details Section */}
          <div className="section-divider" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0, flexGrow: 1, paddingRight: '0.5rem' }}>
              <h4>Trip details</h4>
              <p className="text-gray-700 text-base">{currentCardData.tripDates || "Select Dates"}</p>
              <p className="text-gray-700 text-base">{currentCardData.adults || `${currentCardData.guests || 1} adult`}</p>
            </div>
            <button
              className="change-button"
              onClick={() => setShowModal(true)}
            >
              Change
            </button>
          </div>

          {/* Price Details Section */}
          <div style={{ paddingBottom: '0.5rem' }}>
            <h4>Price details</h4>
            <div className="price-details-row">
              <p className="text-gray-700 text-base">
                ${(currentCardData.price || 0).toFixed(2)} x {currentCardData.nights ?? 0} nights
              </p>
              <span className="text-base" style={{ fontWeight: 500 }}>
                ${((currentCardData.price || 0) * (currentCardData.nights || 0)).toFixed(2)}
              </span>
            </div>
            <div className="price-details-total">
              <p className="text-lg">Total USD</p>
              <span className="text-lg">
                ${currentCardData.totalPrice?.toFixed(2) ?? '0.00'}
              </span>
            </div>
            <a
              href="#"
              className="text-blue-600 hover-underline text-base"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                setShowPriceBreakdownModal(true);
              }}
            >
              Price breakdown
            </a>
          </div>

          {/* Reservation Details Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content" style={{ maxWidth: '40rem' }}>
                {/* Modal Header */}
                <div className="modal-header">
                  <h3>Change reservation details</h3>
                  <button
                    className="modal-close-button"
                    onClick={() => setShowModal(false)}
                  >
                    <X className="x-icon" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="modal-tabs">
                  <button
                    className={`tab-button ${activeTab === 'dates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dates')}
                  >
                    Dates
                  </button>
                  <button
                    className={`tab-button ${activeTab === 'guests' ? 'active' : ''}`}
                    onClick={() => setActiveTab('guests')}
                  >
                    Guests
                  </button>
                </div>

                {/* Modal Content */}
                <div className="modal-body">
                  {activeTab === 'dates' && (
                    <div>
                      <div className="calendar-header">
                        <button
                          className="calendar-nav-button"
                          onClick={() => setCurrentMonthOffset(prev => prev - 1)}
                        >
                          {'<'}
                        </button>
                        <h5 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{getMonthName(currentMonthOffset)}</h5>
                        <button
                          className="calendar-nav-button"
                          onClick={() => setCurrentMonthOffset(prev => prev + 1)}
                        >
                          {'>'}
                        </button>
                      </div>
                      <div className="day-names">
                        {/* Fixed the key warning by using index in addition to the day */}
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                          <div key={`${day}-${index}`} style={{ fontWeight: 500 }}>{day}</div>
                        ))}
                      </div>
                      <div className="day-grid">
                        {generateCalendarDays(currentMonthOffset)} {/* Only display one month */}
                      </div>
                      <button
                        className="clear-dates-button"
                        onClick={handleClearDates}
                      >
                        Clear dates
                      </button>
                    </div>
                  )}

                  {activeTab === 'guests' && (
                    <div>
                      <p className="guest-details-info">
                        This place has a maximum of {currentCardData.guests || 3} guests, not including infants. Pets aren't allowed.
                      </p>

                      {/* Adult Counter */}
                      <div className="guest-counter-item">
                        <div className="guest-counter-label">
                          <p>Adults</p>
                          <p>Age 13+</p>
                        </div>
                        <div className="guest-counter-controls">
                          <button
                            className="counter-button"
                            onClick={() => setAdultsCount(prev => Math.max(1, prev - 1))}
                            disabled={adultsCount <= 1}
                          >
                            -
                          </button>
                          <span className="counter-value">{adultsCount}</span>
                          <button
                            className="counter-button"
                            onClick={() => setAdultsCount(prev => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children Counter */}
                      <div className="guest-counter-item">
                        <div className="guest-counter-label">
                          <p>Children</p>
                          <p>Ages 2 – 12</p>
                        </div>
                        <div className="guest-counter-controls">
                          <button
                            className="counter-button"
                            onClick={() => setChildrenCount(prev => Math.max(0, prev - 1))}
                            disabled={childrenCount <= 0}
                          >
                            -
                          </button>
                          <span className="counter-value">{childrenCount}</span>
                          <button
                            className="counter-button"
                            onClick={() => setChildrenCount(prev => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants Counter */}
                      <div className="guest-counter-item">
                        <div className="guest-counter-label">
                          <p>Infants</p>
                          <p>Under 2</p>
                        </div>
                        <div className="guest-counter-controls">
                          <button
                            className="counter-button"
                            onClick={() => setInfantsCount(prev => Math.max(0, prev - 1))}
                            disabled={infantsCount <= 0}
                          >
                            -
                          </button>
                          <span className="counter-value">{infantsCount}</span>
                          <button
                            className="counter-button"
                            onClick={() => setInfantsCount(prev => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Pets Counter */}
                      <div className="guest-counter-item" style={{ borderBottom: 'none' }}>
                        <div className="guest-counter-label">
                          <p>Pets</p>
                          <p className="text-blue-600 hover-underline" style={{ cursor: 'pointer' }}>Bringing a service animal?</p>
                        </div>
                        <div className="guest-counter-controls">
                          <button
                            className="counter-button"
                            onClick={() => setPetsCount(prev => Math.max(0, prev - 1))}
                            disabled={petsCount <= 0}
                          >
                            -
                          </button>
                          <span className="counter-value">{petsCount}</span>
                          <button
                            className="counter-button"
                            onClick={() => setPetsCount(prev => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
          <button
            className="save-button"
            onClick={() => {
              handleSave();
              setShowModal(false);
              setShowSignupModal(true);
            }}
          >
            Save
          </button>
                </div>
              </div>
            </div>
          )}

          {/* Price Breakdown Modal */}
          {showPriceBreakdownModal && (
            <div className="modal-overlay">
              <div className="modal-content" style={{ maxWidth: '24rem' }}>
                {/* Modal Header */}
                <div className="modal-header">
                  <h3>Price details</h3>
                  <button
                    className="modal-close-button"
                    onClick={() => setShowPriceBreakdownModal(false)}
                  >
                    <X className="x-icon" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="modal-body">
                  <div className="price-details-row" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                    <p className="text-gray-700 text-base">
                      {currentCardData.nights ?? 0} nights · {currentCardData.tripDates || "N/A"}
                    </p>
                    <span style={{ fontWeight: 500, color: '#374151' }}>
                      ${((currentCardData.price || 0) * (currentCardData.nights || 0)).toFixed(2)}
                    </span>
                  </div>
                  <div className="price-details-row section-divider" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                    <p className="text-gray-700 text-base">Airbnb service fee</p>
                    <span style={{ fontWeight: 500, color: '#374151' }}>
                      ${(currentCardData.airbnbServiceFee || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="price-details-row" style={{ paddingTop: '1rem', paddingBottom: '1rem', fontWeight: 700, fontSize: '1.125rem', color: '#1f2937' }}>
                    <p>Total USD</p>
                    <span>
                      ${currentCardData.totalPrice?.toFixed(2) ?? '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cancellation Policy Modal */}
          {showCancellationPolicyModal && (
            <div className="modal-overlay">
              <div className="modal-content" style={{ maxWidth: '28rem' }}>
                {/* Modal Header */}
                <div className="modal-header">
                  <h3>Cancellation policy</h3>
                  <button
                    className="modal-close-button"
                    onClick={() => setShowCancellationPolicyModal(false)}
                  >
                    <X className="x-icon" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="modal-body">
                  {/* Display the cancellation policy string directly */}
                  <p className="text-gray-700 text-base" style={{ marginBottom: '1rem' }}>
                    {currentCardData.cancellationPolicy || "No cancellation policy provided."}
                  </p>

                  <a href="#" className="clear-dates-button" style={{ marginTop: '1.5rem', display: 'block' }}>
                    Learn more about cancellation policies
                  </a>
                </div>
              </div>
            </div>
      )}
    </div>
  </div>
  {showSignupModal && <LoginSignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />}
</>
  );
}

export default PropertyDetailsCard;
