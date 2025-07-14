import React, { useState, useRef } from 'react';
import './Dashboard.css';
import SummaryTiles from './SummaryTiles';
import MapSection from './MapSection';
// import ChartsSection from './ChartsSection';

const Dashboard = () => {
  const [storeData] = useState({
    storeId: 'STORE-001',
    storeName: 'Dashboard',
    location: '123 Main St, Downtown, CA 90210',
    currentDelays: 3,
    estimatedLoss: 15420
  });

  const [delays] = useState([
    {
      id: 1,
      truckId: 'TRK-001',
      origin: 'DC-North',
      eta: '14:30',
      ata: '15:45',
      delayMinutes: 75,
      estimatedLoss: 5200,
      skuCount: 150,
      criticalSKUs: 12
    },
    {
      id: 2,
      truckId: 'TRK-002',
      origin: 'DC-East',
      eta: '16:00',
      ata: '16:30',
      delayMinutes: 30,
      estimatedLoss: 3200,
      skuCount: 85,
      criticalSKUs: 8
    },
    {
      id: 3,
      truckId: 'TRK-003',
      origin: 'DC-West',
      eta: '17:30',
      ata: '18:15',
      delayMinutes: 45,
      estimatedLoss: 7000,
      skuCount: 200,
      criticalSKUs: 25
    }
  ]);

  // Ref for the Active Delays & Impact Analysis section
  const activeDelaysRef = useRef(null);

  // Handler to scroll to the Active Delays section
  const scrollToActiveDelays = () => {
    if (activeDelaysRef.current) {
      activeDelaysRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="dashboard" >
      <div className="store-title" >
        {storeData.storeName}
      </div>
      <main className="dashboard-main">
        {/* Top Section - Summary Tiles */}
        <section className="summary-section">
          <SummaryTiles storeData={storeData} delays={delays} onActiveDelaysClick={scrollToActiveDelays} />
        </section>
        {/* Middle Section - Map and Details */}
        <section className="main-content-section" ref={activeDelaysRef}>
          <MapSection delays={delays} />
        </section>
        {/* Bottom Section - Charts */}
        {/* <section >
          <ChartsSection delays={delays} />
        </section> */}
      </main>
    </div>
  );
};

export default Dashboard; 