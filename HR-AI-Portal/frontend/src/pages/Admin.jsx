import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cv-uploads');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [queueStats, setQueueStats] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activeTab === 'cv-uploads') {
      fetchJobs();
      fetchQueueStats();
      const interval = setInterval(() => {
        fetchJobs();
        fetchQueueStats();
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/ocr/user-jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const fetchQueueStats = async () => {
    try {
      const response = await axios.get('/api/ocr/queue-stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setQueueStats(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching queue stats:', err);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];

      if (!allowedTypes.includes(file.type)) {
        setError('Please select a PDF or image file (JPG, PNG, GIF, WEBP)');
        return;
      }

      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }

      setSelectedFile(file);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('/api/ocr/upload-cv', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (response.data.success) {
        setSuccess(`CV uploaded successfully! Job ID: ${response.data.jobId}`);
        setSelectedFile(null);

        // Reset file input
        const fileInput = document.getElementById('cv-file-input');
        if (fileInput) fileInput.value = '';

        // Refresh jobs list
        fetchJobs();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCancelJob = async (jobId) => {
    try {
      await axios.post(`/api/ocr/cancel-job/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refresh jobs list
      fetchJobs();
    } catch (err) {
      setError('Failed to cancel job');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'processing': return 'status-processing';
      case 'failed': return 'status-failed';
      case 'pending': return 'status-pending';
      default: return 'status-unknown';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>🛠️ Admin Panel</h1>
        <p>Manage CV processing and system administration</p>
      </header>

      <div className="admin-container">
        <nav className="admin-nav">
          <button
            className={`nav-tab ${activeTab === 'cv-uploads' ? 'active' : ''}`}
            onClick={() => setActiveTab('cv-uploads')}
          >
            📄 CV Uploads & Processing
          </button>
          <button
            className={`nav-tab ${activeTab === 'queue-stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('queue-stats')}
          >
            📊 Queue Statistics
          </button>
          <button
            className={`nav-tab ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            ⚙️ System Management
          </button>
        </nav>

        <main className="admin-main">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {activeTab === 'cv-uploads' && (
            <div className="cv-uploads-section">
              <div className="upload-section">
                <h2>Upload CV for OCR Processing</h2>

                <div className="upload-form">
                  <div className="file-input-wrapper">
                    <input
                      id="cv-file-input"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleFileSelect}
                      disabled={isUploading}
                    />
                    <label htmlFor="cv-file-input" className="file-input-label">
                      {selectedFile ? selectedFile.name : 'Choose CV file (PDF or Image)'}
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="file-info">
                      <p><strong>File:</strong> {selectedFile.name}</p>
                      <p><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
                      <p><strong>Type:</strong> {selectedFile.type}</p>
                    </div>
                  )}

                  {isUploading && (
                    <div className="upload-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p>{uploadProgress}% uploaded</p>
                    </div>
                  )}

                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="upload-btn"
                  >
                    {isUploading ? 'Processing...' : 'Upload & Process CV'}
                  </button>
                </div>
              </div>

              <div className="jobs-section">
                <h2>Processing Jobs</h2>

                {jobs.length === 0 ? (
                  <div className="empty-state">
                    <p>No jobs found. Upload a CV to start processing.</p>
                  </div>
                ) : (
                  <div className="jobs-list">
                    {jobs.map((job) => (
                      <div key={job.id} className="job-card">
                        <div className="job-header">
                          <span className={`job-status ${getStatusColor(job.status)}`}>
                            {job.status.toUpperCase()}
                          </span>
                          <span className="job-id">Job #{job.id}</span>
                        </div>

                        <div className="job-details">
                          <p><strong>Created:</strong> {formatDate(job.createdAt)}</p>
                          {job.processedAt && (
                            <p><strong>Processed:</strong> {formatDate(job.processedAt)}</p>
                          )}
                          {job.finishedAt && (
                            <p><strong>Finished:</strong> {formatDate(job.finishedAt)}</p>
                          )}
                          <p><strong>Progress:</strong> {job.progress}%</p>
                          {job.error && (
                            <p className="job-error"><strong>Error:</strong> {job.error}</p>
                          )}
                        </div>

                        {job.status === 'active' || job.status === 'waiting' ? (
                          <button
                            onClick={() => handleCancelJob(job.id)}
                            className="cancel-job-btn"
                          >
                            Cancel Job
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'queue-stats' && (
            <div className="queue-stats-section">
              <h2>OCR Queue Statistics</h2>

              {queueStats ? (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-number">{queueStats.waiting}</div>
                    <div className="stat-label">Waiting</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{queueStats.active}</div>
                    <div className="stat-label">Active</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{queueStats.completed}</div>
                    <div className="stat-label">Completed</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{queueStats.failed}</div>
                    <div className="stat-label">Failed</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{queueStats.total}</div>
                    <div className="stat-label">Total</div>
                  </div>
                </div>
              ) : (
                <div className="loading-state">Loading queue statistics...</div>
              )}
            </div>
          )}

          {activeTab === 'system' && (
            <div className="system-section">
              <h2>System Management</h2>

              <div className="system-controls">
                <button className="system-btn" onClick={() => navigate('/admin/ocr-results')}>
                  🔍 Review OCR Results
                </button>
                <button className="system-btn">
                  🔄 Restart OCR Service
                </button>
                <button className="system-btn">
                  🧹 Clean Old Jobs
                </button>
                <button className="system-btn">
                  📊 View System Logs
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
