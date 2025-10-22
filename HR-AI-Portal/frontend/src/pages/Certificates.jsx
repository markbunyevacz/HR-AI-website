import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import WatermarkOverlay from '../components/WatermarkOverlay';
import '../styles/Certificates.css';

const Certificates = () => {
  const { token } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/certificates/my-certificates', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCertificates(response.data.data);
        setError('');
      }
    } catch (err) {
      setError('Failed to load certificates');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpired = (expiryDate) => {
    return new Date() > new Date(expiryDate);
  };

  const downloadCertificate = (certificateNumber, courseName) => {
    // In production, this would generate a PDF and download it
    alert(`Downloading certificate: ${certificateNumber} for ${courseName}`);
  };

  return (
    <div className="certificates-page">
      <WatermarkOverlay />
      <header className="certificates-header">
        <div className="header-content">
          <h1>🏆 My Certificates</h1>
          <p>View and manage your earned certifications</p>
        </div>
      </header>

      <div className="certificates-container">
        {error && <div className="error-message">{error}</div>}

        {isLoading ? (
          <div className="loading-state">Loading your certificates...</div>
        ) : certificates.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Certificates Yet</h3>
            <p>Complete courses and pass their quizzes to earn certificates</p>
            <button className="btn-explore" onClick={() => window.location.href = '/courses'}>
              Explore Courses
            </button>
          </div>
        ) : (
          <div className="certificates-grid">
            {certificates.map((cert) => (
              <div key={cert.id} className="certificate-card">
                <div className="cert-header">
                  <div className="cert-icon">🎓</div>
                  <div className="cert-status">
                    {isExpired(cert.expiresAt) ? (
                      <span className="expired">Expired</span>
                    ) : (
                      <span className="active">Active</span>
                    )}
                  </div>
                </div>

                <div className="cert-content">
                  <h3 className="cert-course">{cert.course.title}</h3>
                  <p className="cert-category">{cert.course.category}</p>

                  <div className="cert-details">
                    <div className="detail-row">
                      <span className="label">Certificate #:</span>
                      <span className="value">{cert.certificateNumber}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Issued:</span>
                      <span className="value">{formatDate(cert.issuedAt)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Expires:</span>
                      <span className="value">{formatDate(cert.expiresAt)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Verification Code:</span>
                      <span className="value mono">{cert.verificationCode}</span>
                    </div>
                  </div>

                  <div className="cert-actions">
                    <button
                      className="btn-download"
                      onClick={() =>
                        downloadCertificate(
                          cert.certificateNumber,
                          cert.course.title
                        )
                      }
                    >
                      📥 Download
                    </button>
                    <button
                      className="btn-share"
                      onClick={() =>
                        navigator.clipboard.writeText(cert.verificationCode)
                      }
                    >
                      📋 Copy Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="cert-info">
        <h2>About Your Certificates</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>🔐 Verification</h3>
            <p>Share your verification code to let others confirm your certificate authenticity</p>
          </div>
          <div className="info-card">
            <h3>📜 Validity</h3>
            <p>Certificates are valid for 3 years from the date of issuance</p>
          </div>
          <div className="info-card">
            <h3>🏅 Recognition</h3>
            <p>Our certifications are recognized by industry professionals and organizations</p>
          </div>
          <div className="info-card">
            <h3>💼 Professional Use</h3>
            <p>Add your certificates to your LinkedIn, resume, and professional profiles</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificates;
