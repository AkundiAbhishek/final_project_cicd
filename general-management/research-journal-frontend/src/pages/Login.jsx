import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginUser(credentials.email, credentials.password);

    if (result.success) {
      navigate('/home');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  // Demo credentials for instant access
  const demoCredentials = [
    { role: 'Author', email: 'author@demo.com', password: 'demo123' },
    { role: 'Editor', email: 'editor@demo.com', password: 'demo123' },
    { role: 'Reviewer', email: 'reviewer@demo.com', password: 'demo123' }
  ];

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setCredentials({ email: demoEmail, password: demoPassword });
    
    // Auto-submit after a short delay to show the credentials
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
        form.dispatchEvent(submitEvent);
      }
    }, 500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--gray-600)', marginBottom: '2rem' }}>
          Sign in to your ResearchHub account
        </p>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={credentials.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Try for Free Section */}
        <div className="demo-section">
          <div className="demo-header">
            <span className="demo-label">Try ResearchHub Free</span>
          </div>
          
          <div className="demo-credentials">
            <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--gray-600)' }}>
              Explore the platform with demo accounts:
            </p>
            
            <div className="demo-buttons">
              {demoCredentials.map((demo, index) => (
                <button
                  key={index}
                  type="button"
                  className="demo-btn"
                  onClick={() => handleDemoLogin(demo.email, demo.password)}
                >
                  <div className="demo-role">{demo.role}</div>
                  <div className="demo-email">{demo.email}</div>
                  <div className="demo-hint">Click to auto-fill</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Create one here</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/" className="btn btn-ghost btn-sm">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;