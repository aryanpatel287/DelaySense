import React from 'react';
import './SummaryTiles.css';
import { ReactComponent as BoxIcon } from '../box.svg';
import { ReactComponent as CurrencyDollarIcon } from '../currency-dollar.svg';
import { ReactComponent as TruckIcon } from '../delay-icon.svg';

const SummaryTiles = ({ storeData, delays }) => {
  const totalEstimatedLoss = delays.reduce((sum, delay) => sum + delay.estimatedLoss, 0);
  const totalAffectedSKUs = delays.reduce((sum, delay) => sum + delay.skuCount, 0);
  const estimatedProfit = 25000; // Mock data for estimated profit

  const tiles = [
    {
      title: 'Active Delays',
      value: storeData.currentDelays,
      icon: <TruckIcon className="tile-svg" />,
      color: '#e53e3e',
      bgColor: '#fed7d7'
    },
    {
      title: 'Est. Loss Today',
      value: `$${totalEstimatedLoss.toLocaleString()}`,
      icon: <CurrencyDollarIcon className="tile-svg" />,
      color: '#d69e2e',
      bgColor: '#fef5e7'
    },
    {
      title: 'Estimated Profit',
      value: `$${estimatedProfit.toLocaleString()}`,
      icon: <CurrencyDollarIcon className="tile-svg" />,
      color: '#38a169',
      bgColor: '#c6f6d5'
    },
    {
      title: 'Affected SKUs',
      value: totalAffectedSKUs,
      icon: <BoxIcon className="tile-svg" />,
      color: '#3182ce',
      bgColor: '#bee3f8'
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