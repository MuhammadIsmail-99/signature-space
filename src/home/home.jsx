"use client"

import { useState } from "react"
import SearchBar from "../Searchbar/search-bar.jsx"
import "./styles.css"
import logoImg from "../assets/logo.png"

function Home({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleProfileClick = () => {
    onNavigate("signin") // Use the prop to navigate
  }
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeRentalTab, setActiveRentalTab] = useState("daily")
  const [rentalImageIndexes, setRentalImageIndexes] = useState({})

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const nextSlide = () => {
    if (currentSlide < areas.length - 4) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleImageNavigation = (rentalId, direction) => {
    const currentIndex = rentalImageIndexes[rentalId] || 0
    const rental =
      activeRentalTab === "daily"
        ? dailyRentals.find((r) => r.id === rentalId)
        : monthlyRentals.find((r) => r.id === rentalId)
    const maxIndex = rental.images.length - 1

    let newIndex
    if (direction === "next") {
      newIndex = currentIndex < maxIndex ? currentIndex + 1 : currentIndex
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
    }

    setRentalImageIndexes((prev) => ({
      ...prev,
      [rentalId]: newIndex,
    }))
  }

  const areas = [
    {
      id: 1,
      title: "Marina",
      image: require("../assets/Marina.jpg"),
    },
    {
      id: 2,
      title: "Lake view",
      image: require("../assets/Lake tower.jpg"),
    },
    {
      id: 3,
      title: "Downtown",
      image: require("../assets/downtown.jpg"),
    },
    {
      id: 4,
      title: "Beach residency",
      image: require("../assets/beach-res.jpg"),
    },
    {
      id: 5,
      title: "Suburbs",
      image: require("../assets/header-image.jpg"),
    },
    {
      id: 6,
      title: "City Center",
      image: require("../assets/logo.png"),
    },
  ]

  const agents = [
    {
      id: 1,
      name: "Amelia Stephenson",
      image: require("../assets/Marina.jpg"),
      rating: "5.0",
      propertiesSold: "453 properties sold",
    },
    {
      id: 2,
      name: "Kacie Velasquez",
      image: require("../assets/Lake tower.jpg"),
      rating: "5.0",
      propertiesSold: "325 properties sold",
    },
    {
      id: 3,
      name: "Fletcher Morse",
      image: require("../assets/downtown.jpg"),
      rating: "5.0",
      propertiesSold: "289 properties sold",
    },
    {
      id: 4,
      name: "Bibi Shelton",
      image: require("../assets/beach-res.jpg"),
      rating: "5.0",
      propertiesSold: "230 properties sold",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Paul Mbingu",
      image: require("../assets/Marina.jpg"),
      date: "Nov 26, 2023",
      rating: 4,
      verified: true,
      review:
        "We've tried countless prototyping tools and products to hands down the most flexible and powerful tool for our team's workflow. No matter which tools or platforms are being used, we can import our...",
    },
    {
      id: 2,
      name: "Marion Nguyi",
      image: require("../assets/Lake tower.jpg"),
      date: "Sep 9, 2023",
      rating: 5,
      verified: true,
      review: "My reason is exciting. Thank You Jesus. God is preparing me for greater purpose & effectiveness! Amen!",
    },
    {
      id: 3,
      name: "Wendy Hawi",
      image: require("../assets/downtown.jpg"),
      date: "Oct 11, 2023",
      rating: 5,
      verified: true,
      review:
        "Philips Hue light bulbs are like having a personal sunrise simulator in your home. They gradually brighten to wake you up naturally. I feel like I'm waking up on a tropical island instead of in my dingy apartment. And if I s...",
    },
    {
      id: 4,
      name: "Mercy Mbingu",
      image: require("../assets/beach-res.jpg"),
      date: "Feb 19, 2024",
      rating: 5,
      verified: true,
      review:
        "Ever since I went to a large electronics retail store near me to get something totally unrelated to smart home products, I've been hooked on Philips Hue lights. Philips Hue demonstrated in concert with what I was looking for, I was hooked on the...",
    },
  ]

  const dailyRentals = [
    {
      id: 1,
      images: [require("../assets/downtown.jpg"), require("../assets/Marina.jpg"), require("../assets/beach-res.jpg")],
      price: "From $184",
      details: "House 6 guests 3 bedrooms",
      location: "Downtown",
      rating: "4/5",
    },
    {
      id: 2,
      images: [require("../assets/Marina.jpg"), require("../assets/Lake tower.jpg")],
      price: "From $150",
      details: "Apartment 4 guests 2 bedrooms",
      location: "Marina",
      rating: "4/5",
    },
    {
      id: 3,
      images: [
        require("../assets/beach-res.jpg"),
        require("../assets/header-image.jpg"),
        require("../assets/Lake tower.jpg"),
        require("../assets/logo.png"),
      ],
      price: "From $220",
      details: "Villa 8 guests 4 bedrooms",
      location: "Beach residency",
      rating: "5/5",
    },
    {
      id: 4,
      images: [require("../assets/logo.png")],
      price: "From $95",
      details: "Studio 2 guests 1 bedroom",
      location: "City Center",
      rating: "4/5",
    },
    {
      id: 5,
      images: [require("../assets/header-image.jpg"), require("../assets/downtown.jpg")],
      price: "From $175",
      details: "Apartment 5 guests 2 bedrooms",
      location: "Suburbs",
      rating: "4/5",
    },
    {
      id: 6,
      images: [
        require("../assets/Marina.jpg"),
        require("../assets/beach-res.jpg"),
        require("../assets/Lake tower.jpg"),
      ],
      price: "From $280",
      details: "Penthouse 10 guests 5 bedrooms",
      location: "Marina",
      rating: "5/5",
    },
    {
      id: 7,
      images: [require("../assets/downtown.jpg"), require("../assets/header-image.jpg")],
      price: "From $120",
      details: "Loft 3 guests 1 bedroom",
      location: "Downtown",
      rating: "4/5",
    },
    {
      id: 8,
      images: [require("../assets/Lake tower.jpg"), require("../assets/logo.png"), require("../assets/Marina.jpg")],
      price: "From $200",
      details: "Condo 6 guests 3 bedrooms",
      location: "Lake view",
      rating: "5/5",
    },
  ]

  const monthlyRentals = [
    {
      id: 5,
      images: [
        require("../assets/downtown.jpg"),
        require("../assets/header-image.jpg"),
        require("../assets/Lake tower.jpg"),
      ],
      price: "From $2,800/month",
      details: "House 6 guests 3 bedrooms",
      location: "Downtown",
      rating: "4/5",
    },
    {
      id: 6,
      images: [require("../assets/Marina.jpg"), require("../assets/Lake tower.jpg")],
      price: "From $2,200/month",
      details: "Apartment 4 guests 2 bedrooms",
      location: "Marina",
      rating: "4/5",
    },
    {
      id: 7,
      images: [require("../assets/beach-res.jpg")],
      price: "From $3,500/month",
      details: "Villa 8 guests 4 bedrooms",
      location: "Beach residency",
      rating: "5/5",
    },
    {
      id: 8,
      images: [require("../assets/logo.png"), require("../assets/header-image.jpg"), require("../assets/downtown.jpg")],
      price: "From $1,800/month",
      details: "Studio 2 guests 1 bedroom",
      location: "City Center",
      rating: "4/5",
    },
    {
      id: 9,
      images: [require("../assets/Marina.jpg"), require("../assets/beach-res.jpg")],
      price: "From $3,200/month",
      details: "Penthouse 8 guests 4 bedrooms",
      location: "Marina",
      rating: "5/5",
    },
    {
      id: 10,
      images: [require("../assets/Lake tower.jpg"), require("../assets/downtown.jpg")],
      price: "From $2,500/month",
      details: "Townhouse 7 guests 3 bedrooms",
      location: "Suburbs",
      rating: "4/5",
    },
    {
      id: 11,
      images: [require("../assets/header-image.jpg"), require("../assets/logo.png"), require("../assets/Marina.jpg")],
      price: "From $1,950/month",
      details: "Loft 4 guests 2 bedrooms",
      location: "Downtown",
      rating: "4/5",
    },
    {
      id: 12,
      images: [
        require("../assets/beach-res.jpg"),
        require("../assets/Lake tower.jpg"),
        require("../assets/header-image.jpg"),
      ],
      price: "From $4,200/month",
      details: "Luxury Villa 12 guests 6 bedrooms",
      location: "Beach residency",
      rating: "5/5",
    },
  ]

  const currentRentals = activeRentalTab === "daily" ? dailyRentals : monthlyRentals

  const popularLocations = [
    { name: "Dubai Marina", type: "Monthly Rentals" },
    { name: "Jumeirah Beach Residence (JBR)", type: "Monthly Rentals" },
    { name: "Downtown Dubai", type: "Monthly Rentals" },
    { name: "Palm Jumeirah", type: "Monthly Rentals" },
    { name: "Business Bay", type: "Monthly Rentals" },
    { name: "Dubai Creek Harbour", type: "Monthly Rentals" },
    { name: "Al Barsha", type: "Monthly Rentals" },
    { name: "Dubai Silicon Oasis", type: "Monthly Rentals" },
    { name: "Jumeirah Village Circle (JVC)", type: "Monthly Rentals" },
    { name: "Arabian Ranches", type: "Monthly Rentals" },
    { name: "Mirdif", type: "Monthly Rentals" },
    { name: "Dubai Sports City", type: "Monthly Rentals" },
    { name: "International City", type: "Monthly Rentals" },
    { name: "Discovery Gardens", type: "Monthly Rentals" },
    { name: "Dubai Investment Park (DIP)", type: "Monthly Rentals" },
    { name: "Jumeirah Lakes Towers (JLT)", type: "Monthly Rentals" },
    { name: "The Greens", type: "Monthly Rentals" },
    { name: "Show more", type: "" },
  ]

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <a href="#" className="logo">
            <div className="logo-icon">
              <img src={logoImg || "/placeholder.svg"} alt="Logo" />
            </div>
          </a>

          <ul className="nav-links">
            <li>
              <a href="#home" className="nav-link">
                Home
              </a>
            </li>
            <li>
              <a href="#monthly" className="nav-link">
                Monthly Properties
              </a>
            </li>
            <li>
              <a href="#daily" className="nav-link">
                Daily Properties
              </a>
            </li>
            <li>
              <a href="#list" className="nav-link">
                List Property (Owner)
              </a>
            </li>
            <li>
              <a href="#blog" className="nav-link">
                Blog
              </a>
            </li>
          </ul>

          <div className="nav-right">
            <div className="profile-icon" onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              {/* Replaced Heroicon with a simple SVG for a profile icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>

            <div className="hamburger" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation - Replaced Headless UI Dialog with simple div */}
        <div className={`mobile-nav ${mobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-nav-header">
            <a href="#" className="logo">
              <div className="logo-icon">
                <img src={logoImg || "/placeholder.svg"} alt="Logo" />
              </div>
            </a>
            <button className="close-mobile-menu" onClick={toggleMobileMenu}>
              {/* Replaced Heroicon with a simple X */}
              &times;
            </button>
          </div>
          <ul>
            <li>
              <a href="#home" className="nav-link" onClick={toggleMobileMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#monthly" className="nav-link" onClick={toggleMobileMenu}>
                Monthly Properties
              </a>
            </li>
            <li>
              <a href="#daily" className="nav-link" onClick={toggleMobileMenu}>
                Daily Properties
              </a>
            </li>
            <li>
              <a href="#list" className="nav-link" onClick={toggleMobileMenu}>
                List Property (Owner)
              </a>
            </li>
            <li>
              <a href="#blog" className="nav-link" onClick={toggleMobileMenu}>
                Blog
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  handleProfileClick()
                  toggleMobileMenu()
                }}
                className="nav-link mobile-login-link"
              >
                Log in
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Search bar Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${require("../assets/header-image.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content">
          <SearchBar />
        </div>
      </section>

      {/* Areas Section */}
      <section className="areas-section">
        <h2 className="section-title">Areas of Our Homes</h2>
        <div className="areas-container">
          <div className="areas-wrapper">
            <div className="areas-slider" style={{ transform: `translateX(-${currentSlide * 260}px)` }}>
              {areas.map((area) => (
                <div key={area.id} className="area-card">
                  <img src={area.image || "/placeholder.svg"} alt={area.title} className="area-image" />
                  <h3 className="area-title">{area.title}</h3>
                  <button className="view-properties-btn">View properties</button>
                </div>
              ))}
            </div>
          </div>

          <button className="nav-button prev" onClick={prevSlide} disabled={currentSlide === 0}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button className="nav-button next" onClick={nextSlide} disabled={currentSlide >= areas.length - 4}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* Rentals Section */}
      <section className="rentals-section">
        <div className="rentals-container">
          <h2 className="rentals-title">Our top vacation rentals</h2>

          {/* Rental Tabs */}
          <div className="rental-tabs">
            <button
              className={`rental-tab ${activeRentalTab === "daily" ? "active" : ""}`}
              onClick={() => setActiveRentalTab("daily")}
            >
              Daily Rentals
            </button>
            <button
              className={`rental-tab ${activeRentalTab === "monthly" ? "active" : ""}`}
              onClick={() => setActiveRentalTab("monthly")}
            >
              Monthly Rentals
            </button>
          </div>

          <div className="rentals-grid">
            {currentRentals.map((rental) => {
              const currentImageIndex = rentalImageIndexes[rental.id] || 0
              return (
                <div key={rental.id} className="rental-card">
                  <div className="rental-image-container">
                    <div className="rental-images" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                      {rental.images.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt="Rental property"
                          className="rental-image"
                        />
                      ))}
                    </div>

                    {rental.images.length > 1 && currentImageIndex > 0 && (
                      <button className="image-nav-btn prev" onClick={() => handleImageNavigation(rental.id, "prev")}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                      </button>
                    )}

                    {rental.images.length > 1 && currentImageIndex < rental.images.length - 1 && (
                      <button className="image-nav-btn next" onClick={() => handleImageNavigation(rental.id, "next")}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                      </button>
                    )}

                    {rental.images.length > 1 && (
                      <div className="image-dots">
                        {rental.images.map((_, index) => (
                          <div
                            key={index}
                            className={`image-dot ${index === currentImageIndex ? "active" : ""}`}
                            onClick={() => setRentalImageIndexes((prev) => ({ ...prev, [rental.id]: index }))}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rental-info">
                    <div className="rental-price">{rental.price}</div>
                    <div className="rental-details">{rental.details}</div>
                    <div className="rental-location">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {rental.location}
                    </div>
                    <div className="rental-footer">
                      <div className="rating">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                        </svg>
                        {rental.rating}
                      </div>
                      <button className="view-deal-btn">View deal</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <button className="show-more-btn">Show more</button>
        </div>
      </section>

      {/* List Property Section */}
      <section className="list-property-section">
        <div className="list-property-container">
          <div
            className="list-property-overlay"
            style={{
              backgroundImage: `url(${require("../assets/list-property-image.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="list-property-content">
            <h2 className="list-property-title">Rent your property confidently with Signature Space</h2>
            <p className="list-property-description">
              With live-support, quick signup, and highly-rated guests, hosting on Vrbo can feel like a vacation.
            </p>
            <button className="list-property-btn">List your property</button>
          </div>
        </div>
      </section>

      {/* Company Agents Section */}
      <section className="agents-section">
        <div className="agents-container">
          <div className="agents-content">
            <div className="agents-text">
              <h2 className="agents-title">Sell with top agents</h2>
              <p className="agents-subtitle">Skip the hustle and let the pros get things done</p>
              <button className="top-agents-btn">Top Agents</button>
            </div>
            <div className="agents-grid">
              {agents.map((agent) => (
                <div key={agent.id} className="agent-card">
                  <img src={agent.image || "/placeholder.svg"} alt={agent.name} className="agent-image" />
                  <div className="agent-rating">
                    <span className="rating-number">{agent.rating}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="star-icon">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                    </svg>
                  </div>
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-properties">{agent.propertiesSold}</p>
                  <button className="contact-agent-btn">Contact</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-container">
          <div className="reviews-header">
            <div className="reviews-title-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="reviews-icon">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h2 className="reviews-title">Popular Reviews</h2>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img src={review.image || "/placeholder.svg"} alt={review.name} className="reviewer-image" />
                  <div className="reviewer-info">
                    <div className="reviewer-name-container">
                      <h4 className="reviewer-name">{review.name}</h4>
                      {review.verified && (
                        <div className="verified-badge">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Verified Buyer</span>
                        </div>
                      )}
                    </div>
                    <p className="review-date">{review.date}</p>
                  </div>
                </div>

                <div className="review-rating">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={index < review.rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      className="star-icon"
                    >
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                    </svg>
                  ))}
                </div>

                <p className="review-text">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2 className="newsletter-title">Join Homa email list to stay up to date about</h2>
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>HomeToGo</h3>
              <ul className="footer-links">
                <li>
                  <a href="#about" className="footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="footer-link">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#investors" className="footer-link">
                    Investors
                  </a>
                </li>
                <li>
                  <a href="#stock" className="footer-link">
                    HomeToGo stock
                  </a>
                </li>
                <li>
                  <a href="#app" className="footer-link">
                    App
                  </a>
                </li>
                <li>
                  <a href="#features" className="footer-link">
                    Product features
                  </a>
                </li>
                <li>
                  <a href="#insights" className="footer-link">
                    Insights
                  </a>
                </li>
                <li>
                  <a href="#inspiration" className="footer-link">
                    Inspiration
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact</h3>
              <ul className="footer-links">
                <li>
                  <a href="#help" className="footer-link">
                    Help Center and contact
                  </a>
                </li>
                <li>
                  <a href="#list" className="footer-link">
                    List your home
                  </a>
                </li>
                <li>
                  <a href="#affiliate" className="footer-link">
                    Become an affiliate partner
                  </a>
                </li>
                <li>
                  <a href="#press" className="footer-link">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Legal policies</h3>
              <ul className="footer-links">
                <li>
                  <a href="#terms" className="footer-link">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#legal" className="footer-link">
                    Legal
                  </a>
                </li>
                <li>
                  <a href="#platform" className="footer-link">
                    How the platform works
                  </a>
                </li>
                <li>
                  <a href="#security" className="footer-link">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#guidelines" className="footer-link">
                    Content Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Follow us</h3>
              <div className="social-links">
                <button type="button" className="social-link instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zM6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>
                <button type="button" className="social-link facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button type="button" className="social-link linkedin">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button type="button" className="social-link tiktok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Signature Space. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
