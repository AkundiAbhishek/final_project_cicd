// pages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Mock analytics data - In real app, this would come from backend
  const analyticsData = {
    overview: {
      totalPapers: 47,
      totalCitations: 1247,
      hIndex: 18,
      i10Index: 32,
      monthlyViews: 15600,
      monthlyDownloads: 4200,
      collaborationScore: 87
    },
    citations: {
      yearly: [124, 189, 256, 342, 456, 589, 734, 896, 1045, 1247],
      byPaper: [
        { title: "Advanced ML in Healthcare", citations: 342, year: 2024 },
        { title: "Blockchain Supply Chain", citations: 289, year: 2024 },
        { title: "Renewable Energy Solutions", citations: 234, year: 2023 },
        { title: "Quantum Cryptography", citations: 187, year: 2023 },
        { title: "Neural Networks in NLP", citations: 156, year: 2023 }
      ]
    },
    readers: {
      geographic: [
        { country: "United States", readers: 4200, percentage: 27 },
        { country: "China", readers: 3800, percentage: 24 },
        { country: "Germany", readers: 2100, percentage: 13 },
        { country: "United Kingdom", readers: 1800, percentage: 12 },
        { country: "India", readers: 1500, percentage: 10 },
        { country: "Others", readers: 2200, percentage: 14 }
      ],
      institutions: [
        "Stanford University",
        "MIT",
        "Harvard University",
        "University of Cambridge",
        "ETH Zurich",
        "National University of Singapore"
      ]
    },
    impact: {
      fieldWeight: [
        { field: "AI/ML", percentage: 35, trend: "up" },
        { field: "Computer Science", percentage: 25, trend: "up" },
        { field: "Engineering", percentage: 20, trend: "stable" },
        { field: "Environmental Science", percentage: 15, trend: "up" },
        { field: "Mathematics", percentage: 5, trend: "down" }
      ],
      altmetrics: {
        news: 45,
        blogs: 89,
        twitter: 567,
        wikipedia: 12,
        policy: 8
      }
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'fas fa-chart-pie' },
    { id: 'citations', name: 'Citations', icon: 'fas fa-quote-right' },
    { id: 'readers', name: 'Readers', icon: 'fas fa-users' },
    { id: 'impact', name: 'Impact', icon: 'fas fa-bullseye' }
  ];

  const timeRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const renderOverview = () => (
    <div className="analytics-overview">
      <div className="metrics-grid">
        <div className="metric-card primary">
          <div className="metric-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="metric-content">
            <h3>{analyticsData.overview.totalPapers}</h3>
            <p>Total Papers</p>
          </div>
          <div className="metric-trend up">
            <i className="fas fa-arrow-up"></i>
            12%
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-icon">
            <i className="fas fa-quote-right"></i>
          </div>
          <div className="metric-content">
            <h3>{analyticsData.overview.totalCitations.toLocaleString()}</h3>
            <p>Total Citations</p>
          </div>
          <div className="metric-trend up">
            <i className="fas fa-arrow-up"></i>
            18%
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="metric-content">
            <h3>{analyticsData.overview.hIndex}</h3>
            <p>H-Index</p>
          </div>
          <div className="metric-trend up">
            <i className="fas fa-arrow-up"></i>
            2
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-icon">
            <i className="fas fa-eye"></i>
          </div>
          <div className="metric-content">
            <h3>{analyticsData.overview.monthlyViews.toLocaleString()}</h3>
            <p>Monthly Views</p>
          </div>
          <div className="metric-trend up">
            <i className="fas fa-arrow-up"></i>
            23%
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h4>Citation Growth</h4>
            <span className="chart-subtitle">Cumulative citations over time</span>
          </div>
          <div className="chart-placeholder">
            <div className="chart-visual">
              {analyticsData.citations.yearly.map((count, index) => (
                <div 
                  key={index}
                  className="chart-bar"
                  style={{ height: `${(count / 1247) * 100}%` }}
                  title={`Year ${2020 + index}: ${count} citations`}
                ></div>
              ))}
            </div>
            <div className="chart-labels">
              {[2020, 2021, 2022, 2023, 2024].map(year => (
                <span key={year}>{year}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h4>Research Impact</h4>
            <span className="chart-subtitle">Field distribution & influence</span>
          </div>
          <div className="chart-placeholder">
            <div className="impact-chart">
              {analyticsData.impact.fieldWeight.map((field, index) => (
                <div key={field.field} className="impact-item">
                  <div className="impact-bar">
                    <div 
                      className="impact-fill"
                      style={{ width: `${field.percentage}%` }}
                    ></div>
                  </div>
                  <div className="impact-info">
                    <span className="field-name">{field.field}</span>
                    <span className="field-percentage">{field.percentage}%</span>
                    <i className={`fas fa-arrow-${field.trend}`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="performance-grid">
        <div className="performance-card">
          <h4>Top Performing Papers</h4>
          <div className="papers-list">
            {analyticsData.citations.byPaper.map((paper, index) => (
              <div key={paper.title} className="paper-rank">
                <div className="rank-number">{index + 1}</div>
                <div className="paper-info">
                  <h5>{paper.title}</h5>
                  <p>{paper.citations} citations • {paper.year}</p>
                </div>
                <div className="citation-badge">
                  <i className="fas fa-quote-right"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="performance-card">
          <h4>Collaboration Network</h4>
          <div className="collaboration-stats">
            <div className="collab-metric">
              <div className="metric-value">{analyticsData.overview.collaborationScore}%</div>
              <div className="metric-label">Collaboration Score</div>
            </div>
            <div className="institution-list">
              <h5>Top Collaborating Institutions</h5>
              <ul>
                {analyticsData.readers.institutions.map((institution, index) => (
                  <li key={institution}>
                    <span className="institution-rank">{index + 1}</span>
                    {institution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCitations = () => (
    <div className="citations-analysis">
      <div className="analysis-header">
        <h3>Citation Analysis</h3>
        <p>Detailed breakdown of citation patterns and impact metrics</p>
      </div>
      
      <div className="citations-grid">
        <div className="citation-stats">
          <div className="stat-item">
            <div className="stat-value">{analyticsData.overview.hIndex}</div>
            <div className="stat-label">H-Index</div>
            <div className="stat-description">
              You have {analyticsData.overview.hIndex} papers with at least {analyticsData.overview.hIndex} citations each
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">{analyticsData.overview.i10Index}</div>
            <div className="stat-label">i10-Index</div>
            <div className="stat-description">
              Number of publications with at least 10 citations
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-value">
              {Math.round(analyticsData.overview.totalCitations / analyticsData.overview.totalPapers)}
            </div>
            <div className="stat-label">Citations per Paper</div>
            <div className="stat-description">
              Average citation count across all publications
            </div>
          </div>
        </div>

        <div className="citation-trends">
          <h4>Citation Trends</h4>
          <div className="trends-list">
            {analyticsData.citations.byPaper.map(paper => (
              <div key={paper.title} className="trend-item">
                <div className="trend-info">
                  <h5>{paper.title}</h5>
                  <span className="trend-year">{paper.year}</span>
                </div>
                <div className="trend-metric">
                  <span className="citation-count">{paper.citations}</span>
                  <span className="metric-label">citations</span>
                </div>
                <div className="trend-badge">
                  <i className="fas fa-trending-up"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReaders = () => (
    <div className="readers-analysis">
      <div className="analysis-header">
        <h3>Reader Demographics</h3>
        <p>Geographic distribution and institutional engagement</p>
      </div>

      <div className="readers-grid">
        <div className="geographic-distribution">
          <h4>Geographic Distribution</h4>
          <div className="countries-list">
            {analyticsData.readers.geographic.map(country => (
              <div key={country.country} className="country-item">
                <div className="country-info">
                  <span className="country-name">{country.country}</span>
                  <span className="country-percentage">{country.percentage}%</span>
                </div>
                <div className="country-bar">
                  <div 
                    className="country-fill"
                    style={{ width: `${country.percentage}%` }}
                  ></div>
                </div>
                <div className="country-readers">{country.readers.toLocaleString()} readers</div>
              </div>
            ))}
          </div>
        </div>

        <div className="institutional-engagement">
          <h4>Institutional Engagement</h4>
          <div className="institutions-grid">
            {analyticsData.readers.institutions.map((institution, index) => (
              <div key={institution} className="institution-card">
                <div className="institution-rank">{index + 1}</div>
                <div className="institution-name">{institution}</div>
                <div className="engagement-level">
                  <div className="engagement-dots">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`dot ${i < 4 - index ? 'active' : ''}`}
                      ></div>
                    ))}
                  </div>
                  <span>High Engagement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderImpact = () => (
    <div className="impact-analysis">
      <div className="analysis-header">
        <h3>Research Impact</h3>
        <p>Field influence and alternative metrics</p>
      </div>

      <div className="impact-grid">
        <div className="field-influence">
          <h4>Field Influence Distribution</h4>
          <div className="influence-chart">
            {analyticsData.impact.fieldWeight.map(field => (
              <div key={field.field} className="influence-item">
                <div className="influence-header">
                  <span className="field-name">{field.field}</span>
                  <span className="field-percentage">{field.percentage}%</span>
                </div>
                <div className="influence-bar">
                  <div 
                    className="influence-fill"
                    style={{ width: `${field.percentage}%` }}
                    data-trend={field.trend}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="altmetrics">
          <h4>Alternative Metrics</h4>
          <div className="altmetrics-grid">
            <div className="altmetric-card">
              <div className="altmetric-icon">
                <i className="fas fa-newspaper"></i>
              </div>
              <div className="altmetric-value">{analyticsData.impact.altmetrics.news}</div>
              <div className="altmetric-label">News Mentions</div>
            </div>
            
            <div className="altmetric-card">
              <div className="altmetric-icon">
                <i className="fas fa-blog"></i>
              </div>
              <div className="altmetric-value">{analyticsData.impact.altmetrics.blogs}</div>
              <div className="altmetric-label">Blog Posts</div>
            </div>
            
            <div className="altmetric-card">
              <div className="altmetric-icon">
                <i className="fab fa-twitter"></i>
              </div>
              <div className="altmetric-value">{analyticsData.impact.altmetrics.twitter}</div>
              <div className="altmetric-label">Twitter Mentions</div>
            </div>
            
            <div className="altmetric-card">
              <div className="altmetric-icon">
                <i className="fab fa-wikipedia-w"></i>
              </div>
              <div className="altmetric-value">{analyticsData.impact.altmetrics.wikipedia}</div>
              <div className="altmetric-label">Wikipedia Citations</div>
            </div>
            
            <div className="altmetric-card">
              <div className="altmetric-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <div className="altmetric-value">{analyticsData.impact.altmetrics.policy}</div>
              <div className="altmetric-label">Policy Documents</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'citations':
        return renderCitations();
      case 'readers':
        return renderReaders();
      case 'impact':
        return renderImpact();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="premium-dashboard">
      {/* Header */}
      <div className="page-header premium">
        <div className="header-content">
          <h1 className="page-title">Research Analytics</h1>
          <p className="page-subtitle">
            Track your research impact, citations, and reader engagement
          </p>
        </div>
        <div className="header-controls">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="premium-select"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="premium-btn outline">
            <i className="fas fa-download"></i>
            Export Report
          </button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <div className="analytics-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={tab.icon}></i>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      )}

      {/* Tab Content */}
      <div className="analytics-content">
        {renderTabContent()}
      </div>

      {/* Insights Section */}
      <div className="insights-section">
        <div className="insights-header">
          <h3>Research Insights</h3>
          <p>Actionable recommendations based on your analytics</p>
        </div>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon success">
              <i className="fas fa-rocket"></i>
            </div>
            <div className="insight-content">
              <h4>High Impact Area</h4>
              <p>Your AI/ML research shows strong growth. Consider focusing more resources here.</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon warning">
              <i className="fas fa-handshake"></i>
            </div>
            <div className="insight-content">
              <h4>Collaboration Opportunity</h4>
              <p>Strong engagement from European institutions suggests potential collaboration opportunities.</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon info">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="insight-content">
              <h4>Citation Growth</h4>
              <p>Your citation rate is increasing 18% YoY. Consider promoting your work on academic networks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
