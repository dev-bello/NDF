import React, { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { hygraph } from "../utils/hygraph";
import "./UserDashboard.css";

const UserDashboard = ({ onBack, onLogout, user }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState(user);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userProfile });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const { member } = await hygraph.request(
            `
              query GetUserDashboardData($id: ID!) {
                member(where: {id: $id}) {
                  id
                  fullName
                  email
                  phone
                  state
                  lga
                  ward
                  community
                  notifications {
                    id
                    title
                    message
                    date
                    type
                    read
                  }
                  projects {
                    id
                    title
                    description
                    status
                    progress
                    budget
                    startDate
                  }
                }
              }
            `,
            { id: user.id }
          );
          setUserProfile(member);
          setNotifications(member.notifications);
          setProjects(member.projects);

          if (member.community) {
            const { community } = await hygraph.request(
              `
                query GetCommunityInfo($name: String!) {
                  community(where: {name: $name}) {
                    name
                    population
                    registeredMembers
                    projects
                    lastMeeting
                  }
                }
              `,
              { name: member.community }
            );
            setCommunityInfo(community);
          }
        } catch (err) {
          setError("Failed to fetch dashboard data.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditForm({ ...userProfile });
  };

  const handleSaveProfile = async () => {
    try {
      const { updateMember } = await hygraph.request(
        `
          mutation UpdateMember($id: ID!, $data: MemberUpdateInput!) {
            updateMember(where: {id: $id}, data: $data) {
              id
              fullName
              email
              phone
              state
              lga
              ward
              community
            }
          }
        `,
        {
          id: userProfile.id,
          data: {
            fullName: editForm.fullName,
            email: editForm.email,
            phone: editForm.phone,
            state: editForm.state,
            lga: editForm.lga,
            ward: editForm.ward,
            community: editForm.community,
          },
        }
      );
      setUserProfile(updateMember);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({ ...userProfile });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "meeting":
        return "📅";
      case "project":
        return "🏗️";
      case "update":
        return "📢";
      default:
        return "📝";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "var(--primary-green)";
      case "in progress":
        return "#fbbf24";
      case "planning":
        return "#60a5fa";
      default:
        return "var(--gray-400)";
    }
  };

  const renderProfile = () => (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {userProfile.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="profile-info">
            <h3>{userProfile.fullName}</h3>
            <span className={`status-badge ${userProfile.status}`}>
              {userProfile.status}
            </span>
          </div>
        </div>
        <button
          className="edit-profile-btn"
          onClick={isEditing ? handleSaveProfile : handleEditProfile}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
        {isEditing && (
          <button className="cancel-btn" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </div>

      <div className="profile-details">
        <div className="detail-grid">
          <div className="detail-item">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editForm.fullName}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{userProfile.fullName}</span>
            )}
          </div>

          <div className="detail-item">
            <label>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{userProfile.email}</span>
            )}
          </div>

          <div className="detail-item">
            <label>Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editForm.phone}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{userProfile.phone}</span>
            )}
          </div>

          <div className="detail-item">
            <label>State</label>
            {isEditing ? (
              <input
                type="text"
                name="state"
                value={editForm.state}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{userProfile.state}</span>
            )}
          </div>

          <div className="detail-item">
            <label>Local Government Area</label>
            {isEditing ? (
              <input
                type="text"
                name="lga"
                value={editForm.lga}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{userProfile.lga}</span>
            )}
          </div>

          <div className="detail-item">
            <label>Ward</label>
            {isEditing ? (
              <input
                type="text"
                name="ward"
                value={editForm.ward}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{userProfile.ward}</span>
            )}
          </div>

          <div className="detail-item">
            <label>Community</label>
            {isEditing ? (
              <input
                type="text"
                name="community"
                value={editForm.community}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{userProfile.community}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="community-section">
      <div className="community-header">
        <h3>{communityInfo.name} Community</h3>
        <p>Your local community information and statistics</p>
      </div>

      <div className="community-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h4>{communityInfo.population.toLocaleString()}</h4>
            <p>Total Population</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h4>{communityInfo.registeredMembers}</h4>
            <p>Registered Members</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏗️</div>
          <div className="stat-content">
            <h4>{communityInfo.projects}</h4>
            <p>Active Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h4>{new Date(communityInfo.lastMeeting).toLocaleDateString()}</h4>
            <p>Last Meeting</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="notifications-section">
      <div className="section-header">
        <h3>Notifications</h3>
        <span className="notification-count">
          {notifications.filter((n) => !n.read).length} unread
        </span>
      </div>

      <div className="notifications-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${
              notification.read ? "read" : "unread"
            }`}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <span className="notification-date">
                {new Date(notification.date).toLocaleDateString()}
              </span>
            </div>
            {!notification.read && <div className="unread-indicator"></div>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="projects-section">
      <div className="section-header">
        <h3>Community Projects</h3>
        <p>Track progress of ongoing community development projects</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h4>{project.title}</h4>
              <span
                className="project-status"
                style={{ color: getStatusColor(project.status) }}
              >
                {project.status}
              </span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-progress">
              <div className="progress-header">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: getStatusColor(project.status),
                  }}
                ></div>
              </div>
            </div>

            <div className="project-details">
              <div className="project-detail">
                <span>Budget:</span>
                <span>{project.budget}</span>
              </div>
              <div className="project-detail">
                <span>Start Date:</span>
                <span>{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="user-dashboard">
      <div className="dashboard-background"></div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>My Dashboard</h1>
            <p>Welcome back, {userProfile.fullName.split(" ")[0]}!</p>
          </div>
          <div className="dashboard-actions">
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
            <button className="back-btn" onClick={onBack}>
              Back to Site
            </button>
          </div>
        </div>

        <div className="dashboard-nav">
          <button
            className={`nav-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>
          <button
            className={`nav-tab ${activeTab === "community" ? "active" : ""}`}
            onClick={() => setActiveTab("community")}
          >
            🏘️ Community
          </button>
          <button
            className={`nav-tab ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            🔔 Notifications
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="notification-badge">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
          <button
            className={`nav-tab ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            🏗️ Projects
          </button>
        </div>

        <div className="dashboard-main">
          {loading && <div className="loading-spinner">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && userProfile && (
            <>
              {activeTab === "profile" && renderProfile()}
              {activeTab === "community" && communityInfo && renderCommunity()}
              {activeTab === "notifications" && renderNotifications()}
              {activeTab === "projects" && renderProjects()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
