// app/home/components/AgentsSection.jsx
"use client"

import { useState } from "react"
import { agents } from "../../utils/dummyData" // Corrected import path for agents
import { renderIcon } from "../utils"

// Basic Modal Component (can be moved to a separate file if it grows)
const AgentDetailModal = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <div className="agent-modal-overlay" onClick={onClose}>
      <div className="agent-modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <button className="agent-modal-close" onClick={onClose}>
          {renderIcon("x", 24)} {/* Assuming 'x' icon is available or use a simple 'X' */}
        </button>
        <img src={agent.image || "/placeholder.svg"} alt={agent.name} className="modal-agent-image" />
        <h2>{agent.name}</h2>
        <p className="modal-agent-rating">
          <span className="rating-number">{agent.rating}</span>
          {renderIcon("star", 16, "currentColor")}
        </p>
        <p className="modal-agent-properties">{agent.propertiesSold}</p>
        <p className="modal-agent-bio">{agent.bio}</p>
        <div className="modal-contact-info">
          <p><strong>Phone:</strong> <a href={`tel:${agent.phone}`}>{agent.phone}</a></p>
          <p><strong>Email:</strong> <a href={`mailto:${agent.email}`}>{agent.email}</a></p>
        </div>
      </div>
    </div>
  );
};


export default function AgentsSection() {
  const [agentsCurrentSlide, setAgentsCurrentSlide] = useState(0)
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedAgent, setSelectedAgent] = useState(null); // State to store agent data for modal

  const nextAgentsSlide = () => {
    // Determine how many agent cards are visible based on the 280px translation.
    // If each card is 280px wide and there's no gap, and the container shows 'x' cards.
    // The '2' in `agents.length - 2` implies 2 cards are always visible. Adjust if your layout differs.
    const numVisibleAgents = 2; // Assuming 2 agents are fully visible at all times
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
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAgent(null); // Clear selected agent on close
  };

  return (
    <section className="agents-section">
      <div className="agents-container">
        <h2 className="agents-title">Meet Our Top Agents</h2> {/* Changed title for better context */}
        <div className="agents-slider-container">
          <div className="agents-wrapper">
            <div className="agents-slider" style={{ transform: `translateX(-${agentsCurrentSlide * 280}px)` }}>
              {/* Sell with top agents card (remains static) */}
              <div className="sell-agents-card">
                <h3 className="sell-agents-title">Sell with top agents</h3>
                <p className="sell-agents-subtitle">Skip the hustle and let the pros get things done</p>
                <button className="top-agents-btn">Top Agents</button>
              </div>

              {/* Agent cards */}
              {agents.map((agent) => (
                <div key={agent.id} className="agent-card">
                  <img src={agent.image || "/placeholder.svg"} alt={agent.name} className="agent-image" />
                  <div className="agent-rating">
                    <span className="rating-number">{agent.rating}</span>
                    {renderIcon("star", 16, "currentColor")}
                  </div>
                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-properties">{agent.propertiesSold}</p>
                  <button className="contact-agent-btn" onClick={() => handleContactAgent(agent)}>Contact</button>
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
            disabled={agentsCurrentSlide >= agents.length - 2} // Assuming 2 agents visible
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