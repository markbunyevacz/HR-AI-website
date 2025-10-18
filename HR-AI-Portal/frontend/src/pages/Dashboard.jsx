import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {user?.firstName}!</h1>
        </div>
        <div className="header-right">
          <Link to="/profile" className="header-link">My Profile</Link>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Quick Overview</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <div className="card-icon">📚</div>
              <h3>Courses</h3>
              <p className="card-stat">0 / 5</p>
              <p className="card-description">Courses Completed</p>
            </div>
            <div className="overview-card">
              <div className="card-icon">✓</div>
              <h3>Quizzes</h3>
              <p className="card-stat">0 / 10</p>
              <p className="card-description">Completed</p>
            </div>
            <div className="overview-card">
              <div className="card-icon">🏆</div>
              <h3>Certifications</h3>
              <p className="card-stat">0</p>
              <p className="card-description">Earned</p>
              <Link to="/certificates" className="card-link">View Certs →</Link>
            </div>
            <div className="overview-card">
              <div className="card-icon">👥</div>
              <h3>Community</h3>
              <p className="card-stat">0</p>
              <p className="card-description">Connections</p>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Profile Information</h2>
          <div className="profile-card">
            <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> <span className="role-badge">{user?.role}</span></p>
            <Link to="/profile" className="btn-secondary">Update Profile</Link>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <button 
              onClick={() => navigate('/courses')}
              className="action-btn"
            >
              <span className="btn-icon">📖</span>
              View Courses
            </button>
            <button 
              onClick={() => navigate('/blog')}
              className="action-btn"
            >
              <span className="btn-icon">📝</span>
              Read Blog
            </button>
            <button 
              onClick={() => navigate('/community')}
              className="action-btn"
            >
              <span className="btn-icon">💬</span>
              Community Chat
            </button>
            <button 
              onClick={() => navigate('/certificates')}
              className="action-btn"
            >
              <span className="btn-icon">🏅</span>
              My Certificates
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
