import React from 'react';
import '../styles/Manifesto.css';

const Manifesto = () => {
  return (
    <div className="manifesto-page">
      <header className="manifesto-header">
        <h1>Our Manifesto</h1>
        <p className="subtitle">Principles that guide our community</p>
      </header>

      <div className="manifesto-container">
        <section className="manifesto-mission">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              We are committed to advancing HR excellence through certification, continuous learning, and professional 
              collaboration. Our mission is to empower HR professionals with knowledge, skills, and community support to 
              drive organizational success and human-centered workplaces.
            </p>
          </div>
        </section>

        <section className="manifesto-vision">
          <div className="section-content">
            <h2>Our Vision</h2>
            <p>
              A global community of certified HR professionals who are recognized experts, thought leaders, and agents 
              of positive change in their organizations. We envision a world where HR professionals are valued strategic 
              partners who shape organizational culture and drive sustainable growth.
            </p>
          </div>
        </section>

        <section className="manifesto-values">
          <h2>Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>We pursue the highest standards in everything we do, from certification programs to professional development.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>We believe in the power of community. Together, we learn more, achieve more, and grow more.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We embrace new ideas and modern approaches to HR challenges, staying ahead of industry trends.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Diversity & Inclusion</h3>
              <p>We celebrate differences and foster an inclusive environment where all voices are heard and valued.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">📚</div>
              <h3>Continuous Learning</h3>
              <p>We commit to lifelong learning and professional development, staying current with evolving best practices.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Integrity</h3>
              <p>We uphold the highest ethical standards and act with honesty, transparency, and accountability.</p>
            </div>
          </div>
        </section>

        <section className="manifesto-principles">
          <h2>Guiding Principles</h2>
          <div className="principles-list">
            <div className="principle-item">
              <div className="principle-number">1</div>
              <div className="principle-content">
                <h3>Member Success First</h3>
                <p>
                  Every decision we make is guided by what's best for our members. We prioritize their growth, 
                  success, and satisfaction.
                </p>
              </div>
            </div>

            <div className="principle-item">
              <div className="principle-number">2</div>
              <div className="principle-content">
                <h3>Quality Above All</h3>
                <p>
                  We maintain rigorous standards for all our programs, materials, and certifications. Quality is 
                  never compromised.
                </p>
              </div>
            </div>

            <div className="principle-item">
              <div className="principle-number">3</div>
              <div className="principle-content">
                <h3>Accessibility & Equity</h3>
                <p>
                  We believe HR excellence should be accessible to all. We work to remove barriers and create 
                  opportunities for everyone.
                </p>
              </div>
            </div>

            <div className="principle-item">
              <div className="principle-number">4</div>
              <div className="principle-content">
                <h3>Practical Application</h3>
                <p>
                  We focus on real-world HR challenges and solutions. Knowledge without application is incomplete; 
                  we bridge that gap.
                </p>
              </div>
            </div>

            <div className="principle-item">
              <div className="principle-number">5</div>
              <div className="principle-content">
                <h3>Respect & Professionalism</h3>
                <p>
                  We maintain professional standards in all interactions. Respect, courtesy, and professionalism 
                  define our community.
                </p>
              </div>
            </div>

            <div className="principle-item">
              <div className="principle-number">6</div>
              <div className="principle-content">
                <h3>Shared Knowledge</h3>
                <p>
                  We believe in the power of shared expertise. By sharing knowledge generously, we elevate the 
                  entire profession.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto-commitment">
          <div className="section-content">
            <h2>Our Commitment to You</h2>
            <ul className="commitment-list">
              <li>✓ Providing cutting-edge, relevant learning content and certifications</li>
              <li>✓ Fostering a supportive community of like-minded HR professionals</li>
              <li>✓ Ensuring your investment in learning delivers measurable career advancement</li>
              <li>✓ Maintaining the highest standards of professionalism and ethics</li>
              <li>✓ Continuously evolving to meet the changing needs of the HR profession</li>
              <li>✓ Protecting your intellectual property and professional confidentiality</li>
              <li>✓ Providing exceptional support and resources throughout your journey</li>
              <li>✓ Creating opportunities for leadership and contribution within our community</li>
            </ul>
          </div>
        </section>

        <section className="manifesto-cta">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>By becoming part of our certified professional community, you commit to these principles and values. Together, we shape the future of HR.</p>
            <button className="btn-join" onClick={() => window.location.href = '/courses'}>Explore Certifications</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Manifesto;
