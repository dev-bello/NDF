import React, { useState } from "react";
import { gql } from "graphql-request";
import { hygraphRW } from "../utils/hygraph";
import "./SignUp.css";

const SignUp = ({ onSignUp, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    state: "",
    lga: "",
    ward: "",
    community: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const mutation = gql`
      mutation CreateMember(
        $fullName: String!
        $email: String!
        $password: String!
        $phone: String!
        $state: String!
        $lga: String!
        $ward: String
        $community: String
      ) {
        createMember(
          data: {
            fullName: $fullName
            email: $email
            password: $password
            phone: $phone
            state: $state
            lga: $lga
            ward: $ward
            community: $community
          }
        ) {
          id
          fullName
          email
          role
        }
      }
    `;

    const { confirmPassword, ...variables } = formData;

    try {
      const data = await hygraphRW.request(mutation, variables);
      onSignUp(data.createMember);
    } catch (err) {
      console.error(err);
      if (
        err.response &&
        err.response.errors &&
        err.response.errors.length > 0
      ) {
        setError(err.response.errors[0].message);
      } else {
        setError(
          "An unknown error occurred. Please check your details and try again."
        );
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g., John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g., johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g., 08012345678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="e.g., Kano"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lga">LGA</label>
            <input
              type="text"
              id="lga"
              name="lga"
              placeholder="e.g., Fagge"
              value={formData.lga}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ward">Ward</label>
            <input
              type="text"
              id="ward"
              name="ward"
              placeholder="e.g., Sabon Gari"
              value={formData.ward}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="community">Community</label>
            <input
              type="text"
              id="community"
              name="community"
              placeholder="e.g., Tudun Wada"
              value={formData.community}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <p className="switch-form">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
