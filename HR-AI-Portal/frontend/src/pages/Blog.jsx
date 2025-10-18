import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Blog.css';

const Blog = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['General', 'Case Studies', 'Best Practices', 'Industry Insights', 'Tips & Tricks'];

  useEffect(() => {
    fetchPosts();
  }, [searchTerm, selectedCategory, currentPage]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      params.append('page', currentPage);
      params.append('limit', 9);

      const response = await axios.get(`/api/blog?${params.toString()}`);

      if (response.data.success) {
        setPosts(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setError('');
      }
    } catch (err) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewArticle = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="blog-page">
      <header className="blog-header">
        <div className="header-content">
          <h1>Blog & Articles</h1>
          <p>Insights, case studies, and best practices from industry experts</p>
        </div>
      </header>

      <div className="blog-container">
        <aside className="blog-filters">
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Category</h3>
            <div className="category-list">
              <label className="category-option">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={() => {
                    setSelectedCategory('');
                    setCurrentPage(1);
                  }}
                />
                <span>All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="blog-main">
          {error && <div className="error-message">{error}</div>}

          {isLoading ? (
            <div className="loading-state">Loading articles...</div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <p>No articles found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {posts.map((post) => (
                  <article key={post.id} className="blog-card">
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="card-image"
                      />
                    )}
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="category-badge">{post.category}</span>
                        <span className="date-badge">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h2 className="card-title">{post.title}</h2>
                      <p className="card-excerpt">
                        {post.excerpt || post.content.substring(0, 150) + '...'}
                      </p>
                      <div className="card-footer">
                        <div className="author-info">
                          <span className="author-name">
                            By {post.author.firstName} {post.author.lastName}
                          </span>
                        </div>
                        <div className="card-stats">
                          <span className="view-count">👁 {post.viewCount}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewArticle(post.slug)}
                        className="read-more-btn"
                      >
                        Read Article →
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ← Previous
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;
