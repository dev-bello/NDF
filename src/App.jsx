import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Blog from "./components/Blog";
import UnderConstruction from "./components/UnderConstruction";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home"); // home, login, signup, blog, forum, user-dashboard, admin-dashboard
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setView(userData.role === "admin" ? "admin-dashboard" : "user-dashboard");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setView(userData.role === "admin" ? "admin-dashboard" : "user-dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setView("home");
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setView("user-dashboard");
  };

  const renderContent = () => {
    switch (view) {
      case "login":
        return (
          <div className="page-container">
            <Login
              onLogin={handleLogin}
              onSwitchToSignUp={() => setView("signup")}
            />
          </div>
        );
      case "signup":
        return (
          <div className="page-container">
            <SignUp
              onSignUp={handleSignUp}
              onSwitchToLogin={() => setView("login")}
            />
          </div>
        );
      case "user-dashboard":
        return <UserDashboard user={user} onLogout={handleLogout} />;
      case "admin-dashboard":
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case "blog":
        return <Blog onBack={() => setView("home")} />;
      case "forum":
        return (
          <div className="page-container">
            <UnderConstruction onBack={() => setView("home")} />
          </div>
        );
      default:
        return (
          <>
            <Hero onNavigate={setView} />
            <About />
            <Objectives />
            <Leadership />
            <Directorates />
            <Technology />
            <Join onNavigate={setView} />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar
        isScrolled={isScrolled}
        onNavigate={setView}
        user={user}
        onLogout={handleLogout}
      />
      <main>{renderContent()}</main>
      {view === "home" && <Footer />}
    </div>
  );
};

const Navbar = ({ isScrolled, onNavigate, user, onLogout }) => (
  <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
    <div className="nav-container">
      <div className="nav-logo" onClick={() => onNavigate("home")}>
        <img src="/NDF_logo.jpg" alt="NDF Logo" />
        <h3>Northern Development Forum</h3>
      </div>
      <div className="nav-links">
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("blog")}>Blog</button>
        <button onClick={() => onNavigate("forum")}>Forum</button>
        {user ? (
          <>
            <button
              onClick={() =>
                onNavigate(
                  user.role === "admin" ? "admin-dashboard" : "user-dashboard"
                )
              }
            >
              Dashboard
            </button>
            <button onClick={onLogout} className="cta-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onNavigate("login")}>Login</button>
            <button onClick={() => onNavigate("signup")} className="cta-button">
              Register
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

const Hero = ({ onNavigate }) => (
  <section className="hero">
    <div className="hero-background"></div>
    <div className="hero-content container">
      <div className="hero-text">
        <h1 className="hero-title">
          Empowering the North, <span className="highlight">Together</span>
        </h1>
        <p className="hero-subtitle">
          The Northern Development Forum (NDF) is a non-profit organization
          dedicated to the sustainable development and empowerment of
          communities across Northern Nigeria.
        </p>
        <div className="hero-buttons">
          <button onClick={() => onNavigate("signup")} className="btn-primary">
            Join the Movement
          </button>
          <button onClick={() => onNavigate("blog")} className="btn-secondary">
            Read Our Blog
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About NDF</h3>
          <p>
            The Northern Development Forum is committed to fostering unity,
            progress, and sustainable development across all communities in
            Northern Nigeria.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Forum</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="#" className="social-link">
              Facebook
            </a>
            <a href="#" className="social-link">
              Twitter
            </a>
            <a href="#" className="social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Northern Development Forum. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

const About = () => (
  <section id="about" className="about container">
    <div className="section-header">
      <h2>About The Forum</h2>
      <p>
        Uniting for progress, the NDF is a non-partisan platform dedicated to
        the sustainable development and empowerment of communities across
        Northern Nigeria.
      </p>
    </div>
    <div className="about-grid">
      <div className="about-text">
        <h3>Our Vision & Mission</h3>
        <p>
          To be the foremost catalyst for sustainable development, unity, and
          prosperity in Northern Nigeria, creating a future where every
          community thrives.
        </p>
        <p>
          Our mission is to foster collaboration, drive socio-economic
          initiatives, and advocate for policies that empower the people of the
          North, ensuring equitable growth and lasting peace.
        </p>
      </div>
      <div className="about-features">
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h4>Unity & Collaboration</h4>
          <p>
            We bridge gaps between communities, leaders, and stakeholders to
            foster a united front for regional development.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h4>Socio-Economic Growth</h4>
          <p>
            We champion initiatives in education, healthcare, agriculture, and
            technology to create opportunities and improve livelihoods.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📢</div>
          <h4>Advocacy & Policy</h4>
          <p>
            We engage with policymakers to ensure the needs and aspirations of
            Northern communities are reflected in national development plans.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Objectives = () => (
  <section id="objectives" className="objectives container">
    <div className="section-header">
      <h2>Our Core Objectives</h2>
      <p>
        Guided by a commitment to tangible impact, we focus on key areas that
        are critical for the region's transformation.
      </p>
    </div>
    <div className="objectives-grid">
      <div className="objective-card">
        <div className="objective-number">01</div>
        <h3>Human Capital Development</h3>
        <p>
          Investing in education, skills acquisition, and healthcare to unlock
          the full potential of our people.
        </p>
      </div>
      <div className="objective-card">
        <div className="objective-number">02</div>
        <h3>Economic Empowerment</h3>
        <p>
          Promoting entrepreneurship, modernizing agriculture, and attracting
          investment to create a vibrant and resilient economy.
        </p>
      </div>
      <div className="objective-card">
        <div className="objective-number">03</div>
        <h3>Infrastructure & Technology</h3>
        <p>
          Advocating for and supporting the development of critical
          infrastructure and the adoption of technology to drive progress.
        </p>
      </div>
      <div className="objective-card">
        <div className="objective-number">04</div>
        <h3>Peace & Security</h3>
        <p>
          Fostering dialogue and community-led initiatives to address security
          challenges and promote lasting peace.
        </p>
      </div>
      <div className="objective-card">
        <div className="objective-number">05</div>
        <h3>Good Governance</h3>
        <p>
          Encouraging transparency, accountability, and inclusive participation
          in governance at all levels.
        </p>
      </div>
      <div className="objective-card">
        <div className="objective-number">06</div>
        <h3>Cultural Preservation</h3>
        <p>
          Celebrating and preserving the rich cultural heritage of Northern
          Nigeria as a foundation for unity and identity.
        </p>
      </div>
    </div>
  </section>
);

const Leadership = () => (
  <section id="leadership" className="leadership container">
    <div className="section-header">
      <h2>Our Leadership Structure</h2>
      <p>
        A multi-tiered, community-centric governance model ensures grassroots
        participation and effective coordination.
      </p>
    </div>
    <div className="leadership-structure">
      <div className="level-card regional">
        <h3>Regional Executive Council</h3>
        <p>Oversees the overall strategy and direction of the Forum.</p>
      </div>
      <div className="level-card state">
        <h3>State Chapters</h3>
        <p>Coordinates activities and initiatives within each state.</p>
      </div>
      <div className="level-card local">
        <h3>LGA Coordinations</h3>
        <p>Manages local-level projects and community engagement.</p>
      </div>
      <div className="level-card ward">
        <h3>Ward Representatives</h3>
        <p>Acts as the primary link between the Forum and the communities.</p>
      </div>
      <div className="level-card community">
        <h3>Community Leaders</h3>
        <p>Drives progress at the very heart of our operations.</p>
      </div>
    </div>
    <div className="leadership-principles">
      <h3>Guiding Principles</h3>
      <div className="principles-grid">
        <div className="principle">
          <h4>Inclusivity</h4>
          <p>
            Every voice matters, from the village square to the state house.
          </p>
        </div>
        <div className="principle">
          <h4>Transparency</h4>
          <p>Openness and accountability in all our dealings.</p>
        </div>
        <div className="principle">
          <h4>Collaboration</h4>
          <p>Partnership with government, private sector, and CSOs.</p>
        </div>
        <div className="principle">
          <h4>Sustainability</h4>
          <p>Creating solutions that stand the test of time.</p>
        </div>
      </div>
    </div>
  </section>
);

const Directorates = () => (
  <section id="directorates" className="directorates container">
    <div className="section-header">
      <h2>Our Directorates</h2>
      <p>
        Specialized teams driving focused action in critical development areas.
      </p>
    </div>
    <div className="directorates-grid">
      <div className="directorate-card">
        <div className="directorate-icon">📚</div>
        <h3>Education & Human Capital</h3>
        <p>
          Focused on improving access to quality education and vocational
          training.
        </p>
      </div>
      <div className="directorate-card">
        <div className="directorate-icon">💼</div>
        <h3>Economic Development & Investment</h3>
        <p>
          Dedicated to fostering entrepreneurship and attracting investment.
        </p>
      </div>
      <div className="directorate-card">
        <div className="directorate-icon">🌱</div>
        <h3>Agriculture & Food Security</h3>
        <p>
          Working to modernize agricultural practices and ensure food security.
        </p>
      </div>
      <div className="directorate-card">
        <div className="directorate-icon">💻</div>
        <h3>Science & Technology</h3>
        <p>
          Promoting digital literacy and the adoption of innovative
          technologies.
        </p>
      </div>
      <div className="directorate-card">
        <div className="directorate-icon">🕊️</div>
        <h3>Peace, Security & Reconciliation</h3>
        <p>
          Building bridges and fostering dialogue for a more peaceful region.
        </p>
      </div>
      <div className="directorate-card">
        <div className="directorate-icon">🏛️</div>
        <h3>Governance & Strategy</h3>
        <p>Ensuring effective planning, execution, and accountability.</p>
      </div>
    </div>
  </section>
);

const Technology = () => (
  <section id="technology" className="technology container">
    <div className="section-header">
      <h2>Leveraging Technology for Impact</h2>
      <p>
        Our digital platform is the backbone of our operations, enabling
        seamless coordination and transparent communication.
      </p>
    </div>
    <div className="technology-grid">
      <div className="tech-feature">
        <h3>The NDF Digital Platform</h3>
        <p>
          A comprehensive mobile and web application designed to connect our
          members, manage projects, and disseminate information effectively.
        </p>
        <ul>
          <li>Member Registration & Management</li>
          <li>Real-time Communication Channels</li>
          <li>Project & Task Management</li>
          <li>Data Collection & Analytics</li>
          <li>Resource Sharing & Collaboration</li>
        </ul>
      </div>
      <div className="tech-feature">
        <h3>Data-Driven Development</h3>
        <p>
          We utilize technology to gather and analyze data, ensuring our
          interventions are evidence-based and impactful.
        </p>
        <ul>
          <li>Community Needs Assessment Surveys</li>
          <li>Project Impact Tracking</li>
          <li>Demographic & Economic Data Analysis</li>
          <li>GIS Mapping of Projects & Resources</li>
          <li>Transparent Reporting Dashboards</li>
        </ul>
      </div>
    </div>
  </section>
);

const Join = ({ onNavigate }) => (
  <section id="join" className="join">
    <div className="join-content container">
      <h2>Become a Part of the Solution</h2>
      <p>
        Your skills, passion, and commitment can make a real difference. Join us
        in building a brighter future for Northern Nigeria.
      </p>
      <div className="join-stats">
        <div className="join-stat">
          <h3>19</h3>
          <p>States</p>
        </div>
        <div className="join-stat">
          <h3>419</h3>
          <p>LGAs</p>
        </div>
        <div className="join-stat">
          <h3>10,000+</h3>
          <p>Communities</p>
        </div>
      </div>
      <div className="join-buttons">
        <button onClick={() => onNavigate("signup")} className="btn-primary">
          Register as a Member
        </button>
        <button onClick={() => onNavigate("forum")} className="btn-secondary">
          Join the Conversation
        </button>
      </div>
    </div>
  </section>
);

export default App;
