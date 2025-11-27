// pages/SubmitPaper.jsx - Enhanced with real validation
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitPaper = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    authors: [{ name: '', email: '', affiliation: '', corresponding: true }],
    correspondingAuthor: '',
    email: '',
    institution: '',
    department: '',
    journal: '',
    researchArea: '',
    funding: '',
    conflicts: '',
    file: null,
    agreeToTerms: false
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Paper Details', icon: 'fas fa-file-alt' },
    { number: 2, title: 'Author Information', icon: 'fas fa-users' },
    { number: 3, title: 'Additional Info', icon: 'fas fa-info-circle' },
    { number: 4, title: 'Review & Submit', icon: 'fas fa-check-circle' }
  ];

  const journals = [
    'Journal of AI Research',
    'International Journal of Technology',
    'Environmental Science Review',
    'Quantum Science Journal',
    'Computational Linguistics',
    'Journal of Cybersecurity',
    'Nature',
    'Science',
    'IEEE Transactions'
  ];

  const researchAreas = [
    'Artificial Intelligence',
    'Machine Learning',
    'Blockchain',
    'Cybersecurity',
    'Data Science',
    'Renewable Energy',
    'Quantum Computing',
    'Biotechnology',
    'Climate Science',
    'Healthcare Technology'
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Paper title is required';
        if (!formData.abstract.trim()) newErrors.abstract = 'Abstract is required';
        if (formData.abstract.length < 200) newErrors.abstract = 'Abstract must be at least 200 characters';
        if (!formData.keywords.trim()) newErrors.keywords = 'Keywords are required';
        break;
      
      case 2:
        if (formData.authors.some(author => !author.name.trim())) {
          newErrors.authors = 'All authors must have a name';
        }
        if (!formData.authors.some(author => author.corresponding)) {
          newErrors.corresponding = 'Please designate a corresponding author';
        }
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.institution) newErrors.institution = 'Institution is required';
        break;
      
      case 3:
        if (!formData.journal) newErrors.journal = 'Please select a target journal';
        if (!formData.researchArea) newErrors.researchArea = 'Research area is required';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
        break;
      
      case 4:
        if (!formData.file) newErrors.file = 'Please upload your paper';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAuthorChange = (index, field, value) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index][field] = value;
    
    // If setting as corresponding, unset others
    if (field === 'corresponding' && value) {
      updatedAuthors.forEach((author, i) => {
        if (i !== index) author.corresponding = false;
      });
    }
    
    setFormData(prev => ({ ...prev, authors: updatedAuthors }));
  };

  const addAuthor = () => {
    setFormData(prev => ({
      ...prev,
      authors: [...prev.authors, { name: '', email: '', affiliation: '', corresponding: false }]
    }));
  };

  const removeAuthor = (index) => {
    if (formData.authors.length > 1) {
      const updatedAuthors = formData.authors.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, authors: updatedAuthors }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In real app: papersAPI.createPaper(formData)
      console.log('Paper submitted:', formData);
      
      // Show success message and redirect
      alert('Paper submitted successfully! You will receive a confirmation email shortly.');
      navigate('/my-papers');
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <div className="step-header">
              <h3>Paper Information</h3>
              <p>Provide the core details about your research paper</p>
            </div>
            
            <div className="form-group premium">
              <label>Paper Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a clear and descriptive title for your research paper"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group premium">
              <label>Abstract *</label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                rows="6"
                placeholder="Provide a comprehensive abstract summarizing your research objectives, methodology, results, and conclusions (minimum 200 characters)"
                className={errors.abstract ? 'error' : ''}
              />
              <div className="input-meta">
                <span className={`char-count ${formData.abstract.length < 200 ? 'warning' : 'success'}`}>
                  {formData.abstract.length}/200 characters
                </span>
                {errors.abstract && <span className="error-message">{errors.abstract}</span>}
              </div>
            </div>

            <div className="form-group premium">
              <label>Keywords *</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="Enter relevant keywords separated by commas (e.g., machine learning, AI, data science)"
                className={errors.keywords ? 'error' : ''}
              />
              {errors.keywords && <span className="error-message">{errors.keywords}</span>}
              <div className="input-hint">These help others discover your research</div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <div className="step-header">
              <h3>Author Information</h3>
              <p>Provide details for all authors and corresponding information</p>
            </div>

            <div className="authors-section">
              <div className="section-header">
                <h4>Authors</h4>
                <button type="button" className="premium-btn outline sm" onClick={addAuthor}>
                  <i className="fas fa-plus"></i>
                  Add Author
                </button>
              </div>
              
              {formData.authors.map((author, index) => (
                <div key={index} className="author-card">
                  <div className="author-header">
                    <h5>Author {index + 1}</h5>
                    {formData.authors.length > 1 && (
                      <button 
                        type="button"
                        className="icon-btn danger"
                        onClick={() => removeAuthor(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                  
                  <div className="author-fields">
                    <div className="form-group premium">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={author.name}
                        onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                        placeholder="Author's full name"
                      />
                    </div>
                    
                    <div className="form-group premium">
                      <label>Email</label>
                      <input
                        type="email"
                        value={author.email}
                        onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                        placeholder="author@institution.edu"
                      />
                    </div>
                    
                    <div className="form-group premium">
                      <label>Affiliation</label>
                      <input
                        type="text"
                        value={author.affiliation}
                        onChange={(e) => handleAuthorChange(index, 'affiliation', e.target.value)}
                        placeholder="University or Institution"
                      />
                    </div>
                    
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={author.corresponding}
                          onChange={(e) => handleAuthorChange(index, 'corresponding', e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        Corresponding Author
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              
              {errors.authors && <span className="error-message">{errors.authors}</span>}
            </div>

            <div className="form-row">
              <div className="form-group premium">
                <label>Corresponding Author Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="corresponding.author@email.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group premium">
                <label>Institution *</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Your research institution"
                  className={errors.institution ? 'error' : ''}
                />
                {errors.institution && <span className="error-message">{errors.institution}</span>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <div className="step-header">
              <h3>Additional Information</h3>
              <p>Provide additional details for better processing</p>
            </div>

            <div className="form-row">
              <div className="form-group premium">
                <label>Target Journal *</label>
                <select 
                  name="journal"
                  value={formData.journal}
                  onChange={handleChange}
                  className={errors.journal ? 'error' : ''}
                >
                  <option value="">Select a journal</option>
                  {journals.map(journal => (
                    <option key={journal} value={journal}>{journal}</option>
                  ))}
                </select>
                {errors.journal && <span className="error-message">{errors.journal}</span>}
              </div>

              <div className="form-group premium">
                <label>Research Area *</label>
                <select 
                  name="researchArea"
                  value={formData.researchArea}
                  onChange={handleChange}
                  className={errors.researchArea ? 'error' : ''}
                >
                  <option value="">Select research area</option>
                  {researchAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                {errors.researchArea && <span className="error-message">{errors.researchArea}</span>}
              </div>
            </div>

            <div className="form-group premium">
              <label>Funding Information</label>
              <input
                type="text"
                name="funding"
                value={formData.funding}
                onChange={handleChange}
                placeholder="Grant numbers, funding agencies, etc."
              />
            </div>

            <div className="form-group premium">
              <label>Potential Conflicts of Interest</label>
              <textarea
                name="conflicts"
                value={formData.conflicts}
                onChange={handleChange}
                rows="3"
                placeholder="Disclose any potential conflicts of interest"
              />
            </div>

            <div className="checkbox-group large">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                I confirm that this manuscript is original, has not been published before, and is not currently being considered for publication elsewhere.
              </label>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <div className="step-header">
              <h3>Review & Submit</h3>
              <p>Review your submission and upload the final paper</p>
            </div>

            <div className="form-group premium">
              <label>Upload Paper (PDF) *</label>
              <div className={`file-upload premium ${errors.file ? 'error' : ''}`}>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  accept=".pdf"
                />
                <div className="file-upload-content">
                  {formData.file ? (
                    <>
                      <i className="fas fa-file-pdf"></i>
                      <h4>{formData.file.name}</h4>
                      <p>File ready for submission</p>
                      <small>Size: {(formData.file.size / 1024 / 1024).toFixed(2)} MB</small>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-cloud-upload-alt"></i>
                      <h4>Upload your research paper</h4>
                      <p>Click to browse or drag and drop your file here</p>
                      <small>Supported format: PDF (Max 10MB)</small>
                    </>
                  )}
                </div>
              </div>
              {errors.file && <span className="error-message">{errors.file}</span>}
            </div>

            <div className="review-section">
              <h4>Submission Summary</h4>
              <div className="review-grid">
                <div className="review-item">
                  <label>Title:</label>
                  <span>{formData.title || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <label>Authors:</label>
                  <span>{formData.authors.map(a => a.name).join(', ') || 'Not provided'}</span>
                </div>
                <div className="review-item">
                  <label>Corresponding Author:</label>
                  <span>{formData.authors.find(a => a.corresponding)?.name || 'Not designated'}</span>
                </div>
                <div className="review-item">
                  <label>Target Journal:</label>
                  <span>{formData.journal || 'Not selected'}</span>
                </div>
                <div className="review-item">
                  <label>Research Area:</label>
                  <span>{formData.researchArea || 'Not selected'}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="premium-dashboard">
      {/* Header */}
      <div className="page-header premium">
        <div className="header-content">
          <h1 className="page-title">Submit Research Paper</h1>
          <p className="page-subtitle">Share your research with the global academic community</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        {steps.map(step => (
          <div key={step.number} className={`step ${currentStep >= step.number ? 'active' : ''}`}>
            <div className="step-number">
              <i className={step.icon}></i>
            </div>
            <div className="step-info">
              <div className="step-title">Step {step.number}</div>
              <div className="step-description">{step.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="form-container premium">
        <form onSubmit={handleSubmit}>
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" className="premium-btn outline" onClick={prevStep}>
                <i className="fas fa-arrow-left"></i>
                Previous
              </button>
            )}
            
            <div className="nav-spacer"></div>
            
            {currentStep < 4 ? (
              <button type="button" className="premium-btn primary" onClick={nextStep}>
                Next
                <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button 
                type="submit" 
                className="premium-btn success large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Submit Paper
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPaper;