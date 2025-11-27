// services/api.js
// API service functions for interacting with the backend

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Helper function for making API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  register: (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  logout: () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
  
  getCurrentUser: () => {
    return apiRequest('/auth/me');
  },
};

// Papers API calls
export const papersAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/papers?${queryString}`);
  },
  
  getById: (id) => {
    return apiRequest(`/papers/${id}`);
  },
  
  create: (paperData) => {
    return apiRequest('/papers', {
      method: 'POST',
      body: JSON.stringify(paperData),
    });
  },
  
  update: (id, paperData) => {
    return apiRequest(`/papers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(paperData),
    });
  },
  
  delete: (id) => {
    return apiRequest(`/papers/${id}`, {
      method: 'DELETE',
    });
  },
  
  submit: (id) => {
    return apiRequest(`/papers/${id}/submit`, {
      method: 'POST',
    });
  },
};

// Reviews API calls
export const reviewsAPI = {
  getForPaper: (paperId) => {
    return apiRequest(`/papers/${paperId}/reviews`);
  },
  
  create: (paperId, reviewData) => {
    return apiRequest(`/papers/${paperId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
  
  update: (paperId, reviewId, reviewData) => {
    return apiRequest(`/papers/${paperId}/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },
};

// Users API calls
export const usersAPI = {
  getAuthors: () => {
    return apiRequest('/users/authors');
  },
  
  getReviewers: () => {
    return apiRequest('/users/reviewers');
  },
  
  assignReviewer: (paperId, reviewerId) => {
    return apiRequest(`/papers/${paperId}/reviewers`, {
      method: 'POST',
      body: JSON.stringify({ reviewerId }),
    });
  },
};

export default apiRequest;