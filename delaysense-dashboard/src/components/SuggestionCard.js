import React from 'react';

const statusColors = {
  Critical: { bg: '#fed7d7', color: '#e53e3e' },
  High: { bg: '#fed7cc', color: '#dd6b20' },
  'Very High': { bg: '#e2e8f0', color: '#222' },
};

const SuggestionCard = ({
  icon, // JSX or SVG
  title,
  description,
  details, // array of { icon, text }
  status, // e.g. 'Critical', 'High', 'Very High'
  gain, // e.g. '$5,600'
  impact, // e.g. 'Very High'
  actionText, // e.g. 'Activate Cold Chain Protocol'
  onAction,
}) => {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      border: '1.5px solid #e3e8f0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>{icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>{title}</div>
            <div style={{ color: '#374151', fontSize: '1rem', marginTop: 2 }}>{description}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {status && (
            <span style={{
              background: statusColors[status]?.bg || '#e2e8f0',
              color: statusColors[status]?.color || '#222',
              borderRadius: '12px',
              padding: '0.3rem 0.9rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              marginRight: 0,
            }}>{status}</span>
          )}
          {gain && (
            <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.1rem', marginTop: 8 }}>
              $ {gain}
            </div>
          )}
        </div>
      </div>
      {details && (
        <div style={{ color: '#374151', fontSize: '1rem', margin: '0.5rem 0 0.5rem 2.5rem', display: 'flex', gap: '2rem' }}>
          {details.map((d, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {d.icon}
              {d.text}
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <div>
          {actionText && (
            <button
              onClick={onAction}
              style={{
                background: '#111827',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7rem 1.5rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              {actionText}
            </button>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {gain && (
            <span style={{ color: '#22c55e', background: '#e6f9ed', borderRadius: '8px', padding: '0.2rem 0.7rem', fontWeight: 600, fontSize: '1rem' }}>
              ${gain}
            </span>
          )}
          {impact && (
            <span style={{ background: '#e2e8f0', color: '#222', borderRadius: '8px', padding: '0.2rem 0.7rem', fontWeight: 700, fontSize: '1rem' }}>
              {impact}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard; 