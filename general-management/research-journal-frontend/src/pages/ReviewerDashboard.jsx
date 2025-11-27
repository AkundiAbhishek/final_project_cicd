// pages/ReviewerDashboard.jsx
import React, { useState, useEffect } from 'react';
import PaperCard from '../components/PaperCard';

const ReviewerDashboard = () => {
  const [papers, setPapers] = useState([]);
  const [activeTab, setActiveTab] = useState('assigned');

  useEffect(() => {
    // Simulate API call to fetch papers for review
    const fetchPapers = () => {
      const mockPapers = [
        {
          id: 1,
          title: 'Machine Learning Approaches to Natural Language Processing',
          authors: ['John Doe', 'Jane Smith'],
          abstract: 'This paper explores various machine learning techniques applied to natural language processing tasks, comparing their effectiveness across different domains and datasets.',
          status: 'under_review',
          submissionDate: '2023-05-15',
          keywords: ['ML', 'NLP', 'AI'],
          reviewDueDate: '2023-07-15'
        },
        {
          id: 2,
          title: 'Blockchain Technology for Secure Academic Credential Verification',
          authors: ['John Doe', 'Alan Turing'],
          abstract: 'We propose a blockchain-based system for verifying academic credentials that increases security and reduces fraudulent claims of educational attainment.',
          status: 'under_review',
          submissionDate: '2023-06-22',
          keywords: ['Blockchain', 'Education', 'Security'],
          reviewDueDate: '2023-07-30'
        },
        {
          id: 3,
          title: 'Quantum Computing: Current State and Future Prospects',
          authors: ['John Doe'],
          abstract: 'This comprehensive review examines the current state of quantum computing technology, its potential applications, and the challenges that remain before widespread adoption.',
          status: 'revisions_requested',
          submissionDate: '2023-04-10',
          keywords: ['Quantum Computing', 'Physics', 'Technology'],
          reviewDueDate: '2023-05-20'
        }
      ];
      setPapers(mockPapers);
    };

    fetchPapers();
  }, []);

  const filteredPapers = activeTab === 'all' 
    ? papers 
    : papers.filter(paper => paper.status === 'under_review');

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1>Reviewer Dashboard</h1>
          <div className="stats-overview">
            <div className="stat">
              <span className="stat-number">{papers.length}</span>
              <span className="stat-label">Assigned Reviews</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {papers.filter(p => p.status === 'under_review').length}
              </span>
              <span className="stat-label">Pending Reviews</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {papers.filter(p => p.status === 'revisions_requested').length}
              </span>
              <span className="stat-label">Completed Reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="tabs">
            <button 
              className={activeTab === 'assigned' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('assigned')}
            >
              Assigned Papers
            </button>
            <button 
              className={activeTab === 'completed' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('completed')}
            >
              Completed Reviews
            </button>
          </div>

          <div className="papers-grid">
            {filteredPapers.length > 0 ? (
              filteredPapers.map(paper => (
                <PaperCard 
                  key={paper.id} 
                  paper={paper} 
                  onAction={() => alert(`Review ${paper.title}`)}
                  actionText="Submit Review"
                />
              ))
            ) : (
              <div className="empty-state">
                <i className="fas fa-file-alt"></i>
                <h3>No papers found</h3>
                <p>You don't have any papers assigned for review.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;