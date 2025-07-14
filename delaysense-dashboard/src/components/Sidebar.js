import React from 'react';
import './Sidebar.css';
import { ReactComponent as TruckLogo } from '../truck-logo.svg';
import { ReactComponent as DashboardIcon } from '../columns-gap.svg';
import { ReactComponent as BoxIcon } from '../box.svg';
import { ReactComponent as ReturnIcon } from '../return.svg';
import { ReactComponent as AnalyticsIcon } from '../analytics.svg';
import { ReactComponent as SettingsIcon } from '../gear.svg';
import { ReactComponent as LogoutIcon } from '../logout-left.svg';
import { ReactComponent as PersonIcon } from '../person.svg';
import { ReactComponent as DelayIcon } from '../delay-icon.svg';

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon className="sidebar-svg" />, active: true, content: 'Dashboard content goes here.' },
  // { label: 'Delays', icon: <DelayIcon className="sidebar-svg" style={{ width: 28, height: 28 }} />, active: false, content: 'Delays content goes here.' },
  { label: 'SKU impact', icon: <BoxIcon className="sidebar-svg" />, active: false, content: 'SKU Impact content goes here.' },
  { label: 'Analytics', icon: <AnalyticsIcon className="sidebar-svg" />, active: false, content: 'Analytics content goes here.' },
  { label: 'Admin', icon: <SettingsIcon className="sidebar-svg" />, active: false, content: 'Admin content goes here.' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar modern-sidebar">
      <div className="sidebar-logo-block">
        <div className="sidebar-logo-icon"><TruckLogo className="sidebar-svg logo-svg" /></div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-title">DelaySense</div>
          <div className="sidebar-logo-sub">Supply Chain Monitor</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, idx) => (
            <li
              key={item.label}
              className={`sidebar-menu-item${item.active ? ' active' : ''}`}
              style={{ marginBottom: idx !== menuItems.length - 1 ? '16px' : '0' }}
            >
              <span className="icon">{item.icon}</span>
              <span className="sidebar-menu-label">{item.label}</span>
              {item.active && <span className="sidebar-menu-dot"></span>}
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-bottom modern-sidebar-bottom">
        <button className="sidebar-user-btn">
          <PersonIcon className="sidebar-svg user-svg" /> Manager
        </button>
        <button className="sidebar-logout">
          <LogoutIcon className="sidebar-svg logout-svg" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 