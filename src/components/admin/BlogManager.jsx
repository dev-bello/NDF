import React, { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { hygraph, hygraphRW } from "../../utils/hygraph";
import "./BlogManager.css";

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    const query = gql`
      query GetBlogPosts {
        blogPosts {
          id
          title
          slug
          content {
            text
            html
          }
          headerImage {
            id
          }
        }
      }
    `;
    try {
      const { blogPosts } = await hygraph.request(query);
      setPosts(blogPosts);
    } catch (err) {
      setError("Failed to fetch blog posts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = () => {
    setIsEditing(false);
    setCurrentPost({
      title: "",
      slug: "",
      content: { text: "" },
      headerImage: null,
    });
    setShowModal(true);
  };

  const handleEditPost = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const mutation = gql`
        mutation DeleteBlogPost($id: ID!) {
          deleteBlogPost(where: { id: $id }) {
            id
          }
        }
      `;
      try {
        await hygraphRW.request(mutation, { id: postId });
        fetchPosts();
      } catch (err) {
        setError("Failed to delete post.");
        console.error(err);
      }
    }
  };

  const handleSavePost = async () => {
    const { id, title, slug, content, headerImage } = currentPost;
    const isNew = !isEditing;

    const mutation = isNew
      ? gql`
          mutation CreateBlogPost($data: BlogPostCreateInput!) {
            createBlogPost(data: $data) {
              id
            }
          }
        `
      : gql`
          mutation UpdateBlogPost($id: ID!, $data: BlogPostUpdateInput!) {
            updateBlogPost(where: { id: $id }, data: $data) {
              id
            }
          }
        `;

    const variables = {
      data: {
        title,
        slug,
        content: { text: content.text },
        headerImage: headerImage
          ? { connect: { id: headerImage.id } }
          : undefined,
      },
    };

    if (!isNew) {
      variables.id = id;
    }

    try {
      await hygraphRW.request(mutation, variables);
      setShowModal(false);
      fetchPosts();
    } catch (err) {
      setError("Failed to save post.");
      console.error(err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("fileUpload", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_HYGRAPH_API_RW_ENDPOINT}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_API_TOKEN}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      setCurrentPost({
        ...currentPost,
        headerImage: { id: data.id, url: data.url },
      });
    } catch (err) {
      console.error("File upload failed", err);
    }
  };

  if (loading) return <div className="loading-spinner">Loading posts...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="blog-manager">
      <div className="section-header">
        <h3>Manage Blog Posts</h3>
        <button className="add-btn" onClick={handleAddPost}>
          + Add New Post
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditPost(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeletePost(post.id)}
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
              <h3>{isEditing ? "Edit Post" : "Add New Post"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={currentPost.title}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  value={currentPost.slug}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, slug: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  rows="10"
                  value={currentPost.content.text}
                  onChange={(e) =>
                    setCurrentPost({
                      ...currentPost,
                      content: { ...currentPost.content, text: e.target.value },
                    })
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <label>Header Image</label>
                <input type="file" onChange={handleFileChange} />
                {/* Image temporarily disabled for debugging */}
              </div>
              <div className="modal-actions">
                <button className="save-btn" onClick={handleSavePost}>
                  Save Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
