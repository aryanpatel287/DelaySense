import React from 'react';
import './ChartsSection.css';

const ChartsSection = ({ delays }) => {
  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', loss: 8500 },
    { day: 'Tue', loss: 12000 },
    { day: 'Wed', loss: 6800 },
    { day: 'Thu', loss: 15420 },
    { day: 'Fri', loss: 9200 },
    { day: 'Sat', loss: 11000 },
    { day: 'Sun', loss: 7800 }
  ];

  const topSKUs = [
    { name: 'Milk 2% 1L', loss: 2400, category: 'Cold-chain' },
    { name: 'Ground Beef 1lb', loss: 1800, category: 'Perishable' },
    { name: 'Bananas 1lb', loss: 1200, category: 'Perishable' },
    { name: 'Bread White', loss: 900, category: 'Perishable' },
    { name: 'Eggs 12ct', loss: 750, category: 'Cold-chain' }
  ];

  const maxLoss = Math.max(...weeklyData.map(d => d.loss));

  return (
    <div className="charts-section">
      <div className="section-header">
        <h2>📊 Analytics & Trends</h2>
        <p>Weekly loss trends and SKU impact analysis</p>
      </div>
      
      <div className="charts-grid">
        {/* Weekly Loss Trend */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Loss Trend</h3>
            <span className="chart-subtitle">Estimated losses by day</span>
          </div>
          <div className="chart-content">
            <div className="bar-chart">
              {weeklyData.map((data, index) => (
                <div key={index} className="bar-group">
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${(data.loss / maxLoss) * 100}%`,
                      backgroundColor: data.loss > 10000 ? '#e53e3e' : '#3182ce'
                    }}
                  ></div>
                  <span className="bar-label">{data.day}</span>
                  <span className="bar-value">${data.loss.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top SKUs at Risk */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Top SKUs at Risk</h3>
            <span className="chart-subtitle">Highest potential loss items</span>
          </div>
          <div className="chart-content">
            <div className="sku-list">
              {topSKUs.map((sku, index) => (
                <div key={index} className="sku-item">
                  <div className="sku-info">
                    <span className="sku-name">{sku.name}</span>
                    <span className={`sku-category ${sku.category.toLowerCase()}`}>
                      {sku.category}
                    </span>
                  </div>
                  <div className="sku-loss">
                    <span className="loss-amount">${sku.loss.toLocaleString()}</span>
                    <div className="loss-bar">
                      <div 
                        className="loss-fill" 
                        style={{ 
                          width: `${(sku.loss / 2400) * 100}%`,
                          backgroundColor: sku.loss > 1500 ? '#e53e3e' : '#dd6b20'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delay Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Delay Severity Distribution</h3>
            <span className="chart-subtitle">Current delays by severity</span>
          </div>
          <div className="chart-content">
            <div className="pie-chart">
              <div className="pie-segment critical" style={{ transform: 'rotate(0deg)' }}>
                <span className="segment-label">Critical</span>
                <span className="segment-value">1</span>
              </div>
              <div className="pie-segment high" style={{ transform: 'rotate(120deg)' }}>
                <span className="segment-label">High</span>
                <span className="segment-value">1</span>
              </div>
              <div className="pie-segment medium" style={{ transform: 'rotate(240deg)' }}>
                <span className="segment-label">Medium</span>
                <span className="segment-value">1</span>
              </div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color critical"></span>
                <span>Critical (&gt;60min)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color high"></span>
                <span>High (30-60min)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color medium"></span>
                <span>Medium (&lt;30min)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Summary */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Recommended Actions</h3>
            <span className="chart-subtitle">Priority actions for today</span>
          </div>
          <div className="chart-content">
            <div className="actions-list">
              <div className="action-item urgent">
                <span className="action-icon">🚨</span>
                <div className="action-content">
                  <h4>Prioritize Cold-chain Unloading</h4>
                  <p>12 critical SKUs require immediate attention</p>
                </div>
              </div>
              <div className="action-item high">
                <span className="action-icon">📞</span>
                <div className="action-content">
                  <h4>Contact DC-North</h4>
                  <p>TRK-001 delayed 75 minutes - expedite processing</p>
                </div>
              </div>
              <div className="action-item medium">
                <span className="action-icon">📋</span>
                <div className="action-content">
                  <h4>Review Return Pickups</h4>
                  <p>45 items ready for return - optimize space</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection; 