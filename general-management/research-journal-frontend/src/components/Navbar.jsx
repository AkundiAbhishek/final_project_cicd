// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* LOGO */}
        <Link to={user ? "/home" : "/"} className="logo">
          <i className="fas fa-microscope"></i> ResearchHub
        </Link>

        <ul className="nav-links">

          {/* BEFORE LOGIN → LOGIN + REGISTER ONLY */}
          {!user && (
            <li className="user-actions">
              <Link to="/login" className="btn btn-outline btn-sm">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>

              <Link to="/register" className="btn btn-primary btn-sm register-btn">
                <i className="fas fa-user-plus"></i>
                <span className="register-text">Register</span>
              </Link>
            </li>
          )}

          {/* AFTER LOGIN → ROLE-BASED NAVIGATION */}
          {user && (
            <>
              {/* Home */}
              <li>
                <Link to="/home" className={isActive('/home') ? 'active' : ''}>
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>

              {/* Analytics - ADD THIS LINK */}
              <li>
                <Link
                  to="/analytics"
                  className={isActive('/analytics') ? 'active' : ''}
                >
                  <i className="fas fa-chart-bar"></i> Analytics
                </Link>
              </li>

              {/* AUTHOR ROUTES */}
              {user.role === 'author' && (
                <>
                  <li>
                    <Link
                      to="/submit-paper"
                      className={isActive('/submit-paper') ? 'active' : ''}
                    >
                      <i className="fas fa-plus"></i> Submit Paper
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/my-papers"
                      className={isActive('/my-papers') ? 'active' : ''}
                    >
                      <i className="fas fa-file-alt"></i> My Papers
                    </Link>
                  </li>
                </>
              )}

              {/* EDITOR ROUTE */}
              {user.role === 'editor' && (
                <li>
                  <Link
                    to="/editor-dashboard"
                    className={isActive('/editor-dashboard') ? 'active' : ''}
                  >
                    <i className="fas fa-edit"></i> Editor Dashboard
                  </Link>
                </li>
              )}

              {/* REVIEWER ROUTE */}
              {user.role === 'reviewer' && (
                <li>
                  <Link
                    to="/reviewer-dashboard"
                    className={isActive('/reviewer-dashboard') ? 'active' : ''}
                  >
                    <i className="fas fa-clipboard-check"></i> Reviewer Dashboard
                  </Link>
                </li>
              )}

              {/* PROFILE + LOGOUT */}
              <li className="user-menu">
                <Link
                  to="/profile"
                  className={isActive('/profile') ? 'active' : ''}
                >
                  <i className="fas fa-user"></i> {user.name}
                </Link>

                <button onClick={logout} className="btn btn-outline btn-sm">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;