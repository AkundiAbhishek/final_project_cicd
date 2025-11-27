// pages/MyPapers.jsx - Enhanced with real operations
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyPapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPapers, setSelectedPapers] = useState(new Set());
  const [bulkAction, setBulkAction] = useState('');
  const navigate = useNavigate();

  // Mock API call - In real app, this would be papersAPI.getPapers()
  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          const mockPapers = [
            {
              id: 1,
              title: "Advanced Machine Learning Techniques for Predictive Analysis in Healthcare",
              status: "published",
              submissionDate: "2024-01-15",
              authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
              abstract: "This comprehensive study explores cutting-edge machine learning algorithms applied to predictive healthcare analytics...",
              keywords: ["machine learning", "healthcare", "predictive analytics"],
              journal: "Journal of AI Research",
              citations: 142,
              views: 2347,
              downloads: 892,
              score: 4.8,
              doi: "10.1234/jair.2024.001",
              lastUpdated: "2024-01-20"
            },
            {
              id: 2,
              title: "Blockchain Technology in Modern Supply Chain Management",
              status: "under_review",
              submissionDate: "2024-01-10",
              authors: ["Dr. James Wilson"],
              abstract: "Systematic analysis of blockchain implementation in global supply chains...",
              keywords: ["blockchain", "supply chain", "transparency"],
              journal: "International Journal of Technology",
              citations: 89,
              views: 1567,
              downloads: 543,
              score: 4.2,
              doi: null,
              lastUpdated: "2024-01-18"
            },
            {
              id: 3,
              title: "Sustainable Energy Solutions for Urban Environments",
              status: "revisions",
              submissionDate: "2024-01-05",
              authors: ["Prof. Robert Kim", "Dr. Maria Garcia"],
              abstract: "Comprehensive analysis of renewable energy implementations in smart city infrastructures...",
              keywords: ["renewable energy", "smart cities", "sustainability"],
              journal: "Environmental Science Review",
              citations: 0,
              views: 623,
              downloads: 187,
              score: null,
              doi: null,
              lastUpdated: "2024-01-12"
            }
          ];
          setPapers(mockPapers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching papers:', error);
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const filters = [
    { key: 'all', label: 'All Papers', count: papers.length },
    { key: 'published', label: 'Published', count: papers.filter(p => p.status === 'published').length },
    { key: 'under_review', label: 'Under Review', count: papers.filter(p => p.status === 'under_review').length },
    { key: 'revisions', label: 'Revisions', count: papers.filter(p => p.status === 'revisions').length },
    { key: 'draft', label: 'Drafts', count: papers.filter(p => p.status === 'draft').length }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      published: { class: 'published', icon: 'fas fa-check', label: 'Published', color: '#10b981', action: 'View' },
      under_review: { class: 'under-review', icon: 'fas fa-clock', label: 'Under Review', color: '#f59e0b', action: 'Track' },
      revisions: { class: 'revisions', icon: 'fas fa-edit', label: 'Revisions Requested', color: '#8b5cf6', action: 'Revise' },
      draft: { class: 'draft', icon: 'fas fa-edit', label: 'Draft', color: '#6b7280', action: 'Edit' }
    };
    return configs[status] || configs.draft;
  };

  const handlePaperAction = (paperId, action) => {
    const paper = papers.find(p => p.id === paperId);
    if (!paper) return;

    switch (action) {
      case 'view':
        // Navigate to paper detail page
        navigate(`/paper/${paperId}`);
        break;
      case 'edit':
        // Navigate to edit page
        navigate(`/edit-paper/${paperId}`);
        break;
      case 'track':
        // Navigate to tracking page
        navigate(`/track-paper/${paperId}`);
        break;
      case 'revise':
        // Navigate to revision page
        navigate(`/revise-paper/${paperId}`);
        break;
      case 'download':
        // Download paper
        handleDownload(paperId);
        break;
      case 'delete':
        handleDeletePaper(paperId);
        break;
      default:
        break;
    }
  };

  const handleDownload = (paperId) => {
    // Simulate download
    const paper = papers.find(p => p.id === paperId);
    if (paper) {
      alert(`Downloading: ${paper.title}`);
      // In real app: papersAPI.downloadPaper(paperId)
    }
  };

  const handleDeletePaper = (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper? This action cannot be undone.')) {
      setPapers(papers.filter(p => p.id !== paperId));
      // In real app: papersAPI.deletePaper(paperId)
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedPapers.size === 0) return;

    switch (bulkAction) {
      case 'download':
        alert(`Downloading ${selectedPapers.size} papers`);
        break;
      case 'export':
        alert(`Exporting ${selectedPapers.size} papers`);
        break;
      case 'delete':
        if (window.confirm(`Delete ${selectedPapers.size} papers? This cannot be undone.`)) {
          setPapers(papers.filter(p => !selectedPapers.has(p.id)));
          setSelectedPapers(new Set());
        }
        break;
      default:
        break;
    }
    setBulkAction('');
  };

  const togglePaperSelection = (paperId) => {
    const newSelected = new Set(selectedPapers);
    if (newSelected.has(paperId)) {
      newSelected.delete(paperId);
    } else {
      newSelected.add(paperId);
    }
    setSelectedPapers(newSelected);
  };

  const selectAllPapers = () => {
    if (selectedPapers.size === filteredPapers.length) {
      setSelectedPapers(new Set());
    } else {
      setSelectedPapers(new Set(filteredPapers.map(p => p.id)));
    }
  };

  const filteredPapers = activeFilter === 'all' 
    ? papers 
    : papers.filter(paper => paper.status === activeFilter);

  if (loading) {
    return (
      <div className="premium-dashboard">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your research papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-dashboard">
      {/* Header */}
      <div className="page-header premium">
        <div className="header-content">
          <h1 className="page-title">My Research Portfolio</h1>
          <p className="page-subtitle">
            Manage {papers.length} research papers, track submissions, and monitor impact
          </p>
        </div>
        <div className="header-actions">
          <Link to="/submit-paper" className="premium-btn primary large">
            <i className="fas fa-plus"></i>
            Submit New Paper
          </Link>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPapers.size > 0 && (
        <div className="bulk-actions-bar">
          <div className="bulk-info">
            <strong>{selectedPapers.size}</strong> papers selected
          </div>
          <select 
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="premium-select"
          >
            <option value="">Bulk Actions</option>
            <option value="download">Download Selected</option>
            <option value="export">Export Metadata</option>
            <option value="delete">Delete Selected</option>
          </select>
          <button 
            className="premium-btn primary"
            onClick={handleBulkAction}
            disabled={!bulkAction}
          >
            Apply
          </button>
          <button 
            className="premium-btn outline"
            onClick={() => setSelectedPapers(new Set())}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Stats Overview */}
      <div className="stats-overview">
        {filters.map(filter => (
          <div 
            key={filter.key}
            className={`stat-item ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            <div className="stat-number">{filter.count}</div>
            <div className="stat-label">{filter.label}</div>
          </div>
        ))}
      </div>

      {/* Papers Grid */}
      <div className="papers-container premium">
        {filteredPapers.map(paper => {
          const statusConfig = getStatusConfig(paper.status);
          
          return (
            <div key={paper.id} className="paper-card premium">
              <div className="paper-header">
                <div className="paper-status" style={{ borderLeftColor: statusConfig.color }}>
                  <i className={statusConfig.icon}></i>
                  <span>{statusConfig.label}</span>
                </div>
                <div className="paper-actions">
                  <input
                    type="checkbox"
                    checked={selectedPapers.has(paper.id)}
                    onChange={() => togglePaperSelection(paper.id)}
                    className="paper-checkbox"
                  />
                  <div className="dropdown">
                    <button className="icon-btn">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <div className="dropdown-menu">
                      <button onClick={() => handlePaperAction(paper.id, 'view')}>
                        <i className="fas fa-eye"></i> View Details
                      </button>
                      <button onClick={() => handlePaperAction(paper.id, statusConfig.action.toLowerCase())}>
                        <i className={statusConfig.icon}></i> {statusConfig.action}
                      </button>
                      <button onClick={() => handlePaperAction(paper.id, 'download')}>
                        <i className="fas fa-download"></i> Download
                      </button>
                      <hr />
                      <button 
                        onClick={() => handlePaperAction(paper.id, 'delete')}
                        className="danger"
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="paper-content">
                <h3 className="paper-title">{paper.title}</h3>
                <p className="paper-authors">
                  <i className="fas fa-users"></i>
                  {paper.authors.join(', ')}
                </p>
                <p className="paper-abstract">{paper.abstract}</p>
                
                <div className="paper-meta">
                  <div className="meta-item">
                    <i className="fas fa-calendar"></i>
                    Submitted: {new Date(paper.submissionDate).toLocaleDateString()}
                  </div>
                  {paper.journal && (
                    <div className="meta-item">
                      <i className="fas fa-book"></i>
                      {paper.journal}
                    </div>
                  )}
                  {paper.doi && (
                    <div className="meta-item">
                      <i className="fas fa-fingerprint"></i>
                      DOI: {paper.doi}
                    </div>
                  )}
                </div>

                <div className="paper-keywords">
                  {paper.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">#{keyword}</span>
                  ))}
                </div>

                <div className="paper-stats">
                  <div className="stat">
                    <i className="fas fa-eye"></i>
                    <span>{paper.views.toLocaleString()} views</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-download"></i>
                    <span>{paper.downloads} downloads</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-quote-right"></i>
                    <span>{paper.citations} citations</span>
                  </div>
                  {paper.score && (
                    <div className="stat">
                      <i className="fas fa-star"></i>
                      <span>{paper.score}/5.0</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="paper-footer">
                <button 
                  className="premium-btn outline"
                  onClick={() => handlePaperAction(paper.id, 'view')}
                >
                  <i className="fas fa-eye"></i>
                  View Details
                </button>
                <button 
                  className="premium-btn primary"
                  onClick={() => handlePaperAction(paper.id, statusConfig.action.toLowerCase())}
                >
                  <i className={statusConfig.icon}></i>
                  {statusConfig.action}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPapers.length === 0 && (
        <div className="empty-state premium">
          <div className="empty-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <h3>No papers found</h3>
          <p>
            {activeFilter === 'all' 
              ? "You haven't submitted any research papers yet."
              : `No papers match the "${filters.find(f => f.key === activeFilter)?.label}" filter.`
            }
          </p>
          <Link to="/submit-paper" className="premium-btn primary">
            <i className="fas fa-plus"></i>
            Submit Your First Paper
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPapers;