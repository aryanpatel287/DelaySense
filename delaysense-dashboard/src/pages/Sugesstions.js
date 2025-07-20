import React from 'react';
import '../components/Dashboard.css';
import SuggestionCard from '../components/SuggestionCard';
import { ReactComponent as LightbulbIcon } from '../lightbulb.svg';
import { ReactComponent as SnowflakeIcon } from '../analytics.svg';
import { ReactComponent as ExclamationIcon } from '../exclamation.svg';
import { ReactComponent as BoxIcon } from '../box.svg';
import { ReactComponent as TruckIcon } from '../truck-transport.svg';

const actionSuggestions = [
  {
    icon: <SnowflakeIcon style={{ width: 32, height: 32, color: '#2563eb' }} />, // Cold chain
    title: 'Cold Chain Items Priority',
    description: 'Temperature-sensitive items require immediate attention to prevent spoilage',
    details: [
      { icon: <TruckIcon style={{ width: 20, height: 20, color: '#2563eb' }} />, text: '4 trucks' },
      { icon: <BoxIcon style={{ width: 20, height: 20, color: '#2563eb' }} />, text: '4 SKUs' },
      { icon: <span style={{ fontWeight: 600 }}>⏱️</span>, text: '~15 min' },
    ],
    status: 'Critical',
    gain: '5,600',
    impact: 'Very High',
    actionText: 'Activate Cold Chain Protocol',
  },
  {
    icon: <ExclamationIcon style={{ width: 32, height: 32, color: '#e53e3e' }} />, // Perishable
    title: 'Perishable Items at Risk',
    description: 'Time-sensitive products may spoil without immediate action',
    details: [
      { icon: <TruckIcon style={{ width: 20, height: 20, color: '#e53e3e' }} />, text: '4 trucks' },
      { icon: <BoxIcon style={{ width: 20, height: 20, color: '#e53e3e' }} />, text: '4 SKUs' },
      { icon: <span style={{ fontWeight: 600 }}>⏱️</span>, text: '~20 min' },
    ],
    status: 'High',
    gain: '3,250',
    impact: 'High',
    actionText: 'Expedite Processing',
  },
];

const returnSuggestions = [
  {
    icon: <BoxIcon style={{ width: 32, height: 32, color: '#2563eb' }} />,
    title: 'Return Pickup: Vendor Recall',
    description: 'Urgent vendor recall: Items must be returned within 2 hours to avoid penalties.',
    details: [
      { icon: <TruckIcon style={{ width: 20, height: 20, color: '#2563eb' }} />, text: '2 trucks' },
      { icon: <BoxIcon style={{ width: 20, height: 20, color: '#2563eb' }} />, text: '3 SKUs' },
      { icon: <span style={{ fontWeight: 600 }}>⏱️</span>, text: '~2 hr' },
    ],
    status: 'Critical',
    gain: '2,100',
    impact: 'Very High',
    actionText: 'Prioritize Return Pickup',
  },
  {
    icon: <BoxIcon style={{ width: 32, height: 32, color: '#d69e2e' }} />,
    title: 'Return Pickup: Overstock',
    description: 'Optimize return of overstock items to free up backroom space and maximize return value.',
    details: [
      { icon: <TruckIcon style={{ width: 20, height: 20, color: '#d69e2e' }} />, text: '1 truck' },
      { icon: <BoxIcon style={{ width: 20, height: 20, color: '#d69e2e' }} />, text: '5 SKUs' },
      { icon: <span style={{ fontWeight: 600 }}>⏱️</span>, text: '~1 hr' },
    ],
    status: 'High',
    gain: '1,400',
    impact: 'High',
    actionText: 'Schedule Return',
  },
];

const Sugesstions = () => {
  return (
    <div style={{ padding: '2rem 0', maxWidth: 1200, margin: '0 auto' }}>
      {/* Top Bar Title */}
      <div className="top-bar">Suggestions</div>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Smart Action Suggestions */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <LightbulbIcon style={{ width: 28, height: 28, color: '#2563eb' }} />
            <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Smart Action Suggestions</span>
          </div>
          <div style={{ color: '#64748b', marginBottom: 24, marginLeft: 40 }}>
            AI-powered recommendations with profit impact tracking
          </div>
          {actionSuggestions.map((s, i) => (
            <SuggestionCard key={i} {...s} />
          ))}
        </div>
        {/* Return Pickup Suggestions */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <BoxIcon style={{ width: 28, height: 28, color: '#2563eb' }} />
            <span style={{ fontSize: '1.3rem', fontWeight: 600 }}>Return Pickup Suggestions</span>
          </div>
          <div style={{ color: '#64748b', marginBottom: 24, marginLeft: 40 }}>
            Optimize reverse logistics by prioritizing urgent and high-value returns
          </div>
          {returnSuggestions.map((s, i) => (
            <SuggestionCard key={i} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sugesstions;
