import React, { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { hygraph, hygraphRW } from "../utils/hygraph";
import BlogManager from "./admin/BlogManager";
import ForumManager from "./admin/ForumManager";
import "./AdminDashboard.css";

const AdminDashboard = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { members } = await hygraph.request(
          `
            query GetDashboardData {
              members {
                id
                fullName
                email
                phone
                state
                lga
                ward
                community
                createdAt
                status
              }
            }
          `
        );
        setUsers(members);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await hygraphRW.request(
        `
          mutation DeleteMember($id: ID!) {
            deleteMember(where: {id: $id}) {
              id
            }
          }
        `,
        { id: userId }
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleDeleteCommunity = async (communityId) => {
    try {
      await hygraphRW.request(
        `
          mutation DeleteCommunity($id: ID!) {
            deleteCommunity(where: {id: $id}) {
              id
            }
          }
        `,
        { id: communityId }
      );
      setCommunities(
        communities.filter((community) => community.id !== communityId)
      );
    } catch (error) {
      console.error("Failed to delete community", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalType("editUser");
    setShowModal(true);
  };

  const handleEditCommunity = (community) => {
    setSelectedCommunity(community);
    setModalType("editCommunity");
    setShowModal(true);
  };

  const handleAddNew = (type) => {
    setModalType(type);
    setSelectedUser(null);
    setSelectedCommunity(null);
    setShowModal(true);
  };

  const getTotalStats = () => {
    return {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.status === "active").length,
      pendingUsers: users.filter((u) => u.status === "pending").length,
      totalCommunities: [...new Set(users.map((u) => u.community))].length,
      totalStates: [...new Set(users.map((u) => u.state))].length,
      totalLgas: [...new Set(users.map((u) => u.lga))].length,
    };
  };

  const stats = getTotalStats();

  const renderOverview = () => (
    <div className="overview-section">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Members</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.activeUsers}</h3>
            <p>Active Members</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pendingUsers}</h3>
            <p>Pending Approval</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏘️</div>
          <div className="stat-content">
            <h3>{stats.totalCommunities}</h3>
            <p>Communities</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🗺️</div>
          <div className="stat-content">
            <h3>{stats.totalStates}</h3>
            <p>States</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📍</div>
          <div className="stat-content">
            <h3>{stats.totalLgas}</h3>
            <p>LGAs</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {/* This will be replaced with dynamic data */}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-section">
      <div className="section-header">
        <h3>Manage Members</h3>
        <button className="add-btn" onClick={() => handleAddNew("addUser")}>
          + Add Member
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {user.community}, {user.lga}, {user.state}
                </td>
                <td>
                  <span className={`status ${user.status}`}>{user.status}</span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCommunities = () => (
    <div className="communities-section">
      <div className="section-header">
        <h3>Manage Communities</h3>
        <button
          className="add-btn"
          onClick={() => handleAddNew("addCommunity")}
        >
          + Add Community
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Community Name</th>
              <th>Location</th>
              <th>Population</th>
              <th>Registered Members</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community) => (
              <tr key={community.id}>
                <td>{community.name}</td>
                <td>
                  {community.ward}, {community.lga}, {community.state}
                </td>
                <td>{community.population.toLocaleString()}</td>
                <td>{community.registeredMembers}</td>
                <td>
                  <span className={`status ${community.status}`}>
                    {community.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditCommunity(community)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCommunity(community.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStates = () => (
    <div className="states-section">
      <div className="section-header">
        <h3>States Overview</h3>
      </div>
      <div className="states-grid">
        {states.map((state) => (
          <div key={state.id} className="state-card">
            <h4>{state.name} State</h4>
            <div className="state-stats">
              <div className="state-stat">
                <span className="stat-number">{state.lgas}</span>
                <span className="stat-label">LGAs</span>
              </div>
              <div className="state-stat">
                <span className="stat-number">{state.communities}</span>
                <span className="stat-label">Communities</span>
              </div>
              <div className="state-stat">
                <span className="stat-number">{state.members}</span>
                <span className="stat-label">Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLgas = () => (
    <div className="lgas-section">
      <div className="section-header">
        <h3>Local Government Areas</h3>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>LGA Name</th>
              <th>State</th>
              <th>Communities</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lgas.map((lga) => (
              <tr key={lga.id}>
                <td>{lga.name}</td>
                <td>{lga.state}</td>
                <td>{lga.communities}</td>
                <td>{lga.members}</td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">View Details</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-background"></div>

      <div className="admin-content">
        <div className="admin-header">
          <div className="admin-title">
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user.fullName}!</p>
          </div>
          <div className="admin-actions">
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="admin-nav">
          <button
            className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`nav-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Members
          </button>
          <button
            className={`nav-tab ${activeTab === "communities" ? "active" : ""}`}
            onClick={() => setActiveTab("communities")}
          >
            🏘️ Communities
          </button>
          <button
            className={`nav-tab ${activeTab === "states" ? "active" : ""}`}
            onClick={() => setActiveTab("states")}
          >
            🗺️ States
          </button>
          <button
            className={`nav-tab ${activeTab === "lgas" ? "active" : ""}`}
            onClick={() => setActiveTab("lgas")}
          >
            📍 LGAs
          </button>
          <button
            className={`nav-tab ${activeTab === "blog" ? "active" : ""}`}
            onClick={() => setActiveTab("blog")}
          >
            📝 Blog
          </button>
          <button
            className={`nav-tab ${activeTab === "forum" ? "active" : ""}`}
            onClick={() => setActiveTab("forum")}
          >
            💬 Forum
          </button>
        </div>

        <div className="admin-main">
          {loading && <div className="loading-spinner">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && (
            <>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "users" && renderUsers()}
              {activeTab === "communities" && renderCommunities()}
              {activeTab === "states" && renderStates()}
              {activeTab === "lgas" && renderLgas()}
              {activeTab === "blog" && <BlogManager />}
              {activeTab === "forum" && <ForumManager />}
            </>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit operations */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalType === "addUser" && "Add New Member"}
                {modalType === "editUser" && "Edit Member"}
                {modalType === "addCommunity" && "Add New Community"}
                {modalType === "editCommunity" && "Edit Community"}
              </h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Modal form would go here for {modalType}</p>
              {/* Form implementation would go here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
