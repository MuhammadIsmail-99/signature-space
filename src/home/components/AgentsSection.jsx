"use client"

import { useState } from "react"
import { agents } from "../../utils/dummyData"
import { renderIcon } from "../utils"
import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/useScrollAnimation"
import "../styles/AgentSection.css"
import "../styles/animations.css"

// Basic Modal Component
const AgentDetailModal = ({ agent, onClose }) => {
  if (!agent) return null

  return (
    <div className="agent-modal-overlay" onClick={onClose}>
      <div className="agent-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="agent-modal-close" onClick={onClose}>
          {renderIcon("close", 24)}
        </button>
        <img
          src={agent.image || "/placeholder.svg?height=100&width=100&query=agent profile"}
          alt={agent.name}
          className="modal-agent-image"
        />
        <h2>{agent.name}</h2>
        <p className="modal-agent-rating">
          <span className="rating-number">{agent.rating}</span>
          {renderIcon("star", 16, "currentColor")}
        </p>
        <p className="modal-agent-properties">{agent.propertiesSold}</p>
        <p className="modal-agent-bio">{agent.bio}</p>
        <div className="modal-contact-info">
          <p>
            <strong>Phone:</strong> <a href={`tel:${agent.phone}`}>{agent.phone}</a>
          </p>
          <p>
            <strong>Email:</strong> <a href={`mailto:${agent.email}`}>{agent.email}</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AgentsSection() {
  const [agentsCurrentSlide, setAgentsCurrentSlide] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)

  // Animation hooks
  const [titleRef, titleVisible] = useScrollAnimation({ delay: 0 })
  const [sliderRef, sliderVisible] = useScrollAnimation({ delay: 200 })
  const [cardsRef, cardsVisible, getItemDelay] = useStaggeredAnimation(agents.length + 1, {
    staggerDelay: 150,
  })

  const nextAgentsSlide = () => {
    const numVisibleAgents = 2
    if (agentsCurrentSlide < agents.length - numVisibleAgents) {
      setAgentsCurrentSlide(agentsCurrentSlide + 1)
    }
  }

  const prevAgentsSlide = () => {
    if (agentsCurrentSlide > 0) {
      setAgentsCurrentSlide(agentsCurrentSlide - 1)
    }
  }

  const handleContactAgent = (agent) => {
    console.log("Contact button clicked for agent:", agent)
    setSelectedAgent(agent)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedAgent(null)
  }

  return (
    <section className="agents-section">
      <div className="agents-container">
        <h2 ref={titleRef} className={`agents-title animate-title ${titleVisible ? "visible" : ""}`}>
          Meet Our Top Agents
        </h2>
        <div ref={sliderRef} className={`agents-slider-container animate-slider ${sliderVisible ? "visible" : ""}`}>
          <div className="agents-wrapper">
            <div
              ref={cardsRef}
              className="agents-slider"
              style={{ transform: `translateX(-${agentsCurrentSlide * 280}px)` }}
            >
              {/* Sell with top agents card */}
              <div
                className={`sell-agents-card animate-card ${cardsVisible ? "visible" : ""}`}
                style={{
                  transitionDelay: `${getItemDelay(0)}ms`,
                }}
              >
                <h3 className="sell-agents-title">Sell with top agents</h3>
                <p className="sell-agents-subtitle">Skip the hustle and let the pros get things done</p>
                <button className="top-agents-btn" onClick={nextAgentsSlide}>
                  Top Agents
                </button>
              </div>

              {/* Agent cards */}
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`agent-card animate-card ${cardsVisible ? "visible" : ""}`}
                  style={{
                    transitionDelay: `${getItemDelay(index + 1)}ms`,
                  }}
                >
                  <img
                    src={agent.image || "/placeholder.svg?height=120&width=120&query=agent profile"}
                    alt={agent.name}
                    className="agent-image"
                  />
                  <div className="agent-rating">
                    <span className="rating-number">{agent.rating}</span>
                    {renderIcon("star", 16, "currentColor")}
                  </div>
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-properties">{agent.propertiesSold}</p>
                  <button className="contact-agent-btn" onClick={() => handleContactAgent(agent)}>
                    Contact
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="nav-button prev agents-prev" onClick={prevAgentsSlide} disabled={agentsCurrentSlide === 0}>
            {renderIcon("chevron-left", 20)}
          </button>

          <button
            className="nav-button next agents-next"
            onClick={nextAgentsSlide}
            disabled={agentsCurrentSlide >= agents.length - 2}
          >
            {renderIcon("chevron-right", 20)}
          </button>
        </div>
      </div>

      {/* Agent Detail Modal */}
      {showModal && <AgentDetailModal agent={selectedAgent} onClose={handleCloseModal} />}
    </section>
  )
}
