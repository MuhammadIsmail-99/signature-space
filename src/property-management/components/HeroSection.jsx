import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content container">
        <h1>Property Management in Dubai</h1>
        <p>Expert Holiday Home, and Vacation Rental Management.</p>
        <a href="#list-property-form" className="button button-secondary">
          List Your Property
        </a>
      </div>
    </section>
  )
}
