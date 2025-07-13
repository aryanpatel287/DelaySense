import React, { useState } from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { ReactComponent as ExclamationIcon } from '../exclamation.svg';
import { ReactComponent as TruckLogo } from '../truck-logo.svg';
import { ReactComponent as ClockIcon } from '../clock.svg';
import { ReactComponent as CubeIcon } from '../box-seam.svg';
import { ReactComponent as BoxIcon } from '../box.svg';
import { ReactComponent as DollarIcon } from '../currency-dollar.svg';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler, Legend);

const mockDelays = [
  {
    id: 1,
    truckId: 'Truck T001',
    storeId: 'ST-4521',
    delayHours: 3.5,
    skuCount: 24,
    estimatedLoss: 12500,
    risk: 'Medium',
  },
  {
    id: 2,
    truckId: 'Truck T002',
    storeId: 'ST-7829',
    delayHours: 5.2,
    skuCount: 18,
    estimatedLoss: 18750,
    risk: 'High',
  },
  {
    id: 3,
    truckId: 'Truck T003',
    storeId: 'ST-3456',
    delayHours: 2.1,
    skuCount: 31,
    estimatedLoss: 8900,
    risk: 'Medium',
  },
  {
    id: 4,
    truckId: 'Truck T004',
    storeId: 'ST-9834',
    delayHours: 4.8,
    skuCount: 22,
    estimatedLoss: 15200,
    risk: 'High',
  },
];

const timeRanges = [
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
];

const chartDataSets = {
  '1D': {
    labels: ['7/12'],
    data: [189.2],
  },
  '1W': {
    labels: ['7/6', '7/7', '7/8', '7/9', '7/10', '7/11', '7/12'],
    data: [186.5, 185.8, 187.2, 189.86, 191.1, 190.5, 189.2],
  },
  '1M': {
    labels: ['6/13', '6/20', '6/27', '7/4', '7/11'],
    data: [180.2, 182.5, 185.1, 188.3, 189.2],
  },
  '3M': {
    labels: ['5/1', '5/15', '6/1', '6/15', '7/1', '7/12'],
    data: [170.1, 175.3, 180.2, 185.8, 188.9, 189.2],
  },
};

const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState('1W');
  const totalEstimatedLoss = mockDelays.reduce((sum, delay) => sum + delay.estimatedLoss, 0);
  const totalAffectedSKU = mockDelays.reduce((sum, delay) => sum + delay.skuCount, 0);

  const chartData = chartDataSets[selectedRange];
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Price',
        data: chartData.data,
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: ctx => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(37,99,235,0.15)');
          gradient.addColorStop(1, 'rgba(37,99,235,0.01)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#2563eb',
        pointHoverBorderColor: '#fff',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (items) => `Date: ${items[0].label}`,
          label: (item) => `Price : $${item.formattedValue}`,
        },
        backgroundColor: '#fff',
        titleColor: '#222',
        bodyColor: '#2563eb',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        caretSize: 6,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: 'Date',
          color: '#888',
          font: { size: 14, weight: 'bold' },
        },
        ticks: {
          color: '#888',
          font: { size: 13 },
          callback: function(value, index, ticks) {
            // For 1M and 3M, show every 2nd label only
            if (selectedRange === '1M' || selectedRange === '3M') {
              return index % 2 === 0 ? this.getLabelForValue(value) : '';
            }
            // For 1W, show all 7 dates
            // For 1D, show the single date
            return this.getLabelForValue(value);
          },
        },
      },
      y: {
        grid: { color: '#f1f1f1' },
        title: {
          display: true,
          text: 'Amount ($)',
          color: '#888',
          font: { size: 14, weight: 'bold' },
        },
        ticks: { color: '#bbb', font: { size: 13 } },
      },
    },
  };

  return (
    <div className="dashboard-layout-fixed" style={{ background: '#f9fafb' }}>
      {/* Left column: flex column */}
      <div className="dashboard-left-col">
        <div className="dashboard-top-row">
          <div className="dashboard-card dashboard-card-top">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <BoxIcon style={{ width: 22, height: 22, color: '#2563eb' }} />
              <span>Affected SKU</span>
            </div>
            <div className="affected-sku-value">{totalAffectedSKU}</div>
          </div>
          <div className="dashboard-card dashboard-card-top">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <DollarIcon style={{ width: 22, height: 22, color: '#2563eb' }} />
              <span>Est. loss</span>
            </div>
            <div className="est-loss-value">${totalEstimatedLoss.toLocaleString()}</div>
          </div>
        </div>
        <div className="dashboard-card dashboard-card-mid graph-card-section">
          <div className="graph-header">
            <div>
              <div className="graph-title">Estimated Loss</div>
              <div className="graph-subtitle">Store Loss Trend</div>
            </div>
            <div className="graph-range-selector">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  className={`graph-range-btn${selectedRange === range.value ? ' active' : ''}`}
                  onClick={() => setSelectedRange(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          <div className="graph-chart">
            <Line data={data} options={{
              ...options,
              scales: {
                ...options.scales,
                x: {
                  ...options.scales.x,
                  ticks: {
                    ...options.scales.x.ticks,
                    callback: function(value, index, ticks) {
                      // For 1M and 3M, show every 2nd day label (e.g., 5/2, 5/4, ...)
                      if (selectedRange === '1M' || selectedRange === '3M') {
                        const label = this.getLabelForValue(value);
                        // Try to parse the day from the label (format: M/D)
                        const match = label.match(/(\d{1,2})\/(\d{1,2})/);
                        if (match) {
                          const day = parseInt(match[2], 10);
                          return day % 2 === 0 ? label : '';
                        }
                        return '';
                      }
                      // For 1W, show all 7 dates
                      // For 1D, show the single date
                      return this.getLabelForValue(value);
                    },
                  },
                },
              },
            }} height={260} />
          </div>
        </div>
      </div>
      {/* Right column: full height */}
      <div className="dashboard-card dashboard-card-right active-delay-summary" style={{ padding: '0 24px', fontSize: '0.97rem' }}>
        <div className="active-delay-header">
          <ExclamationIcon className="active-delay-icon" />
          <span className="active-delay-title">Delayed Trucks Summary</span>
        </div>
        <div className="active-delay-subtitle">Currently delayed trucks and their impact</div>
        <div className="active-delay-list">
          {mockDelays.map((delay) => (
            <div key={delay.id} className={`active-delay-row risk-${delay.risk.toLowerCase()}`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f6faff', borderRadius: 12, marginBottom: 14, padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <TruckLogo style={{ width: 32, height: 32, marginRight: 10, color: '#2563eb' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05em' }}>{delay.truckId}</div>
                  <div style={{ display: 'flex', gap: 18, marginTop: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#888', fontSize: '0.89em', fontWeight: 400 }}>
                      <ClockIcon style={{ width: 16, height: 16, marginRight: 4, verticalAlign: 'middle', color: '#2563eb' }} /> {delay.delayHours}h
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#888', fontSize: '0.89em', fontWeight: 400 }}>
                      <CubeIcon style={{ width: 16, height: 16, marginRight: 4, verticalAlign: 'middle', color: '#2563eb' }} /> {delay.skuCount}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <span className={`risk-badge risk-${delay.risk.toLowerCase()}`}
                  style={{
                    background: delay.risk === 'High' ? '#fee2e2' : delay.risk === 'Medium' ? '#fef9c3' : '#d1fae5',
                    color: delay.risk === 'High' ? '#991b1b' : delay.risk === 'Medium' ? '#b45309' : '#047857',
                    fontWeight: 500,
                    borderRadius: 20,
                    padding: '6px 18px',
                    fontSize: '0.93em',
                    minWidth: 90,
                    textAlign: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                  }}>
                  {delay.risk} Risk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 