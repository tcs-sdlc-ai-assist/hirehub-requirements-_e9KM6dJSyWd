import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to HireHub</h1>
          <p className="hero-subtitle">
            Discover exciting career opportunities and join our innovative team.
            We're looking for talented individuals passionate about technology and growth.
          </p>
          <Link to="/apply" className="hero-cta">
            Explore Opportunities
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Impactful Projects</h3>
            <p className="feature-description">
              Work on cutting-edge projects that solve real-world problems and drive innovation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3 className="feature-title">Career Growth</h3>
            <p className="feature-description">
              Access mentorship, training, and clear paths for professional advancement.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Collaborative Culture</h3>
            <p className="feature-description">
              Thrive in an inclusive environment where teamwork and diverse perspectives are valued.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3 className="feature-title">Work-Life Balance</h3>
            <p className="feature-description">
              Enjoy flexible arrangements and wellness programs designed for your wellbeing.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Begin Your Journey?</h2>
          <p className="cta-description">
            Take the first step toward an exciting new role. Our simple application process gets you started quickly.
          </p>
          <Link to="/apply" className="cta-button">
            Apply Now
          </Link>
        </div>
      </section>
    </section>
  );
};

export default LandingPage;