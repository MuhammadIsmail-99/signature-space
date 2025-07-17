// app/home/components/ListPropertySection.jsx
import { Link } from "react-router-dom"
export default function ListPropertySection() {
  return (
    <section className="list-property-section">
      <div className="list-property-container">
        <div
          className="list-property-overlay"
          style={{
            backgroundImage: `url(/home-assets/list-property-image.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="list-property-content">
          <h2 className="list-property-title">Rent your property confidently with Signature Space</h2>
          <p className="list-property-description">
            With live-support, quick signup, and highly-rated guests, hosting on Vrbo can feel like a vacation.
          </p>
          <Link to="/property-management" className="list-property-btn">List your property</Link>
        </div>
      </div>
    </section>
  )
}
