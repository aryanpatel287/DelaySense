import React from 'react';
import './Sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as TruckLogo } from '../truck-logo.svg';
import { ReactComponent as DashboardIcon } from '../columns-gap.svg';
import { ReactComponent as BoxIcon } from '../box.svg';
import { ReactComponent as ReturnIcon } from '../return.svg';
import { ReactComponent as AnalyticsIcon } from '../analytics.svg';
import { ReactComponent as SettingsIcon } from '../gear.svg';
import { ReactComponent as LogoutIcon } from '../logout-left.svg';
import { ReactComponent as PersonIcon } from '../person.svg';
import { ReactComponent as DelayIcon } from '../delay-icon.svg';
import { ReactComponent as LightbulbIcon } from '../lightbulb.svg';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon className="sidebar-svg" />, path: '/' },
    { label: 'SKU Impact', icon: <BoxIcon className="sidebar-svg" />, path: '/sku-impact' },
    { label: 'Analytics', icon: <AnalyticsIcon className="sidebar-svg" />, path: '/analytics' },
    { label: 'Suggestions', icon: <LightbulbIcon className="sidebar-svg" />, path: '/suggestions' },
    { label: 'Settings', icon: <SettingsIcon className="sidebar-svg" />, path: '/settings' },
  ];

  return (
    <aside className="sidebar modern-sidebar">
      <div className="sidebar-logo-block">
        <div className="sidebar-logo-icon"><TruckLogo className="sidebar-svg logo-svg" /></div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-title">DelaySense</div>
          <div className="sidebar-logo-sub">#ST001</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.label}
                className={`sidebar-menu-item${isActive ? ' active' : ''}`}
                style={{ marginBottom: idx !== menuItems.length - 1 ? '16px' : '0' }}
                onClick={() => navigate(item.path)}
              >
                <span className="icon">{item.icon}</span>
                <span className="sidebar-menu-label">{item.label}</span>
                {isActive && <span className="sidebar-menu-dot"></span>}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="sidebar-bottom modern-sidebar-bottom">
        <button className="sidebar-user-btn">
          <PersonIcon className="sidebar-svg user-svg" /> Manager
        </button>
        <button className="sidebar-logout" onClick={onLogout}>
          <LogoutIcon className="sidebar-svg logout-svg" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 