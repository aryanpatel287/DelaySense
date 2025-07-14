import React, { useState } from 'react';
import './MapSection.css';

const MapSection = ({ delays }) => {
  const [selectedDelay, setSelectedDelay] = useState(delays[0]);

  const getDelaySeverity = (minutes) => {
    if (minutes > 60) return 'critical';
    if (minutes > 30) return 'high';
    return 'medium';
  };

  const getActionRecommendations = (delay) => {
    const recommendations = [];
    
    if (delay.criticalSKUs > 10) {
      recommendations.push('Prioritize cold-chain items for immediate unloading');
    }
    
    if (delay.delayMinutes > 60) {
      recommendations.push('Contact DC for expedited processing');
    }
    
    if (delay.estimatedLoss > 5000) {
      recommendations.push('Review SKU demand rates and adjust ordering');
    }
    
    return recommendations.length > 0 ? recommendations : ['Monitor delay progression'];
  };

  return (
    <div className="map-section">
      <div className="section-header">
        <h2> Active Delays & Impact Analysis</h2>
        <p>Real-time monitoring of delivery delays and their impact on store operations</p>
      </div>
      
      <div className="map-content">
        {/* Left Side - Delay Details */}
        <div className="delay-details">
          <div className="delays-list">
            <h3>Active Delays</h3>
            {delays.map((delay) => (
              <div 
                key={delay.id}
                className={`delay-item ${selectedDelay.id === delay.id ? 'active' : ''} ${getDelaySeverity(delay.delayMinutes)}`}
                onClick={() => setSelectedDelay(delay)}
              >
                <div className="delay-header">
                  <span className="truck-id">{delay.truckId}</span>
                  <span className={`severity-badge ${getDelaySeverity(delay.delayMinutes)}`}>
                    {delay.delayMinutes}min
                  </span>
                </div>
                <div className="delay-info">
                  <p>From: {delay.origin}</p>
                  <p>ETA: {delay.eta} | ATA: {delay.ata}</p>
                </div>
                <div className="delay-metrics">
                  <span>${delay.estimatedLoss.toLocaleString()}</span>
                  <span>{delay.skuCount} SKUs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Map/Details */}
        <div className="map-details">
          <div className="selected-delay-details">
            <div className="detail-header">
              <h3>Truck {selectedDelay.truckId}</h3>
              <span className={`status-badge ${getDelaySeverity(selectedDelay.delayMinutes)}`}>
                {getDelaySeverity(selectedDelay.delayMinutes).toUpperCase()}
              </span>
            </div>
            
            <div className="detail-grid">
              <div className="detail-item">
                <label>Origin DC</label>
                <span>{selectedDelay.origin}</span>
              </div>
              <div className="detail-item">
                <label>Delay Duration</label>
                <span>{selectedDelay.delayMinutes} minutes</span>
              </div>
              <div className="detail-item">
                <label>Estimated Loss</label>
                <span>${selectedDelay.estimatedLoss.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <label>SKUs Affected</label>
                <span>{selectedDelay.skuCount}</span>
              </div>
              <div className="detail-item">
                <label>Critical SKUs</label>
                <span>{selectedDelay.criticalSKUs}</span>
              </div>
              <div className="detail-item">
                <label>ETA vs ATA</label>
                <span>{selectedDelay.eta} → {selectedDelay.ata}</span>
              </div>
            </div>

            <div className="recommendations">
              <h4>Action Recommendations</h4>
              <ul>
                {getActionRecommendations(selectedDelay).map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Simple Map Representation */}
          <div className="simple-map">
            <div className="map-container">
              <div className="store-location">
                <span className="store-marker">🏪</span>
                <span className="store-label">Store</span>
              </div>
              <div className="route-line"></div>
              <div className="dc-location">
                <span className="dc-marker">🏭</span>
                <span className="dc-label">{selectedDelay.origin}</span>
              </div>
              <div className="truck-position">
                <span className="truck-marker">🚛</span>
                <span className="truck-label">{selectedDelay.truckId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection; 