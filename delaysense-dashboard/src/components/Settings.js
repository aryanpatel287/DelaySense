// src/components/Settings.js
import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [email, setEmail] = useState("sophia.miller@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [view, setView] = useState("Store-wise");
  const [timezone, setTimezone] = useState("IST");
  const [theme, setTheme] = useState("system");

  return (
    <div className="settings-container">
      <div className="settings-title">Settings</div>

      <section>
        <h3>Update Account Info</h3>
        <div className="settings-row">
          <div className="settings-label-block">
            <label>Email</label>
            <span className="settings-value">{email}</span>
          </div>
          <button className="settings-edit-btn">Edit</button>
        </div>
        <div className="settings-row">
          <div className="settings-label-block">
            <label>Phone</label>
            <span className="settings-value">{phone}</span>
          </div>
          <button className="settings-edit-btn">Edit</button>
        </div>
        <div className="settings-row">
          <div className="settings-label-block">
            <label>Password</label>
            <span className="settings-value">********</span>
          </div>
          <button className="settings-edit-btn">Change Password</button>
        </div>
      </section>

      <section>
        <h3>Notifications</h3>
        <label><input type="checkbox" /> Email notifications</label>
        <label><input type="checkbox" /> Phone notifications</label>
      </section>

      <section>
        <h3>User Preferences</h3>
        <label>Default Dashboard View</label>
        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option>Store-wise</option>
          <option>SKU-wise</option>
          <option>Delay Summary</option>
        </select>

        <label>Timezone</label>
        <input value={timezone} onChange={(e) => setTimezone(e.target.value)} />
      </section>

      <section>
        <h3>Display Preferences</h3>
        <div className="theme-buttons">
          <button onClick={() => setTheme("light")}>Light</button>
          <button onClick={() => setTheme("dark")}>Dark</button>
          <button onClick={() => setTheme("system")}>System</button>
        </div>
      </section>
      <button className="save-btn">Save Changes</button>
    </div>
  );
};

export default Settings;
