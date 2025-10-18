import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/'} className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">HR Academy</span>
        </Link>

        {/* Desktop Navigation */}
        {user && (
          <nav className="nav-desktop">
            <Link to="/courses" className="nav-link">Courses</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/community" className="nav-link">Community</Link>
            <Link to="/resources" className="nav-link">Resources</Link>
            <Link to="/certificates" className="nav-link">Certificates</Link>
          </nav>
        )}

        {/* User Section */}
        <div className="user-section">
          {user ? (
            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="user-avatar">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{user.firstName}</span>
                <span className="dropdown-icon">▼</span>
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    👤 My Profile
                  </Link>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    📊 Dashboard
                  </Link>
                  <Link to="/certificates" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                    🏆 Certificates
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                className="btn-login"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="btn-signup"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && user && (
        <nav className="nav-mobile">
          <Link to="/courses" className="nav-link" onClick={handleNavClick}>
            📖 Courses
          </Link>
          <Link to="/blog" className="nav-link" onClick={handleNavClick}>
            📝 Blog
          </Link>
          <Link to="/community" className="nav-link" onClick={handleNavClick}>
            💬 Community
          </Link>
          <Link to="/resources" className="nav-link" onClick={handleNavClick}>
            📚 Resources
          </Link>
          <Link to="/certificates" className="nav-link" onClick={handleNavClick}>
            🏆 Certificates
          </Link>
          <Link to="/profile" className="nav-link" onClick={handleNavClick}>
            👤 My Profile
          </Link>
          <button className="nav-link logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
