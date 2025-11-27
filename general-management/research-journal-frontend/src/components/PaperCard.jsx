// components/PaperCard.jsx
import React from 'react';

const PaperCard = ({ paper, onAction, actionText }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      submitted: 'status-submitted',
      under_review: 'status-under-review',
      revisions_requested: 'status-revisions',
      accepted: 'status-accepted',
      rejected: 'status-rejected'
    };

    const statusText = {
      submitted: 'Submitted',
      under_review: 'Under Review',
      revisions_requested: 'Revisions Requested',
      accepted: 'Accepted',
      rejected: 'Rejected'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  return (
    <div className="paper-card">
      <div className="paper-header">
        <h3 className="paper-title">{paper.title}</h3>
        {getStatusBadge(paper.status)}
      </div>
      <div className="paper-authors">
        {paper.authors.join(', ')}
      </div>
      <div className="paper-abstract">
        {paper.abstract.length > 150 
          ? `${paper.abstract.substring(0, 150)}...` 
          : paper.abstract
        }
      </div>
      <div className="paper-meta">
        <span className="submission-date">
          Submitted: {formatDate(paper.submissionDate)}
        </span>
        {paper.keywords && (
          <div className="paper-keywords">
            {paper.keywords.slice(0, 3).map((keyword, index) => (
              <span key={index} className="keyword-tag">{keyword}</span>
            ))}
          </div>
        )}
      </div>
      {onAction && actionText && (
        <div className="paper-actions">
          <button 
            onClick={() => onAction(paper)}
            className="btn btn-primary"
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaperCard;