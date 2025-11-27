// components/PaperStatusModal.jsx
import React, { useState } from 'react';

const PaperStatusModal = ({ paper, onClose, onSubmit }) => {
  const [status, setStatus] = useState(paper.status);
  const [decision, setDecision] = useState(paper.decision || '');
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    onSubmit(status, decision);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Update Paper Status: "{paper.title}"</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="revisions_requested">Revisions Requested</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {(status === 'revisions_requested' || status === 'accepted' || status === 'rejected') && (
            <div className="form-group">
              <label>Decision</label>
              <select value={decision} onChange={(e) => setDecision(e.target.value)}>
                <option value="">Select Decision</option>
                <option value="accept">Accept</option>
                <option value="minor_revisions">Minor Revisions</option>
                <option value="major_revisions">Major Revisions</option>
                <option value="reject">Reject</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Comments to Author (Optional)</label>
            <textarea 
              value={comments} 
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide feedback or instructions for the author..."
              rows="4"
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperStatusModal;