// app/property-details/components/BookingWidget.jsx
"use client"
import { renderIcon } from "../../utils/renderIcon"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function BookingWidget({ pricePerNight, checkInDate: initialCheckInDate, checkOutDate: initialCheckOutDate, propertyData }) {
  const navigate = useNavigate()

  const [checkInDate, setCheckInDate] = useState(initialCheckInDate || "")
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate || "")
  const [guests, setGuests] = useState(1)

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
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert("Check-out date must be after check-in date.")
      return
    }
    if (guests < 1) {
      alert("Please select at least one guest.")
      return
    }
    navigate("/request-to-book", { state: { propertyData, checkInDate, checkOutDate, pricePerNight, guests } })
  }

  return (
    <div className="card booking-widget">
      <div className="price-summary">
        ${totalPrice} <span>for {totalNights} nights</span>
      </div>
      <div className="booking-input-group">
        <div className="booking-input">
          <label className="input-label" htmlFor="checkin">CHECK-IN</label>
          <input
            id="checkin"
            type="date"
            className="input-value"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="booking-input">
          <label className="input-label" htmlFor="checkout">CHECKOUT</label>
          <input
            id="checkout"
            type="date"
            className="input-value"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate}
          />
        </div>
      </div>
      <div className="booking-input-with-icon">
        <div className="input-text">
          <label className="input-label" htmlFor="guests">GUESTS</label>
          <input
            id="guests"
            type="number"
            className="input-value"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
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
