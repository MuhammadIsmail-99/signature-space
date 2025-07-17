// app/property-details/components/LocationSection.jsx
import { renderIcon } from "../../utils/renderIcon" // Adjusted path

export default function LocationSection({ location, locationDetails }) {
  return (
    <div className="card location-section">
      <h2>Location</h2>
      <p className="text-sm text-gray-500 mb-4">What's nearby</p>
      <div className="location-details-list">
        {(Array.isArray(locationDetails) ? locationDetails : []).map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            {renderIcon(item.icon)}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className="location-map-container">
        <button className="show-on-map-btn">Show on map</button>
      </div>
    </div>
  )
}
