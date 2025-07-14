import React from 'react';
import '../components/Dashboard.css';

const trucks = [
  {
    truckId: 'T001',
    storeId: 'ST-4521',
    delayDuration: 3.5,
    totalLoss: 3615.15,
    skus: [
      {
        name: 'Frozen Pizza',
        tag: 'cold',
        demand: 120,
        unitPrice: 5.99,
        delay: 3.5,
        loss: 2515.80,
        tagColor: 'bg-blue-100 text-blue-700',
      },
      {
        name: 'Fresh Milk',
        tag: 'perishable',
        demand: 90,
        unitPrice: 3.49,
        delay: 3.5,
        loss: 1099.35,
        tagColor: 'bg-red-100 text-red-500',
      },
    ],
  },
  {
    truckId: 'T002',
    storeId: 'ST-1234',
    delayDuration: 2,
    totalLoss: 1099.20,
    skus: [
      {
        name: 'Orange Juice',
        tag: 'high-demand',
        demand: 60,
        unitPrice: 4.50,
        delay: 2,
        loss: 540.00,
        tagColor: 'bg-yellow-100 text-yellow-700',
      },
      {
        name: 'Ice Cream',
        tag: 'cold',
        demand: 40,
        unitPrice: 6.99,
        delay: 2,
        loss: 559.20,
        tagColor: 'bg-blue-100 text-blue-700',
      },
    ],
  },
  {
    truckId: 'T003',
    storeId: 'ST-7890',
    delayDuration: 1.5,
    totalLoss: 800.00,
    skus: [
      {
        name: 'Yogurt',
        tag: 'perishable',
        demand: 50,
        unitPrice: 2.99,
        delay: 1.5,
        loss: 224.25,
        tagColor: 'bg-red-100 text-red-500',
      },
      {
        name: 'Butter',
        tag: 'cold',
        demand: 30,
        unitPrice: 3.99,
        delay: 1.5,
        loss: 179.55,
        tagColor: 'bg-blue-100 text-blue-700',
      },
      {
        name: 'Eggs',
        tag: 'high-demand',
        demand: 100,
        unitPrice: 3.96,
        delay: 1.5,
        loss: 396.00,
        tagColor: 'bg-yellow-100 text-yellow-700',
      },
    ],
  },
];

const SkuImpact = () => {
  return (
    <div className="dashboard">
      <div
        className="top-bar"
        style={{
          background: "#f8fafb",
          padding: "20px 20px 24px 20px",
          fontWeight: 700,
          fontSize: "2rem",
          textAlign: "left",
          display: "flex",
        }}
      >
        Loss Estimation Breakdown
      </div>
      <main className="dashboard-main">
        {trucks.map((truck) => (
          <div
            key={truck.truckId}
            className="bg-white rounded-2xl shadow p-6 flex flex-row justify-between items-start mb-8 w-full min-h-[220px]"
          >
            <div className="flex flex-col flex-1">
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Truck ID: {truck.truckId}
              </div>
              <div className="text-gray-400 text-sm mb-4">
                Store ID: {truck.storeId}
              </div>
              <div className="flex gap-4">
                {truck.skus.map((sku) => (
                  <div
                    key={sku.name}
                    className="bg-gray-50 rounded-xl p-4 min-w-[220px] max-w-xs flex-1 mb-2 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{sku.name}</span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${sku.tagColor}`}
                      >
                        {sku.tag}
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm mb-2">
                      Demand: <span className="font-semibold">{sku.demand}</span> |
                      Unit Price: <span className="font-semibold">${sku.unitPrice.toFixed(2)}</span> |
                      Delay: <span className="font-semibold">{sku.delay}h</span>
                    </div>
                    <div className="text-red-600 font-bold text-lg flex items-center gap-1">
                      ${sku.loss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      <span
                        className="text-gray-400 cursor-pointer"
                        title="Estimated loss due to delay"
                      >
                        &#9432;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end ml-8 mt-2 min-w-[220px]">
              <div className="text-sm text-gray-700 mb-1 text-right">
                Delay Duration: <span className="font-bold text-black">{truck.delayDuration} hours</span>
              </div>
              <div className="text-xl font-bold text-blue-600 text-right">
                ${truck.totalLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-gray-500 text-right">Total Estimated Loss</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default SkuImpact;
