// pages/AuthorDashboard.jsx
import React, { useState, useEffect } from 'react';
import PaperCard from '../components/PaperCard';

const AuthorDashboard = () => {
  const [papers, setPapers] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch author's papers
    const fetchPapers = () => {
      const mockPapers = [
        {
          id: 1,
          title: 'Machine Learning Approaches to Natural Language Processing',
          authors: ['John Doe', 'Jane Smith'],
          abstract: 'This paper explores various machine learning techniques applied to natural language processing tasks, comparing their effectiveness across different domains and datasets.',
          status: 'submitted',
          submissionDate: '2023-05-15',
          keywords: ['ML', 'NLP', 'AI']
        },
        {
          id: 2,
          title: 'Blockchain Technology for Secure Academic Credential Verification',
          authors: ['John Doe', 'Alan Turing'],
          abstract: 'We propose a blockchain-based system for verifying academic credentials that increases security and reduces fraudulent claims of educational attainment.',
          status: 'under_review',
          submissionDate: '2023-06-22',
          keywords: ['Blockchain', 'Education', 'Security']
        },
        {
          id: 3,
          title: 'Quantum Computing: Current State and Future Prospects',
          authors: ['John Doe'],
          abstract: 'This comprehensive review examines the current state of quantum computing technology, its potential applications, and the challenges that remain before widespread adoption.',
          status: 'revisions_requested',
          submissionDate: '2023-04-10',
          keywords: ['Quantum Computing', 'Physics', 'Technology']
        },
        {
          id: 4,
          title: 'Sustainable Energy Solutions for Urban Environments',
          authors: ['John Doe', 'Marie Curie', 'Albert Einstein'],
          abstract: 'Our research evaluates various sustainable energy approaches specifically tailored for high-density urban environments, considering both technical feasibility and economic factors.',
          status: 'accepted',
          submissionDate: '2023-01-30',
          keywords: ['Energy', 'Sustainability', 'Urban Planning']
        }
      ];
      setPapers(mockPapers);
    };

    fetchPapers();
  }, []);

  const filteredPapers = activeTab === 'all' 
    ? papers 
    : papers.filter(paper => paper.status === activeTab);

  const handleNewSubmission = () => {
    // Logic for new paper submission
    alert('This would open a form for new paper submission');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="container">
          <h1>Author Dashboard</h1>
          <button onClick={handleNewSubmission} className="btn btn-primary">
            <i className="fas fa-plus"></i> New Submission
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="tabs">
            <button 
              className={activeTab === 'all' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('all')}
            >
              All Papers
            </button>
            <button 
              className={activeTab === 'submitted' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('submitted')}
            >
              Submitted
            </button>
            <button 
              className={activeTab === 'under_review' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('under_review')}
            >
              Under Review
            </button>
            <button 
              className={activeTab === 'revisions_requested' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('revisions_requested')}
            >
              Revisions Requested
            </button>
            <button 
              className={activeTab === 'accepted' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('accepted')}
            >
              Accepted
            </button>
            <button 
              className={activeTab === 'rejected' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('rejected')}
            >
              Rejected
            </button>
          </div>

          <div className="papers-grid">
            {filteredPapers.length > 0 ? (
              filteredPapers.map(paper => (
                <PaperCard 
                  key={paper.id} 
                  paper={paper} 
                  onAction={() => alert(`View details for ${paper.title}`)}
                  actionText="View Details"
                />
              ))
            ) : (
              <div className="empty-state">
                <i className="fas fa-file-alt"></i>
                <h3>No papers found</h3>
                <p>You don't have any papers in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;