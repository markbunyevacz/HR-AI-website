import React, { useEffect } from 'react';
import '../styles/ProtectedContent.css';

const ProtectedContent = ({ children, userName, userId }) => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for copy/select all
    const handleKeyDown = (e) => {
      // Ctrl+C / Cmd+C
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Ctrl+A / Cmd+A
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }
      // Ctrl+X / Cmd+X
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 88) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection via mouse
    const handleMouseDown = (e) => {
      if (e.detail > 1) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    const container = document.getElementById('protected-content-wrapper');
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
      container.addEventListener('keydown', handleKeyDown);
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('dragstart', handleDragStart);
    }

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
        container.removeEventListener('keydown', handleKeyDown);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('dragstart', handleDragStart);
      }
    };
  }, []);

  const watermarkText = `Protected • ${userName} • ID: ${userId} • ${new Date().toLocaleDateString()}`;

  return (
    <div id="protected-content-wrapper" className="protected-content-wrapper">
      {/* Watermark overlay */}
      <div className="watermark-overlay">
        <div className="watermark-text">{watermarkText}</div>
      </div>

      {/* Main protected content */}
      <div className="protected-content">
        {children}
      </div>

      {/* Copy protection indicators */}
      <div className="protection-notice">
        <span className="lock-icon">🔒</span>
        <span className="notice-text">This content is protected and cannot be copied</span>
      </div>
    </div>
  );
};

export default ProtectedContent;
