// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 🔹 Global Styles
import './styles/global.css';
import './styles/dashboard.css';
import './styles/premium-dashboard.css';
import './styles/premium-papers.css';
import './styles/premium-forms.css';
import './styles/premium-archive.css';

// 🔹 Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// 🔹 Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AuthorDashboard from './pages/AuthorDashboard';
import EditorDashboard from './pages/EditorDashboard';
import ReviewerDashboard from './pages/ReviewerDashboard';
import SubmitPaper from './pages/SubmitPaper';
import MyPapers from './pages/MyPapers';
import Profile from './pages/Profile';

// 🔹 Auth Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />

          <main className="main-content">
            <Routes>

              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />

              {/* Author Routes */}
              <Route 
                path="/submit-paper" 
                element={
                  <ProtectedRoute allowedRoles={['author']}>
                    <SubmitPaper />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/my-papers" 
                element={
                  <ProtectedRoute allowedRoles={['author']}>
                    <MyPapers />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/author-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['author']}>
                    <AuthorDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Editor Route */}
              <Route 
                path="/editor-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['editor']}>
                    <EditorDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Reviewer Route */}
              <Route 
                path="/reviewer-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['reviewer']}>
                    <ReviewerDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Profile Page */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
