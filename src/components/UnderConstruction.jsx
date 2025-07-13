import React from 'react'
import './UnderConstruction.css'

const progressNum = 1
const UnderConstruction = ({ onBack }) => {
  return (
    <div className="construction-container">
      <div className="construction-background"></div>
      
      <div className="construction-content">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>

        <div className="construction-card">
          <div className="construction-icon">
            <div className="gear gear-1">⚙️</div>
            <div className="gear gear-2">🔧</div>
            <div className="gear gear-3">⚙️</div>
          </div>

          <div className="construction-text">
            <h1>Mobile App Coming Soon</h1>
            <p>
              We're working hard to bring you the Northern Development Forum mobile application. 
              Our team is crafting a seamless experience for member registration, real-time 
              communication, and community engagement.
            </p>
          </div>

          <div className="features-preview">
            <h3>What to Expect</h3>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h4>Easy Registration</h4>
                <p>Quick member signup with community integration</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💬</div>
                <h4>Real-time Communication</h4>
                <p>Direct integration with WhatsApp and Telegram</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🗳️</div>
                <h4>Democratic Voting</h4>
                <p>Secure voting for leadership and key decisions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <h4>Financial Transparency</h4>
                <p>Real-time tracking of all forum transactions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h4>Project Monitoring</h4>
                <p>Track community projects and provide feedback</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔔</div>
                <h4>Instant Updates</h4>
                <p>Stay informed with push notifications</p>
              </div>
            </div>
          </div>

          <div className="notify-section">
            <h3>Get Notified When Ready</h3>
            <p>Enter your email to be the first to know when our mobile app launches</p>
            <div className="notify-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="notify-input"
              />
              <button className="notify-btn">Notify Me</button>
            </div>
          </div>

          <div className="progress-section">
            <h4>Development Progress</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${progressNum}%`}}></div>
            </div>
            <p className="progress-text">{progressNum}% Complete - Expected Launch: Q1 2026</p>
          </div>

          <div className="contact-section">
            <p>Have questions or suggestions for the mobile app?</p>
            <a href="mailto:app@northerndevelopmentforum.ng" className="contact-link">
              Contact Our Development Team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnderConstruction