// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const stats = [
    { icon: 'fas fa-file-alt', value: '12', label: 'My Papers', color: 'var(--primary)' },
    { icon: 'fas fa-clipboard-check', value: '8', label: 'Reviews', color: 'var(--success)' },
    { icon: 'fas fa-users', value: '5', label: 'Collaborations', color: 'var(--info)' },
    { icon: 'fas fa-quote-right', value: '42', label: 'Citations', color: 'var(--accent)' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'submission',
      title: 'Paper Submitted',
      description: 'Advanced Machine Learning Techniques',
      time: '2 hours ago',
      icon: 'fas fa-paper-plane',
      color: 'var(--success)'
    },
    {
      id: 2,
      type: 'review',
      title: 'Review Assigned',
      description: 'Blockchain in Supply Chain Management',
      time: '1 day ago',
      icon: 'fas fa-clipboard-check',
      color: 'var(--warning)'
    },
    {
      id: 3,
      type: 'notification',
      title: 'Status Updated',
      description: 'Renewable Energy Solutions - Under Review',
      time: '2 days ago',
      icon: 'fas fa-bell',
      color: 'var(--info)'
    }
  ];

  const quickActions = [
    { icon: 'fas fa-paper-plane', label: 'Submit Paper', link: '/submit-paper', color: 'var(--primary)' },
    { icon: 'fas fa-file-alt', label: 'My Papers', link: '/my-papers', color: 'var(--success)' },
    { icon: 'fas fa-archive', label: 'Browse Archive', link: '/archive', color: 'var(--info)' },
    { icon: 'fas fa-chart-line', label: 'Analytics', link: '/analytics', color: 'var(--accent)' }
  ];

  return (
    <div className="premium-dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Welcome back, <span className="gradient-text">{user?.name}</span>!
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your research today
          </p>
        </div>
        {user?.role === 'author' && (
          <Link to="/submit-paper" className="premium-btn primary">
            <i className="fas fa-plus"></i>
            Submit New Paper
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card premium">
            <div className="stat-icon" style={{ background: stat.color }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
            <div className="stat-trend">
              <i className="fas fa-arrow-up"></i>
              <span>12%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="content-grid premium">
        {/* Left Column */}
        <div className="main-column">
          {/* Recent Activity */}
          <div className="premium-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <Link to="/activity" className="view-all">View All</Link>
            </div>
            <div className="card-content">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item premium">
                  <div className="activity-icon" style={{ background: activity.color }}>
                    <i className={activity.icon}></i>
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className="activity-badge">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Papers */}
          <div className="premium-card">
            <div className="card-header">
              <h3>Recent Papers</h3>
              <Link to="/my-papers" className="view-all">View All</Link>
            </div>
            <div className="card-content">
              <div className="papers-list">
                <div className="paper-item premium">
                  <div className="paper-badge published">
                    <i className="fas fa-check"></i>
                    Published
                  </div>
                  <h4>Advanced ML Techniques for Predictive Analysis</h4>
                  <p>Journal of Artificial Intelligence • 2 days ago</p>
                  <div className="paper-stats">
                    <span><i className="fas fa-eye"></i> 1.2K views</span>
                    <span><i className="fas fa-download"></i> 342 downloads</span>
                  </div>
                </div>
                <div className="paper-item premium">
                  <div className="paper-badge review">
                    <i className="fas fa-clock"></i>
                    Under Review
                  </div>
                  <h4>Blockchain Technology in Supply Chain</h4>
                  <p>International Journal of Technology • 1 week ago</p>
                  <div className="paper-stats">
                    <span><i className="fas fa-eye"></i> 856 views</span>
                    <span><i className="fas fa-comments"></i> 23 reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="sidebar-column">
          {/* Quick Actions */}
          <div className="premium-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-content">
              <div className="actions-grid">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.link} className="action-item premium">
                    <div className="action-icon" style={{ background: action.color }}>
                      <i className={action.icon}></i>
                    </div>
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Research Trends */}
          <div className="premium-card">
            <div className="card-header">
              <h3>Trending Topics</h3>
            </div>
            <div className="card-content">
              <div className="trends-list">
                {['Machine Learning', 'Blockchain', 'AI Ethics', 'Renewable Energy', 'Quantum Computing'].map((topic, index) => (
                  <div key={index} className="trend-item premium">
                    <div className="trend-rank">{index + 1}</div>
                    <div className="trend-content">
                      <h4>#{topic}</h4>
                      <p>{Math.floor(Math.random() * 1000) + 500} papers</p>
                    </div>
                    <div className="trend-growth">
                      <i className="fas fa-arrow-up"></i>
                      {Math.floor(Math.random() * 20) + 5}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="premium-card accent">
            <div className="card-header">
              <h3>Upcoming Deadlines</h3>
            </div>
            <div className="card-content">
              <div className="deadlines-list">
                <div className="deadline-item">
                  <div className="deadline-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="deadline-content">
                    <h4>Review Submission</h4>
                    <p>Blockchain Research Paper</p>
                    <span className="deadline-time">Due in 2 days</span>
                  </div>
                </div>
                <div className="deadline-item">
                  <div className="deadline-icon">
                    <i className="fas fa-edit"></i>
                  </div>
                  <div className="deadline-content">
                    <h4>Revisions Due</h4>
                    <p>ML Techniques Paper</p>
                    <span className="deadline-time">Due in 5 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;