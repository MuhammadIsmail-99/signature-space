// app/property-details/components/BookingWidget.jsx
"use client"
import { renderIcon } from "../../utils/renderIcon"

export default function BookingWidget({ pricePerNight, checkInDate, checkOutDate }) {
  const calculateNights = (start, end) => {
    if (!start || !end) return 0
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const totalNights = calculateNights(checkInDate, checkOutDate)
  const totalPrice = pricePerNight * totalNights

  const formattedCheckIn = checkInDate
    ? new Date(checkInDate).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
    : "Add date"
  const formattedCheckOut = checkOutDate
    ? new Date(checkOutDate).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
    : "Add date"

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates.")
      return
    }
    alert(`Reserving for ${totalNights} nights from ${formattedCheckIn} to ${formattedCheckOut} for $${totalPrice}`)
    // In a real app, this would trigger an API call
  }

  return (
    <div className="card booking-widget">
      <div className="price-summary">
        ${totalPrice} <span>for {totalNights} nights</span>
      </div>
      <div className="booking-input-group">
        <div className="booking-input">
          <span className="input-label">CHECK-IN</span>
          <span className="input-value">{formattedCheckIn}</span>
        </div>
        <div className="booking-input">
          <span className="input-label">CHECKOUT</span>
          <span className="input-value">{formattedCheckOut}</span>
        </div>
      </div>
      <div className="booking-input-with-icon">
        <div className="input-text">
          <span className="input-label">GUESTS</span>
          <span className="input-value">1 guest</span> {/* Hardcoded as per image */}
        </div>
        {renderIcon("ChevronDown")}
      </div>
      <button className="reserve-btn" onClick={handleReserve}>
        Reserve
      </button>
      <p className="charge-info">You won't be charged yet</p>
    </div>
  )
}
