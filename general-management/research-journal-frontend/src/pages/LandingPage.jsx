// pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero">
        <div className="hero-content">
          <h1>Revolutionize Your Research Workflow</h1>
          <p>
            The world's most advanced research management platform. 
            Collaborate, publish, and discover groundbreaking research.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              <i className="fas fa-rocket"></i>
              Start Free Trial
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              <i className="fas fa-sign-in-alt"></i>
              Sign In
            </Link>
          </div>
          <div className="demo-credentials" style={{marginTop: '2rem', background: 'rgba(255,255,255,0.1)', color: 'white'}}>
            <p style={{color: 'white', marginBottom: '0.5rem'}}>
              <strong>Demo Access:</strong> Use these credentials to explore the platform
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', color: 'white'}}>
              <div>
                <strong>Author:</strong> author@demo.com / demo123
              </div>
              <div>
                <strong>Editor:</strong> editor@demo.com / demo123
              </div>
              <div>
                <strong>Reviewer:</strong> reviewer@demo.com / demo123
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-paper-plane"></i>
            </div>
            <h3>Seamless Submission</h3>
            <p>
              Submit your research papers with our intuitive submission system. 
              Track progress in real-time and receive instant notifications.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Smart Collaboration</h3>
            <p>
              Work together with co-authors, reviewers, and editors in a 
              unified platform designed for research excellence.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Advanced Analytics</h3>
            <p>
              Gain insights into your research impact with comprehensive 
              analytics and visualization tools.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure & Compliant</h3>
            <p>
              Enterprise-grade security with compliance for all major 
              research ethics and data protection standards.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Mobile Ready</h3>
            <p>
              Access your research anytime, anywhere with our fully 
              responsive mobile-optimized platform.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-globe"></i>
            </div>
            <h3>Global Reach</h3>
            <p>
              Connect with researchers worldwide and increase the 
              visibility and impact of your work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;