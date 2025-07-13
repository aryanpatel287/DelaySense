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

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon className="sidebar-svg" />, active: true },
  { label: 'SKU Impact', icon: <BoxIcon className="sidebar-svg" />, active: false },
  { label: 'Returns', icon: <ReturnIcon className="sidebar-svg" />, active: false },
  { label: 'Analytics', icon: <AnalyticsIcon className="sidebar-svg" />, active: false },
  { label: 'Settings', icon: <SettingsIcon className="sidebar-svg" />, active: false },
];

const Sidebar = () => {
  return (
    <aside className="sidebar fixed-sidebar">
      <div className="sidebar-logo">
        <TruckLogo className="sidebar-svg logo-svg" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, idx) => (
            <li
              key={item.label}
              className={item.active ? 'active' : ''}
            >
              <span className="icon">{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-bottom">
        <button className="sidebar-user-btn">
          <PersonIcon className="sidebar-svg user-svg" /> manager
        </button>
        <button className="sidebar-logout">
          <LogoutIcon className="sidebar-svg logout-svg" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 