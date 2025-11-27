import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    institution: 'University of Research',
    department: 'Computer Science',
    bio: 'Researcher focused on innovative solutions in technology and science.',
    expertise: ['Machine Learning', 'Data Science', 'AI'],
    orcid: '0000-0000-0000-0000'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to the backend here
    console.log('Profile updated:', profileData);
  };

  return (
    <div className="dashboard" style={{marginTop: '80px'}}>
      <div className="dashboard-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and research profile</p>
      </div>

      <div className="dashboard-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="profile-info">
              <h2>{profileData.name}</h2>
              <p className="profile-role">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
              <p className="profile-institution">{profileData.institution}</p>
            </div>
            <button 
              className="btn btn-outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              <i className="fas fa-edit"></i>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  ) : (
                    <p>{profileData.name}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  ) : (
                    <p>{profileData.email}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Institution</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.institution}
                      onChange={(e) => setProfileData({...profileData, institution: e.target.value})}
                    />
                  ) : (
                    <p>{profileData.institution}</p>
                  )}
                </div>
                <div className="info-item">
                  <label>Department</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    />
                  ) : (
                    <p>{profileData.department}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Research Profile</h3>
              <div className="info-item">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows="4"
                  />
                ) : (
                  <p>{profileData.bio}</p>
                )}
              </div>
              <div className="info-item">
                <label>Areas of Expertise</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.expertise.join(', ')}
                    onChange={(e) => setProfileData({...profileData, expertise: e.target.value.split(', ')})}
                    placeholder="Enter expertise areas separated by commas"
                  />
                ) : (
                  <div className="expertise-tags">
                    {profileData.expertise.map((exp, index) => (
                      <span key={index} className="expertise-tag">{exp}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="info-item">
                <label>ORCID ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.orcid}
                    onChange={(e) => setProfileData({...profileData, orcid: e.target.value})}
                  />
                ) : (
                  <p>{profileData.orcid}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fas fa-save"></i>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;