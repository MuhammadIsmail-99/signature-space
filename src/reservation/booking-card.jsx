import { Star, Check, Lock } from "lucide-react"

function BookingCard({ data }) {
  const {
    propertyImage = "/placeholder.svg",
    propertySize = "",
    propertyType = "",
    guests = 0,
    bedrooms = 0,
    rating = 0,
    reviewCount = 0,
    location = "",
    checkIn = "",
    checkOut = "",
    nights = 0,
    guestCount = 0,
    pricePerNight = 0,
    totalPrice = 0,
    currency = "$",
    includedFees = [],
  } = data || {}

  // Helper to format price safely
  const formatPrice = (price) => {
    if (typeof price === "number") {
      return price.toLocaleString()
    }
    if (typeof price === "string") {
      return price
    }
    return "N/A"
  }

  // Helper to format date strings safely
  const formatDate = (date) => {
    if (!date) return ""
    if (typeof date === "string") return date
    if (date instanceof Date) return date.toLocaleDateString("en-US")
    return ""
  }

  return (
    <div className="booking-card">
      {/* Property Header */}
      <div className="property-header">
        <div className="property-image">
          <img src={data.images[0]} alt="Property" />
        </div>
        <div className="property-info">
          <div className="property-title">
            {data.type} • {data.guests} guests • {data.bedrooms} bedrooms
          </div>
          <div className="rating">
            <Star className="star-icon filled" size={16} />
            <span className="rating-score">{data.rating}</span>
            <span className="review-count">({data.reviewCount})</span>
          </div>
          <div className="location">{data.location}</div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="booking-details">
        <div className="dates">
          {formatDate(checkIn)} - {formatDate(checkOut)}, ({nights} nights)
        </div>
        <div className="guest-info">{guestCount} guests</div>
      </div>

      {/* Pricing */}
      <div className="pricing-section">
        <div className="price-row">
          <span>Price for {nights} nights</span>
          {/* <span className="price">
            {currency} {formatPrice(pricePerNight)}
          </span> */}
          
        </div>
        <div className="total-row">
          <span className="total-label">Total</span>
          <span className="total-price">
            {currency} {formatPrice(totalPrice)} <span className="tax-info">Incl. taxes and fees</span>
          </span>
        </div>
      </div>

      {/* Included Fees */}
      {/* <div className="included-section">
        <div className="section-title">Incl. in total</div>
        <div className="fees-list">
          {includedFees.map((fee, index) => (
            <div key={index} className="fee-item">
              <Check className="check-icon" size={16} />
              <span>{fee.text || fee}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Cancellation Policy */}
      <div className="policy-section">
        <button className="policy-button">
          <Lock size={16} />
          View cancellation policy
        </button>
      </div>
    </div>
  )
}

export default BookingCard
