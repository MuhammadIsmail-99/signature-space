"use client"

import { useState } from "react"

export default function MapSection() {
  const [zoomLevel, setZoomLevel] = useState(1)

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  return (
    <div className="map-section">
      <div className="map-container">
        <div className="map-controls">
          <button className="map-control zoom-in" onClick={zoomIn}>
            +
          </button>
          <button className="map-control zoom-out" onClick={zoomOut}>
            −
          </button>
        </div>

        <div className="map-placeholder" style={{ transform: `scale(${zoomLevel})` }}>
          {/* Empty map placeholder */}
        </div>

        <div className="map-footer">
          <span className="google-logo">Google</span>
          <span className="map-data">Map data ©2025 Google, INEGI</span>
          <span className="scale">1000 km</span>
          <a href="#" className="terms">
            Terms
          </a>
        </div>
      </div>
    </div>
  )
}
