// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Research Journal</h3>
            <p>Advancing knowledge through quality research publications</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/archive">Archive</a></li>
              <li><a href="#">Submission Guidelines</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Research Journal Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;