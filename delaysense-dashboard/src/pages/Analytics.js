import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

const THEME_BLUE = '#2563eb';

const stats = [
  { label: 'Total Delays', value: 234 },
  { label: 'Average Delay Time', value: '3.5 days' },
  { label: 'Impacted Departments', value: 12 },
];

const departments = [
  { name: 'Produce', value: 100 },
  { name: 'Grocery', value: 20 },
  { name: 'Electronics', value: 95 },
  { name: 'Apparel', value: 80 },
];

// Custom bar shape with right border, no rounded corners
const BarWithRightBorder = (props) => {
  const { x, y, width, height, fill } = props;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      {/* Right border */}
      <rect x={x + width - 2} y={y} width={2} height={height} fill={THEME_BLUE} />
    </g>
  );
};

// Mock data for the line chart
const delayOverTime = [
  { month: 'Jan', delays: 120 },
  { month: 'Feb', delays: 90 },
  { month: 'Mar', delays: 40 },
  { month: 'Apr', delays: 60 },
  { month: 'May', delays: 130 },
  { month: 'Jun', delays: 70 },
];

// Mock data for suppliers
const suppliers = [
  { name: 'Supplier A', delays: 50, avgDelay: '4 days', departments: 'Produce, Grocery' },
  { name: 'Supplier B', delays: 45, avgDelay: '3 days', departments: 'Electronics, Apparel' },
  { name: 'Supplier C', delays: 40, avgDelay: '2.5 days', departments: 'Home Goods, Toys' },
  { name: 'Supplier D', delays: 35, avgDelay: '3.2 days', departments: 'Produce, Grocery' },
  { name: 'Supplier E', delays: 30, avgDelay: '2.8 days', departments: 'Electronics, Apparel' },
];

const Analytics = () => {
  const [tab, setTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-6xl mx-auto">
        {/* Title and Subtitle */}
        <h1 className="text-4xl font-bold text-[${THEME_BLUE}] mb-2">Delay Impact Analytics</h1>
        <p className="text-lg text-gray-400 mb-6">Analyze delay impacts across various dimensions</p>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            className={`pb-2 font-semibold ${tab === 'overview' ? 'border-b-2' : ''}`}
            style={tab === 'overview' ? { color: THEME_BLUE, borderColor: THEME_BLUE } : { color: '#a3a3a3', borderColor: 'transparent' }}
            onClick={() => setTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-2 font-semibold ${tab === 'details' ? 'border-b-2' : ''}`}
            style={tab === 'details' ? { color: THEME_BLUE, borderColor: THEME_BLUE } : { color: '#a3a3a3', borderColor: 'transparent' }}
            onClick={() => setTab('details')}
          >
            Details
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-start min-w-[220px]">
                  <span className="text-lg text-gray-500 mb-2">{stat.label}</span>
                  <span className="text-3xl font-bold text-black">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Delay Impact by Department */}
            <h2 className="text-2xl font-bold mb-2 text-black">Delay Impact by Department</h2>
            <p className="text-base text-gray-500 mb-4">Number of Delays by Department</p>
            <div className="w-full h-64 bg-white rounded-xl flex items-center justify-center border border-gray-100 mb-12 p-5">
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={departments}
                  layout="vertical"
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  barCategoryGap={32}
                >
                  <XAxis type="number" hide axisLine={false} tick={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#a3a3a3', fontWeight: 400, fontSize: 18 }}
                    width={120}
                  />
                  <Tooltip
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ borderRadius: 12, fontWeight: 500 }}
                  />
                  <Bar dataKey="value" shape={<BarWithRightBorder />} barSize={24} >
                    {departments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={'#e5e7eb'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Delay Impact Over Time */}
            <h2 className="text-2xl font-bold mb-2 text-black">Delay Impact Over Time</h2>
            <p className="text-base text-gray-500 mb-4">Delays Over the Last 6 Months</p>
            <div className="w-full h-72 bg-white rounded-xl flex items-center justify-center border border-gray-100 mb-12 p-5">
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={delayOverTime} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fill: '#888', fontWeight: 400, fontSize: 15 }} axisLine={false} tickLine={false} interval={0} padding={{ left: 10, right: 10 }} />
                  <YAxis tick={{ fill: '#888', fontWeight: 400, fontSize: 14 }} axisLine={false} tickLine={false} domain={[0, 'dataMax + 10']} padding={{ top: 10, bottom: 10 }} width={30} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontWeight: 500 }} />
                  <Line type="monotone" dataKey="delays" stroke={THEME_BLUE} strokeWidth={4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Delay Impact by Supplier Table */}
            <h2 className="text-2xl font-bold mb-4">Delay Impact by Supplier</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">Supplier</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">Total Delays</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">Average Delay Time</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 text-lg">Impacted Departments</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((s, i) => (
                    <tr key={s.name} className={i !== suppliers.length - 1 ? 'border-b border-gray-100' : ''}>
                      <td className="py-4 px-4 text-gray-700 text-base font-medium">{s.name}</td>
                      <td className="py-4 px-4 text-[#a89b97] text-base font-semibold">{s.delays}</td>
                      <td className="py-4 px-4 text-[#a89b97] text-base font-semibold">{s.avgDelay}</td>
                      <td className="py-4 px-4 text-[#a89b97] text-base font-semibold">{s.departments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === 'details' && (
          <div className="w-full flex items-center justify-center py-24">
            <span className="text-2xl text-gray-400 font-semibold">Details coming soon...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics; 