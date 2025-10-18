import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/OCRResults.css';

const OCRResults = () => {
  const { token } = useAuth();
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filters, setFilters] = useState({
    status: 'completed',
    search: '',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchResults();
  }, [filters]);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(`/api/ocr/results?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setResults(response.data.data);
      }
    } catch (err) {
      setError('Failed to load OCR results');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResult = (result) => {
    setSelectedResult(result);
    setEditData(result.extractedData || {});
    setIsEditing(false);
  };

  const handleEditResult = () => {
    setIsEditing(true);
  };

  const handleSaveEdits = async () => {
    try {
      const response = await axios.put(
        `/api/ocr/results/${selectedResult.id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess('OCR result updated successfully');
        setSelectedResult({ ...selectedResult, extractedData: editData });
        setIsEditing(false);

        // Refresh results list
        fetchResults();
      }
    } catch (err) {
      setError('Failed to update OCR result');
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditData(selectedResult.extractedData || {});
    setIsEditing(false);
  };

  const handleDeleteResult = async (resultId) => {
    if (!confirm('Are you sure you want to delete this OCR result?')) return;

    try {
      const response = await axios.delete(`/api/ocr/results/${resultId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSuccess('OCR result deleted successfully');
        setSelectedResult(null);
        fetchResults();
      }
    } catch (err) {
      setError('Failed to delete OCR result');
      console.error(err);
    }
  };

  const handleExportResults = async (format) => {
    try {
      const response = await axios.get(`/api/ocr/export-results?format=${format}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Create download
      const blob = new Blob([response.data], {
        type: format === 'csv' ? 'text/csv' : 'application/json'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ocr-results.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(`OCR results exported as ${format.toUpperCase()}`);
    } catch (err) {
      setError('Failed to export results');
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
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

  const updateEditData = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addToArray = (section, value) => {
    if (!value.trim()) return;

    setEditData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), value.trim()]
    }));
  };

  const removeFromArray = (section, index) => {
    setEditData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="ocr-results-page">
      <header className="ocr-results-header">
        <h1>🔍 OCR Results Review</h1>
        <p>Review and correct extracted CV data from OCR processing</p>
      </header>

      <div className="ocr-results-container">
        <div className="results-sidebar">
          <div className="filters-section">
            <h3>Filters</h3>

            <div className="filter-group">
              <label>Status:</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Search:</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search filename or content..."
              />
            </div>

            <div className="filter-group">
              <label>Per Page:</label>
              <select
                value={filters.limit}
                onChange={(e) => setFilters(prev => ({ ...prev, limit: e.target.value }))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <div className="export-section">
            <h3>Export</h3>
            <button onClick={() => handleExportResults('csv')} className="export-btn">
              📄 Export CSV
            </button>
            <button onClick={() => handleExportResults('json')} className="export-btn">
              📋 Export JSON
            </button>
          </div>
        </div>

        <div className="results-main">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {isLoading ? (
            <div className="loading-state">Loading OCR results...</div>
          ) : results.length === 0 ? (
            <div className="empty-state">
              <p>No OCR results found.</p>
            </div>
          ) : (
            <div className="results-list">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`result-card ${selectedResult?.id === result.id ? 'selected' : ''}`}
                  onClick={() => handleViewResult(result)}
                >
                  <div className="result-header">
                    <span className={`result-status ${getStatusColor(result.status)}`}>
                      {result.status.toUpperCase()}
                    </span>
                    <span className="result-confidence">
                      {result.confidence ? `${result.confidence}%` : 'N/A'}
                    </span>
                  </div>

                  <div className="result-info">
                    <h4>{result.fileName}</h4>
                    <p><strong>Type:</strong> {result.fileType.toUpperCase()}</p>
                    <p><strong>Size:</strong> {formatFileSize(result.fileSize)}</p>
                    <p><strong>Uploaded:</strong> {formatDate(result.createdAt)}</p>
                    {result.processingCompletedAt && (
                      <p><strong>Processed:</strong> {formatDate(result.processingCompletedAt)}</p>
                    )}
                  </div>

                  {result.extractedData && (
                    <div className="result-preview">
                      <p><strong>Emails:</strong> {result.extractedData.emails?.length || 0}</p>
                      <p><strong>Skills:</strong> {result.extractedData.skills?.length || 0}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedResult && (
          <div className="result-detail">
            <div className="result-detail-header">
              <h3>OCR Result Details</h3>
              <div className="result-actions">
                {isEditing ? (
                  <>
                    <button onClick={handleSaveEdits} className="save-btn">
                      💾 Save Changes
                    </button>
                    <button onClick={handleCancelEdit} className="cancel-btn">
                      ❌ Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleEditResult} className="edit-btn">
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteResult(selectedResult.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="result-content">
              <div className="result-meta">
                <h4>{selectedResult.fileName}</h4>
                <p><strong>Status:</strong> <span className={getStatusColor(selectedResult.status)}>{selectedResult.status}</span></p>
                <p><strong>Confidence:</strong> {selectedResult.confidence || 'N/A'}%</p>
                <p><strong>Uploaded:</strong> {formatDate(selectedResult.createdAt)}</p>
                {selectedResult.processingCompletedAt && (
                  <p><strong>Processed:</strong> {formatDate(selectedResult.processingCompletedAt)}</p>
                )}
              </div>

              <div className="extracted-data">
                <h4>Extracted Data</h4>

                {/* Raw Text */}
                <div className="data-section">
                  <label>Raw Text:</label>
                  <textarea
                    readOnly={!isEditing}
                    value={isEditing ? editData.rawText || '' : selectedResult.rawText || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, rawText: e.target.value }))}
                    className="raw-text-area"
                  />
                </div>

                {/* Personal Information */}
                <div className="data-section">
                  <h5>Personal Information</h5>

                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      readOnly={!isEditing}
                      value={isEditing ? editData.name || '' : selectedResult.extractedData?.name || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      readOnly={!isEditing}
                      value={isEditing ? editData.email || '' : selectedResult.extractedData?.email || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      readOnly={!isEditing}
                      value={isEditing ? editData.phone || '' : selectedResult.extractedData?.phone || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="data-section">
                  <h5>Skills</h5>

                  {isEditing ? (
                    <div className="skills-editor">
                      <div className="skills-list">
                        {(editData.skills || []).map((skill, index) => (
                          <div key={index} className="skill-item">
                            <span>{skill}</span>
                            <button onClick={() => removeFromArray('skills', index)}>×</button>
                          </div>
                        ))}
                      </div>
                      <div className="add-skill">
                        <input
                          type="text"
                          placeholder="Add skill..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addToArray('skills', e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="skills-display">
                      {selectedResult.extractedData?.skills?.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="data-section">
                  <label>Summary:</label>
                  <textarea
                    readOnly={!isEditing}
                    value={isEditing ? editData.summary || '' : selectedResult.extractedData?.summary || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, summary: e.target.value }))}
                    className="summary-area"
                  />
                </div>

                {/* Keywords */}
                <div className="data-section">
                  <h5>Keywords</h5>
                  <div className="keywords-display">
                    {selectedResult.extractedData?.keywords?.map((keyword, index) => (
                      <span key={index} className="keyword-tag">{keyword}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRResults;
