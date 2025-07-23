import "../styles/AgentSection.css"

export default function AgentCard({
  agents,
  cardsVisible,
  getItemDelay,
  renderIcon,
  handleContactAgent,
}) {
  return (
    <>
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
    </>
  )
}