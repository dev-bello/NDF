import React, { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { hygraph, hygraphRW } from "../../utils/hygraph";
import "./ForumManager.css";

const ForumManager = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);

  const fetchTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { forumTopics } = await hygraph.request(
        `
          query GetForumTopics {
            forumTopics(orderBy: createdAt_DESC) {
              id
              title
              content
              createdAt
            }
          }
        `
      );
      setTopics(forumTopics);
    } catch (err) {
      setError("Failed to fetch forum topics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleAddTopic = () => {
    setIsEditing(false);
    setCurrentTopic({ title: "", content: "" });
    setShowModal(true);
  };

  const handleEditTopic = (topic) => {
    setIsEditing(true);
    setCurrentTopic(topic);
    setShowModal(true);
  };

  const handleDeleteTopic = async (topicId) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      try {
        await hygraphRW.request(
          `
            mutation DeleteForumTopic($id: ID!) {
              deleteForumTopic(where: { id: $id }) {
                id
              }
            }
          `,
          { id: topicId }
        );
        fetchTopics();
      } catch (err) {
        setError("Failed to delete topic.");
      }
    }
  };

  const handleSaveTopic = async () => {
    const { id, title, content } = currentTopic;
    const mutation = isEditing
      ? `
          mutation UpdateForumTopic($id: ID!, $data: ForumTopicUpdateInput!) {
            updateForumTopic(where: { id: $id }, data: $data) {
              id
            }
          }
        `
      : `
          mutation CreateForumTopic($data: ForumTopicCreateInput!) {
            createForumTopic(data: $data) {
              id
            }
          }
        `;

    const variables = {
      data: { title, content },
    };
    if (isEditing) {
      variables.id = id;
    }

    try {
      await hygraphRW.request(mutation, variables);
      setShowModal(false);
      fetchTopics();
    } catch (err) {
      setError("Failed to save topic.");
    }
  };

  if (loading) return <div className="loading-spinner">Loading topics...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="forum-manager">
      <div className="section-header">
        <h3>Manage Forum Topics</h3>
        <button className="add-btn" onClick={handleAddTopic}>
          + Add New Topic
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.id}>
                <td>{topic.title}</td>
                <td>{new Date(topic.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditTopic(topic)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTopic(topic.id)}
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{isEditing ? "Edit Topic" : "Add New Topic"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={currentTopic.title}
                  onChange={(e) =>
                    setCurrentTopic({ ...currentTopic, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  rows="10"
                  value={currentTopic.content}
                  onChange={(e) =>
                    setCurrentTopic({
                      ...currentTopic,
                      content: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="modal-actions">
                <button className="save-btn" onClick={handleSaveTopic}>
                  Save Topic
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumManager;
