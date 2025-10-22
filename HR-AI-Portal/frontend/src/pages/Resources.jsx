import React from 'react';
import WatermarkOverlay from '../components/WatermarkOverlay';
import '../styles/Resources.css';

const Resources = () => {
  const resources = [
    { id: 1, title: 'LinkedIn Learning', category: 'Online Courses', link: 'https://linkedin.com/learning', icon: '📚', description: 'Professional development courses' },
    { id: 2, title: 'Society for Human Resource Management', category: 'Professional Org', link: 'https://shrm.org', icon: '🏢', description: 'HR industry standards and resources' },
    { id: 3, title: 'HR.com', category: 'Community', link: 'https://hr.com', icon: '👥', description: 'HR networking and knowledge sharing' },
    { id: 4, title: 'Coursera HR Programs', category: 'Certifications', link: 'https://coursera.org', icon: '🎓', description: 'University-backed HR certifications' },
    { id: 5, title: 'Udemy HR Courses', category: 'Online Courses', link: 'https://udemy.com', icon: '💻', description: 'Affordable HR skill development' },
    { id: 6, title: 'Human Resource Executive', category: 'Publications', link: 'https://hrexecutive.com', icon: '📰', description: 'Industry news and insights' },
  ];

  const categories = ['All', 'Online Courses', 'Professional Org', 'Certifications', 'Community', 'Publications'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="resources-page">
      <WatermarkOverlay />
      <header className="resources-header">
        <h1>📚 Learning Resources</h1>
        <p>Curated external materials to support your professional development</p>
      </header>

      <div className="resources-container">
        <div className="resources-filters">
          <h3>Filter by Category</h3>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="resources-main">
          <div className="resources-grid">
            {filteredResources.map(resource => (
              <a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-icon">{resource.icon}</div>
                <h3>{resource.title}</h3>
                <p className="resource-category">{resource.category}</p>
                <p className="resource-description">{resource.description}</p>
                <span className="external-link">Visit →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
