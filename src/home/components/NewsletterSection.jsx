"use client"

// app/home/components/NewsletterSection.jsx
export default function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2 className="newsletter-title">Join Signature Space email list to stay up to date about</h2>
            <p className="newsletter-subtitle">Affordable Co-Living and Properties in Your Area</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="newsletter-input" required />
            <button type="submit" className="newsletter-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
