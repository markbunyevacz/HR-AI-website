import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Master HR Certification</h1>
          <p className="hero-subtitle">Advance your HR career with CAHIS™ certification and join a community of experts</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/register')}>
              Get Started Free
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="graphic-element">📚</div>
            <div className="graphic-element">🎓</div>
            <div className="graphic-element">🏆</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose Our Platform?</h2>
          <p>Everything you need for HR certification success</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📖</div>
            <h3>Expert Content</h3>
            <p>Comprehensive CAHIS™ courses designed by industry experts with real-world insights</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Rigorous Assessments</h3>
            <p>Challenging quizzes and exams that ensure you truly master the material</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Recognized Certificates</h3>
            <p>Earn industry-recognized certificates that boost your career and credibility</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Vibrant Community</h3>
            <p>Connect with certified professionals, share knowledge, and grow together</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Real-time Chat</h3>
            <p>Engage in discussions with peers, ask questions, and learn collaboratively</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Resource Library</h3>
            <p>Access curated external materials and complementary training resources</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Your path to HR certification in 4 simple steps</p>
        </div>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create your free account and set up your profile in minutes</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Learn</h3>
            <p>Access comprehensive courses covering all CAHIS™ certification topics</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Practice</h3>
            <p>Take quizzes and exams to test your knowledge and track progress</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Achieve</h3>
            <p>Earn your certification and join our community of certified professionals</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-card">
          <div className="stat-number">10,000+</div>
          <p>Certified Professionals</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <p>Expert Courses</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">95%</div>
          <p>Success Rate</p>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <p>Community Support</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-header">
          <h2>What Our Members Say</h2>
          <p>Real stories from certified HR professionals</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="testimonial-text">
              "This platform completely transformed my HR career. The CAHIS™ certification opened doors I didn't know existed."
            </p>
            <p className="testimonial-author">— Sarah M., HR Manager</p>
          </div>
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="testimonial-text">
              "The community here is incredible. I've learned as much from my peers as I have from the courses themselves."
            </p>
            <p className="testimonial-author">— James K., HR Director</p>
          </div>
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p className="testimonial-text">
              "Professional, comprehensive, and worth every penny. My new certification has already led to a promotion."
            </p>
            <p className="testimonial-author">— Maria L., HR Specialist</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-final">
        <div className="cta-content">
          <h2>Ready to Advance Your HR Career?</h2>
          <p>Join thousands of professionals who have transformed their careers with our CAHIS™ certification</p>
          <div className="cta-buttons">
            <button className="btn-primary-large" onClick={() => navigate('/register')}>
              Start Your Journey Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
