import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCourses();
  }, [searchTerm, selectedLevel, selectedCategory, currentPage]);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 9,
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedLevel) params.append('level', selectedLevel);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await axios.get(`/api/courses?${params.toString()}`);

      if (response.data.success) {
        setCourses(response.data.data);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/enroll`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        alert('Successfully enrolled in course!');
        navigate(`/courses/${courseId}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="courses-page">
      <header className="courses-header">
        <h1>CAHIS™ Courses</h1>
        <p>Advance your HR AI skills with our certification programs</p>
      </header>

      <div className="courses-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h3>Filter Courses</h3>

          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="level">Level</label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="HR AI">HR AI</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="AI Strategy">AI Strategy</option>
              <option value="General">General</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedLevel('');
              setSelectedCategory('');
              setCurrentPage(1);
            }}
            className="clear-filters-btn"
          >
            Clear Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="courses-main">
          {error && <div className="error-message">{error}</div>}

          {isLoading ? (
            <div className="loading">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="no-courses">
              <p>No courses found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="courses-grid">
                {courses.map((course) => (
                  <div key={course.id} className="course-card">
                    {course.imageUrl && (
                      <div className="course-image">
                        <img src={course.imageUrl} alt={course.title} />
                      </div>
                    )}
                    <div className="course-content">
                      <div className="course-header">
                        <h3>{course.title}</h3>
                        <span className={`level-badge level-${course.level.toLowerCase()}`}>
                          {course.level}
                        </span>
                      </div>

                      <p className="course-description">{course.shortDescription}</p>

                      <div className="course-meta">
                        <div className="meta-item">
                          <span className="meta-label">Duration:</span>
                          <span>{course.duration || 'N/A'} hours</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Enrolled:</span>
                          <span>{course.enrollmentCount}</span>
                        </div>
                      </div>

                      {course.rating > 0 && (
                        <div className="course-rating">
                          <span className="stars">{'⭐'.repeat(Math.round(course.rating))}</span>
                          <span className="rating-text">
                            {course.rating.toFixed(1)} ({course.ratingCount} reviews)
                          </span>
                        </div>
                      )}

                      {course.instructor && (
                        <div className="instructor-info">
                          <p>
                            by {course.instructor.firstName} {course.instructor.lastName}
                          </p>
                        </div>
                      )}

                      <div className="course-actions">
                        <button
                          onClick={() => handleViewCourse(course.id)}
                          className="btn-view"
                        >
                          View Course
                        </button>
                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="btn-enroll"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ← Previous
                  </button>

                  <div className="page-info">
                    Page {currentPage} of {totalPages}
                  </div>

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

export default Courses;
