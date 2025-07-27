import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapZoomController({ zoomLevel }) {
  const map = useMap();
  map.setZoom(zoomLevel);
  return null;
}

export default function MapSection({ location }) {
  const [zoomLevel, setZoomLevel] = useState(13); // Default zoom for city view
  const [center, setCenter] = useState([25.276987, 55.296249]);
  useEffect(() => {
    if (!location || !location.trim()) return;
    let ignore = false;
    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
        );
        const data = await response.json();
        if (!ignore && data && data.length > 0) {
          setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          setZoomLevel(13);
        }
      } catch {}
    };
    fetchCoords();
    return () => { ignore = true; };
  }, [location]);

  return (
    <div className="map-section" style={{ width: "100%", height: "100%" }}>
      <div
        className="map-container"
        lang="en"
        style={{ position: "relative", width: "100%", height: "100%", minWidth: 0, minHeight: 0, border: "1px solid #ccc", borderRadius: 8 }}
      >
        <MapContainer center={center} zoom={zoomLevel} style={{ height: "100%", width: "100%", borderRadius: 8 }} scrollWheelZoom={true} key={center.join(",") + zoomLevel}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <MapZoomController zoomLevel={zoomLevel} />
        </MapContainer>

        <div className="map-footer">
          <span className="map-data">Map data ©2025 OpenStreetMap</span>
          <span className="scale">1000 km</span>
          <a href="#" className="terms">
            Terms
          </a>
        </div>
      </div>
    </div>
  );
}
