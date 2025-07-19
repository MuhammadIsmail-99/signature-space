// app/home/components/ListPropertySection.jsx
import { Link } from "react-router-dom"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import "../styles/ListPropertySection.css"
import "../styles/animations.css"

export default function ListPropertySection() {
  const [containerRef, containerVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 0,
  })
  const [contentRef, contentVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 300,
  })

  return (
    <section className="list-property-section">
      <div
        ref={containerRef}
        className={`list-property-container animate-container ${containerVisible ? "visible" : ""}`}
      >
        <div
          className={`list-property-overlay animate-background-pattern ${containerVisible ? "visible" : ""}`}
          style={{
            backgroundImage: `url(/placeholder.svg?height=400&width=800&query=property listing background)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div ref={contentRef} className={`list-property-content animate-on-scroll ${contentVisible ? "visible" : ""}`}>
          <h2 className="list-property-title">Rent your property confidently with Signature Space</h2>
          <p className="list-property-description">
            With live-support, quick signup, and highly-rated guests, hosting on Vrbo can feel like a vacation.
          </p>
          <Link to="/property-management" className="list-property-btn">
            List your property
          </Link>
        </div>
      </div>
    </section>
  )
}
