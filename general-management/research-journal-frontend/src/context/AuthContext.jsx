// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

// Demo users data - moved outside component to prevent recreation
const demoUsers = {
  'author@demo.com': {
    id: 1,
    name: 'Demo Author',
    email: 'author@demo.com',
    role: 'author',
    institution: 'University of Research'
  },
  'editor@demo.com': {
    id: 2,
    name: 'Demo Editor',
    email: 'editor@demo.com',
    role: 'editor',
    institution: 'Research Publications Inc.'
  },
  'reviewer@demo.com': {
    id: 3,
    name: 'Demo Reviewer',
    email: 'reviewer@demo.com',
    role: 'reviewer',
    institution: 'Tech Institute'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo authentication
      if (email in demoUsers && password === 'demo123') {
        const userData = demoUsers[email];
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Invalid credentials. Use demo accounts or check your email/password.' 
        };
      }
    } catch (err) {
      return { 
        success: false, 
        message: 'Login failed. Please try again.' 
      };
    }
  };

  const registerUser = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, auto-login after registration
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        institution: userData.institution || 'Unknown Institution'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loginUser,
    registerUser,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;