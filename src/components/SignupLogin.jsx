import React, { useState } from 'react'
import './SignupLogin.css'

const SignupLogin = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    lga: '',
    ward: '',
    community: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const nigerianStates = [
    'Benue', 'Plateau', 'Nasarawa', 'Kogi', 'Kwara', 'Niger', 'Kaduna', 'Taraba', 'Adamawa', 'Gombe', 'Bauchi'
  ]

  return (
    <div className="signup-login-container">
      <div className="signup-login-background"></div>
      
      <div className="signup-login-content">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>

        <div className="auth-card">
          <div className="auth-header">
            <img src="/NDF_logo copy.jpg" alt="NDF Logo" className="auth-logo" />
            <h2>{isLogin ? 'Welcome Back' : 'Join the Forum'}</h2>
            <p>{isLogin ? 'Sign in to your account' : 'Register as a member of the Northern Development Forum'}</p>
          </div>

          <div className="auth-toggle">
            <button 
              className={isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? 'active' : ''} 
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 xxx xxx xxxx"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select State</option>
                      {nigerianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Local Government Area</label>
                    <input
                      type="text"
                      name="lga"
                      value={formData.lga}
                      onChange={handleInputChange}
                      placeholder="Enter your LGA"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ward</label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      placeholder="Enter your ward"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Community</label>
                  <input
                    type="text"
                    name="community"
                    value={formData.community}
                    onChange={handleInputChange}
                    placeholder="Enter your community"
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Sign In' : 'Register Now'}
            </button>

            {isLogin && (
              <div className="auth-links">
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
            )}
          </form>

          {!isLogin && (
            <div className="terms-notice">
              <p>By registering, you agree to our Terms of Service and Privacy Policy. 
              You'll be added to the forum's communication channels for updates and participation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupLogin