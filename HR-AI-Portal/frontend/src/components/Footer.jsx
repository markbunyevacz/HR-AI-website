import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About HR Academy</h3>
          <p>Empowering HR professionals with world-class CAHIS™ certification and community support.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/resources">Resources</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Learning</h3>
          <ul>
            <li><Link to="/courses">Browse Courses</Link></li>
            <li><Link to="/resources">Training Materials</Link></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Community</h3>
          <ul>
            <li><Link to="/community">Chat & Forums</Link></li>
            <li><Link to="/manifesto">Our Manifesto</Link></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#cookies">Cookie Policy</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-left">
          <p>&copy; 2024 HR Academy. All rights reserved. CAHIS™ is a trademark of the certification body.</p>
        </div>
        <div className="footer-social">
          <a href="#linkedin" title="LinkedIn" className="social-link">in</a>
          <a href="#twitter" title="Twitter" className="social-link">𝕏</a>
          <a href="#facebook" title="Facebook" className="social-link">f</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
