import React, { useState } from "react";
import "./Blog.css";

const Blog = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock-up Sample
  const blogPosts = [
    {
      id: 1,
      title: "Northern Development Forum Launches Community Outreach Program",
      excerpt:
        "A comprehensive initiative to strengthen grassroots engagement across all member communities...",
      content:
        "The Northern Development Forum has officially launched its Community Outreach Program, designed to enhance direct engagement with grassroots communities across the region. This initiative represents a significant step forward in our mission to bridge the gap between policy makers and the people they serve.",
      author: "Dr. Amina Hassan",
      date: "2025-01-15",
      category: "Community",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "5 min read",
    },
    {
      id: 2,
      title:
        "Agricultural Innovation Summit: Transforming Northern Nigeria's Farming Sector",
      excerpt:
        "Key stakeholders gather to discuss modern farming techniques and sustainable agricultural practices...",
      content:
        "The recent Agricultural Innovation Summit brought together farmers, researchers, and policy makers to explore cutting-edge farming techniques that could revolutionize agricultural productivity in Northern Nigeria. The forum emphasized sustainable practices and technology adoption.",
      author: "Engr. Ibrahim Musa",
      date: "2025-01-12",
      category: "Agriculture",
      image:
        "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Digital Democracy: How Technology is Reshaping Governance",
      excerpt:
        "Exploring the role of mobile applications and digital platforms in enhancing democratic participation...",
      content:
        "The Northern Development Forum's commitment to digital democracy is transforming how citizens engage with governance. Through innovative mobile applications and secure digital platforms, we're creating new pathways for democratic participation and transparency.",
      author: "Fatima Abdullahi",
      date: "2025-01-10",
      category: "Technology",
      image:
        "https://images.pexels.com/photos/5935791/pexels-photo-5935791.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Unity in Diversity: Building Bridges Across Ethnic Lines",
      excerpt:
        "How the forum is fostering understanding and cooperation among different ethnic groups...",
      content:
        "One of our core missions is to build unity across ethnic and religious lines. This article explores the various initiatives and programs designed to foster understanding, cooperation, and mutual respect among the diverse communities in Northern Nigeria.",
      author: "Pastor. John Yakubu",
      date: "2025-01-08",
      category: "Unity",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "8 min read",
    },
    {
      id: 5,
      title: "Healthcare Infrastructure Development: A Regional Priority",
      excerpt:
        "Examining the forum's initiatives to improve healthcare delivery across Northern Nigeria...",
      content:
        "Healthcare remains a critical priority for the Northern Development Forum. This comprehensive overview examines our ongoing initiatives to improve healthcare infrastructure, enhance medical service delivery, and ensure equitable access to quality healthcare across the region.",
      author: "Dr. Khadija Usman",
      date: "2025-01-05",
      category: "Healthcare",
      image:
        "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "Educational Excellence: Preparing the Next Generation",
      excerpt:
        "Innovative educational programs and policies designed to enhance learning outcomes...",
      content:
        "Education is the foundation of sustainable development. The Northern Development Forum has launched several innovative educational programs aimed at improving learning outcomes, enhancing teacher training, and ensuring that every child has access to quality education.",
      author: "Prof. Aliyu Garba",
      date: "2025-01-03",
      category: "Education",
      image:
        "https://images.pexels.com/photos/8926553/pexels-photo-8926553.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "6 min read",
    },
  ];

  const categories = [
    "all",
    "Community",
    "Agriculture",
    "Technology",
    "Unity",
    "Healthcare",
    "Education",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [selectedPost, setSelectedPost] = useState(null);

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
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="post-hero-image"
              />
              <div className="post-meta">
                <span className="post-category">{selectedPost.category}</span>
                <span className="post-date">
                  {new Date(selectedPost.date).toLocaleDateString()}
                </span>
                <span className="post-read-time">{selectedPost.readTime}</span>
              </div>
              <h1 className="post-title">{selectedPost.title}</h1>
              <div className="post-author">
                <span>By {selectedPost.author}</span>
              </div>
            </div>

            <div className="post-content">
              <p>{selectedPost.content}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            </div>
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

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category === "all" ? "All Posts" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card"
              onClick={() => setSelectedPost(post)}
            >
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} />
                <div className="blog-card-category">{post.category}</div>
              </div>

              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-date">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="blog-card-read-time">{post.readTime}</span>
                </div>

                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>

                <div className="blog-card-author">
                  <span>By {post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-results">
            <h3>No articles found</h3>
            <p>Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
