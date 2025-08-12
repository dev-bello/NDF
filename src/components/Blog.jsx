import React, { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { hygraph } from "../utils/hygraph";
import "./Blog.css";

const Blog = ({ onBack }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = gql`
        query GetBlogPosts {
          blogPosts {
            id
            title
            slug
            content {
              html
              text
            }
            headerImage {
              id
            }
          }
        }
      `;
      try {
        const { blogPosts } = await hygraph.request(query);
        setBlogPosts(blogPosts);
      } catch (err) {
        setError(
          "Failed to fetch posts. Please check API permissions and schema."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPost) {
    return (
      <div className="blog-container">
        <div className="blog-background"></div>
        <div className="blog-content">
          <button className="back-button" onClick={() => setSelectedPost(null)}>
            ← Back to Blog
          </button>
          <article className="blog-post-full">
            <div className="post-header">
              {/* Image temporarily disabled for debugging */}
              <h1 className="post-title">{selectedPost.title}</h1>
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: selectedPost.content.html }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-background"></div>
      <div className="blog-content">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        <div className="blog-header">
          <h1>Forum Blog</h1>
          <p>
            Stay updated with the latest news, insights, and developments from
            the Northern Development Forum
          </p>
        </div>
        <div className="blog-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {loading && <div className="loading-indicator">Loading posts...</div>}
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <>
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="blog-card-image">
                    {/* Image temporarily disabled for debugging */}
                  </div>
                  <div className="blog-card-content">
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">
                      {post.content.text.substring(0, 150)}...
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <div className="no-results">
                <h3>No articles found</h3>
                <p>Try adjusting your search terms.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
