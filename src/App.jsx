import React, { useState, useEffect } from 'react'
import SignupLogin from './components/SignupLogin'
import UnderConstruction from './components/UnderConstruction'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
    setActiveSection(sectionId)
  }

  const handleRegisterClick = () => {
    setCurrentPage('signup')
  }

  const handleMobileAppClick = () => {
    setCurrentPage('construction')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  if (currentPage === 'signup') {
    return <SignupLogin onBack={handleBackToHome} />
  }

  if (currentPage === 'construction') {
    return <UnderConstruction onBack={handleBackToHome} />
  }
  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/NDF_logo.jpg" alt="Northern Development Forum Logo" />
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</button>
            <button onClick={() => scrollToSection('objectives')} className={activeSection === 'objectives' ? 'active' : ''}>Objectives</button>
            <button onClick={() => scrollToSection('leadership')} className={activeSection === 'leadership' ? 'active' : ''}>Leadership</button>
            <button onClick={() => scrollToSection('technology')} className={activeSection === 'technology' ? 'active' : ''}>Technology</button>
            <button onClick={() => scrollToSection('join')} className="cta-button">Join Forum</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Building Unity Through
              <span className="highlight"> Regional Development</span>
            </h1>
            <p className="hero-subtitle">
              The Northern Development Forum is a comprehensive regional platform designed to bridge ethnic divides, 
              promote inclusive governance, and serve as the trusted voice of our diverse communities.
            </p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('about')} className="btn-primary">
                Learn More
              </button>
              <button onClick={handleRegisterClick} className="btn-secondary">
                Join the Movement
              </button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <h3>5 Levels</h3>
              <p>Leadership Structure</p>
            </div>
            <div className="stat-card">
              <h3>Unity</h3>
              <p>Across All Ethnicities</p>
            </div>
            <div className="stat-card">
              <h3>Real-time</h3>
              <p>Community Feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>About the Forum</h2>
            <p>Addressing historical distrust and building a stronger, unified region</p>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <h3>Our Foundation</h3>
              <p>
                The Northern Development Forum was conceived to address the historical factors that have caused 
                distrust and suspicion among different ethnic groups across our region. Learning from the 
                experiences of the Middle Belt Forum of old, we've designed a more inclusive and comprehensive approach.
              </p>
              <h3>Our Structure</h3>
              <p>
                We operate through a robust dual structure: a strong community-based foundation that directly 
                engages with grassroots concerns, and a regional framework that interfaces with policy makers 
                at the federal level to secure the best outcomes for our region.
              </p>
            </div>
            <div className="about-features">
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h4>Unity & Inclusion</h4>
                <p>Bringing together all ethnicities, religions, and political affiliations under one unified voice</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏛️</div>
                <h4>Policy Interface</h4>
                <p>Direct engagement with government at all levels for effective policy analysis and implementation</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h4>Technology-Driven</h4>
                <p>Modern platforms for registration, communication, and transparent financial management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="objectives">
        <div className="container">
          <div className="section-header">
            <h2>Aims & Objectives</h2>
            <p>Our mission to serve as the bridge between the people and governance</p>
          </div>
          <div className="objectives-grid">
            <div className="objective-card">
              <div className="objective-number">01</div>
              <h3>Policy Design & Advisory</h3>
              <p>
                Design and suggest comprehensive policies to government based on the unique 
                peculiarities and specific needs of our region, ensuring local context drives policy formation.
              </p>
            </div>
            <div className="objective-card">
              <div className="objective-number">02</div>
              <h3>Government Interface</h3>
              <p>
                Interface with government at all levels to analyze policies, programs, and bills, 
                ensuring seamless implementation through quality monitoring and constructive feedback.
              </p>
            </div>
            <div className="objective-card">
              <div className="objective-number">03</div>
              <h3>People's Voice & Information Hub</h3>
              <p>
                Serve as the trusted forum for accurate information dissemination to the people 
                while providing a platform for citizens to voice their opinions on government activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Structure */}
      <section id="leadership" className="leadership">
        <div className="container">
          <div className="section-header">
            <h2>Leadership Structure</h2>
            <p>Five-tier democratic governance ensuring representation at every level</p>
          </div>
          <div className="leadership-structure">
            <div className="level-card regional">
              <h3>Regional Level</h3>
              <p>Overarching coordination and federal government interface</p>
            </div>
            <div className="level-card state">
              <h3>State Level</h3>
              <p>State-specific policy implementation and coordination</p>
            </div>
            <div className="level-card local">
              <h3>Local Government Level</h3>
              <p>Grassroots policy execution and community liaison</p>
            </div>
            <div className="level-card ward">
              <h3>Ward Level</h3>
              <p>Direct community representation and local issues</p>
            </div>
            <div className="level-card community">
              <h3>Community Level</h3>
              <p>Core activities hub: project monitoring, voting, and real-time feedback</p>
            </div>
          </div>
          
          <div className="leadership-principles">
            <h3>Leadership Principles</h3>
            <div className="principles-grid">
              <div className="principle">
                <h4>🔄 Rotational Leadership</h4>
                <p>Leadership positions rotate among states to ensure equitable representation</p>
              </div>
              <div className="principle">
                <h4>🤲 Religious Inclusion</h4>
                <p>Dedicated representation from both JNI (Muslim) and CAN (Christian) organizations</p>
              </div>
              <div className="principle">
                <h4>🏛️ Political Balance</h4>
                <p>Clear representation from all major political parties in leadership committees</p>
              </div>
              <div className="principle">
                <h4>📱 Digital Democracy</h4>
                <p>Elections conducted through secure encrypted platforms like WhatsApp and Telegram</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directorates */}
      <section id="directorates" className="directorates">
        <div className="container">
          <div className="section-header">
            <h2>Specialized Directorates</h2>
            <p>Expert-led committees matching key economic sectors</p>
          </div>
          <div className="directorates-grid">
            <div className="directorate-card">
              <div className="directorate-icon">🌾</div>
              <h3>Agriculture</h3>
              <p>Advancing farming technologies, crop production, and rural development initiatives</p>
            </div>
            <div className="directorate-card">
              <div className="directorate-icon">🏭</div>
              <h3>Industries</h3>
              <p>Promoting industrial growth, manufacturing, and economic diversification</p>
            </div>
            <div className="directorate-card">
              <div className="directorate-icon">⚡</div>
              <h3>Power & Energy</h3>
              <p>Ensuring reliable power supply and sustainable energy solutions</p>
            </div>
            <div className="directorate-card">
              <div className="directorate-icon">🛣️</div>
              <h3>Infrastructure & Works</h3>
              <p>Overseeing roads, bridges, and critical infrastructure development</p>
            </div>
            <div className="directorate-card">
              <div className="directorate-icon">🎓</div>
              <h3>Education</h3>
              <p>Advancing educational policies and institutional development</p>
            </div>
            <div className="directorate-card">
              <div className="directorate-icon">🏥</div>
              <h3>Healthcare</h3>
              <p>Improving healthcare delivery and medical infrastructure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="technology">
        <div className="container">
          <div className="section-header">
            <h2>Technology & Transparency</h2>
            <p>Modern solutions for democratic participation and financial accountability</p>
          </div>
          <div className="technology-grid">
            <div className="tech-feature">
              <h3>📱 Mobile Application</h3>
              <p>
                A comprehensive mobile app for member registration that seamlessly integrates 
                all participants with forum social media handles and provides real-time 
                information dissemination and feedback collection.
              </p>
              <ul>
                <li>Easy member registration and verification</li>
                <li>Direct integration with social media platforms</li>
                <li>Real-time notifications and updates</li>
                <li>Community polling and voting features</li>
              </ul>
            </div>
            <div className="tech-feature">
              <h3>💰 Financial Transparency System</h3>
              <p>
                A specialized application providing real-time visibility into all financial 
                transactions, addressing concerns about fund mismanagement and building 
                community confidence.
              </p>
              <ul>
                <li>Real-time transaction monitoring</li>
                <li>Donor identification and purpose tracking</li>
                <li>Expenditure transparency with justifications</li>
                <li>Automated financial reporting</li>
              </ul>
            </div>
            <div className="tech-feature">
              <h3>🔐 Secure Communication</h3>
              <p>
                Encrypted platforms for leadership elections and critical decision-making, 
                ensuring democratic participation while maintaining security and integrity.
              </p>
              <ul>
                <li>WhatsApp and Telegram integration</li>
                <li>Encrypted voting mechanisms</li>
                <li>Multi-level approval workflows</li>
                <li>Secure document sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="join" className="join">
        <div className="container">
          <div className="join-content">
            <h2>Join the Northern Development Forum</h2>
            <p>
              Be part of the movement that's reshaping our region's future. Together, we can build 
              a more unified, prosperous, and equitable Northern Nigeria.
            </p>
            <div className="join-stats">
              <div className="join-stat">
                <h3>United</h3>
                <p>All Ethnicities & Religions</p>
              </div>
              <div className="join-stat">
                <h3>Transparent</h3>
                <p>Real-time Financial Tracking</p>
              </div>
              <div className="join-stat">
                <h3>Democratic</h3>
                <p>Community-driven Decisions</p>
              </div>
            </div>
            <div className="join-buttons">
              <button onClick={handleRegisterClick} className="btn-primary large">Register as Member</button>
              <button onClick={handleMobileAppClick} className="btn-secondary large">Download Mobile App</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Northern Development Forum</h3>
              <p>Building unity through inclusive regional development and democratic governance.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#objectives">Our Objectives</a></li>
                <li><a href="#leadership">Leadership</a></li>
                <li><a href="#technology">Technology</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@northerndevelopmentforum.ng</p>
              <p>Phone: +234 (0) 123 456 7890</p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">WhatsApp</a>
                <a href="#" className="social-link">Telegram</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Northern Development Forum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App