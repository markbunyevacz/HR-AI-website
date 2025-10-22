import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Watermark.css';

const WatermarkOverlay = () => {
  const { user } = useAuth();

  if (!user) return null;

  const watermarkText = `${user.firstName} ${user.lastName} | ID: ${user.id.substring(0, 8)} | ${new Date().toLocaleString()}`;

  return (
    <div className="watermark-overlay" aria-hidden="true">
      <div className="watermark-content">
        {watermarkText}
      </div>
      <div className="watermark-content watermark-offset">
        {watermarkText}
      </div>
      <div className="watermark-content watermark-offset-2">
        {watermarkText}
      </div>
    </div>
  );
};

export default WatermarkOverlay;

