import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header-card">
            <div className="profile-avatar">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="profile-info">
              <h2>{user?.firstName} {user?.lastName}</h2>
              <p className="profile-role">{user?.role}</p>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={isLoading}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="form-actions">
                <button type="submit" disabled={isLoading} className="btn-save">
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-section">
                <h3>About Me</h3>
                <p>{formData.bio || 'No bio added yet'}</p>
              </div>

              <div className="detail-section">
                <h3>Account Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Email</label>
                    <p>{formData.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Role</label>
                    <p className="role-badge">{user?.role}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsEditing(true)} 
                className="btn-edit"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
