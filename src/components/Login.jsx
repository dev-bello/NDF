import React, { useState } from "react";
import { gql } from "graphql-request";
import { hygraph } from "../utils/hygraph";
import "./Login.css";

const Login = ({ onLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const query = gql`
      query GetMemberByEmail($email: String!) {
        member(where: { email: $email }) {
          id
          fullName
          email
          password
          role
        }
      }
    `;

    try {
      const { member } = await hygraph.request(query, { email });

      if (member && member.password === password) {
        onLogin(member);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Failed to log in. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <p className="switch-form">
          Don't have an account?{" "}
          <button type="button" onClick={onSwitchToSignUp}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
