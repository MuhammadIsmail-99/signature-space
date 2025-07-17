// app/property-details/components/AgentCard.jsx
import { renderIcon } from "../../utils/renderIcon";

export default function AgentCard({ agent }) {
  if (!agent) return null;

  return (
    <div className="card agent-card">
      <div className="profile-image-container">
        <img
          src={agent.profileImage || require("../../assets/logo.png")}
          alt={agent.name}
          width={80}
          height={80}
          className="profile-image"
        />
        {/* Changed icon to "ShieldCheck" and adjusted badge class */}
        {agent.isSuperhost && <div className="verified-shield-badge">{renderIcon("ShieldCheck")}</div>}
      </div>
      <h3 className="agent-name">{agent.name}</h3>
      {agent.isSuperhost && (
        <p className="superhost-tag">
          {/* Changed icon to "Coffee" to represent the Superhost icon in the image */}
          {renderIcon("Coffee")} Superhost
        </p>
      )}
      <div className="agent-stats">
        <div className="stat-item">
          <div className="stat-value">{agent.reviewsCount}</div>
          <span className="stat-label">Reviews</span>
        </div>
        <div className="stat-item">
          {/* Rating value and star together */}
          <div className="stat-value">
            {agent.rating} <span className="rating-star">{renderIcon("Star")}</span>
          </div>
          <span className="stat-label">Rating</span>
        </div>
        <div className="stat-item">
          <div className="stat-value">{agent.yearsHosting}</div>
          <span className="stat-label">Year hosting</span> {/* Changed to singular "Year hosting" */}
        </div>
      </div>
    </div>
  );
}