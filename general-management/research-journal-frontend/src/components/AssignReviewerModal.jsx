// components/AssignReviewerModal.jsx
import React, { useState } from 'react';

const AssignReviewerModal = ({ paper, reviewers, onClose, onSubmit }) => {
  const [selectedReviewers, setSelectedReviewers] = useState(paper.assignedReviewers || []);

  const toggleReviewer = (reviewerId) => {
    if (selectedReviewers.includes(reviewerId)) {
      setSelectedReviewers(selectedReviewers.filter(id => id !== reviewerId));
    } else {
      setSelectedReviewers([...selectedReviewers, reviewerId]);
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedReviewers);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Assign Reviewers to "{paper.title}"</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="reviewer-selection">
            <h3>Available Reviewers</h3>
            <div className="reviewers-list">
              {reviewers.map(reviewer => (
                <div 
                  key={reviewer.id} 
                  className={`reviewer-item ${selectedReviewers.includes(reviewer.id) ? 'selected' : ''}`}
                  onClick={() => toggleReviewer(reviewer.id)}
                >
                  <div className="reviewer-info">
                    <h4>{reviewer.name}</h4>
                    <p>Expertise: {reviewer.expertise.join(', ')}</p>
                    <p>Availability: {reviewer.availability}</p>
                  </div>
                  <div className="reviewer-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedReviewers.includes(reviewer.id)}
                      onChange={() => toggleReviewer(reviewer.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Assign Reviewers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignReviewerModal;