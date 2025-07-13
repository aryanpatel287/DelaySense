import React from 'react';
import './SummaryTiles.css';

const SummaryTiles = ({ storeData, delays }) => {
  const totalEstimatedLoss = delays.reduce((sum, delay) => sum + delay.estimatedLoss, 0);

  const tiles = [
    {
      title: 'Active Delays',
      value: storeData.currentDelays,
      icon: '🚛',
      color: '#e53e3e',
      bgColor: '#fed7d7'
    },
    {
      title: 'Est. Loss Today',
      value: `$${totalEstimatedLoss.toLocaleString()}`,
      icon: '💰',
      color: '#d69e2e',
      bgColor: '#fef5e7'
    }
  ];

  return (
    <div className="summary-tiles">
      {tiles.map((tile, index) => (
        <div key={index} className="summary-tile" style={{ borderLeftColor: tile.color }}>
          <div className="tile-icon" style={{ backgroundColor: tile.bgColor, color: tile.color }}>
            {tile.icon}
          </div>
          <div className="tile-content">
            <h3 className="tile-title">{tile.title}</h3>
            <p className="tile-value">{tile.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryTiles; 