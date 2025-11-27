import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'RESEARCHER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...payload } = userData;
      await axios.post('http://localhost:8082/auth/register', payload, {
        withCredentials: true
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={userData.username} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={userData.role} onChange={handleChange}>
              <option value="RESEARCHER">Researcher</option>
              <option value="REVIEWER">Reviewer</option>
              <option value="EDITOR">Editor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={userData.password} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required/>
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
