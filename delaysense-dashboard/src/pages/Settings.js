// src/components/Settings.js
import React, { useState } from "react";
import "../components/Settings.css";

const Settings = () => {
  const [email, setEmail] = useState("sophia.miller@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [view, setView] = useState("Store-wise");
  const [timezone, setTimezone] = useState("IST");

  const [editing, setEditing] = useState(null); // 'email', 'phone', 'password', or null
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPhone, setTempPhone] = useState(phone);
  const [passwordFields, setPasswordFields] = useState({ current: '', new: '', confirm: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '#ccc' });
  const [passwordCriteria, setPasswordCriteria] = useState({ length: false, upper: false, lower: false, number: false, special: false });

  const [emailNotif, setEmailNotif] = useState(false);
  const [phoneNotif, setPhoneNotif] = useState(false);
  const [pendingOtp, setPendingOtp] = useState(null); // 'email' or 'phone' or null
  const [otp, setOtp] = useState('');
  const [displayPref, setDisplayPref] = useState('default');

  const handleSave = (field) => {
    if (field === 'email') {
      setEmail(tempEmail);
    } else if (field === 'phone') {
      setPhone(tempPhone);
    } else if (field === 'password') {
      setPasswordFields({ current: '', new: '', confirm: '' });
    }
    setEditing(null);
  };

  const handleCancel = () => {
    setTempEmail(email);
    setTempPhone(phone);
    setPasswordFields({ current: '', new: '', confirm: '' });
    setEditing(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2500);
  };

  function checkPasswordStrength(pw) {
    let score = 0;
    let label = 'Too weak';
    let color = '#e53e3e';
    const criteria = {
      length: pw.length >= 8,
      upper: /[A-Z]/.test(pw),
      lower: /[a-z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw)
    };
    if (criteria.length) score++;
    if (criteria.upper) score++;
    if (criteria.lower) score++;
    if (criteria.number) score++;
    if (criteria.special) score++;
    if (score <= 2) {
      label = 'Weak'; color = '#e53e3e';
    } else if (score === 3) {
      label = 'Medium'; color = '#f6ad55';
    } else if (score >= 4) {
      label = 'Strong'; color = '#2763eb';
    }
    return { score, label, color, criteria };
  }

  // Update password strength and criteria on new password change
  const handleNewPasswordChange = (e) => {
    const newPw = e.target.value;
    setPasswordFields({ ...passwordFields, new: newPw });
    const result = checkPasswordStrength(newPw);
    setPasswordStrength(result);
    setPasswordCriteria(result.criteria);
  };

  const handleToggleNotif = (type) => {
    // Only require OTP when enabling
    if ((type === 'email' && !emailNotif) || (type === 'phone' && !phoneNotif)) {
      setPendingOtp(type);
      setOtp('');
    } else {
      // Directly disable without OTP
      if (type === 'email') setEmailNotif(false);
      if (type === 'phone') setPhoneNotif(false);
      setPendingOtp(null);
      setOtp('');
    }
  };
  const handleConfirmOtp = (type) => {
    if (otp.length === 6) { // Simulate OTP check
      if (type === 'email') setEmailNotif(!emailNotif);
      if (type === 'phone') setPhoneNotif(!phoneNotif);
      setPendingOtp(null);
      setOtp('');
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  const TIMEZONES = [
    'UTC', 'GMT', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow',
    'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Singapore', 'Asia/Dubai',
    'Australia/Sydney', 'America/New_York', 'America/Chicago', 'America/Denver',
    'America/Los_Angeles', 'America/Sao_Paulo', 'Africa/Johannesburg', 'Pacific/Auckland'
  ];

  return (
    <div className="settings-container">
      <div className="settings-title">Settings</div>

      <section>
        <h3>Update Account Info</h3>
        <div className="settings-row">
          <div className="settings-label-block">
            <label>Email</label>
            {editing === 'email' ? (
              <>
                <input
                  type="email"
                  value={tempEmail}
                  onChange={e => setTempEmail(e.target.value)}
                  autoFocus
                />
                <div style={{ marginTop: 8 }}>
                  <button className="settings-edit-btn" onClick={() => handleSave('email')}>Save</button>
                  <button className="settings-edit-btn" onClick={handleCancel} style={{ marginLeft: 8 }}>Cancel</button>
                </div>
              </>
            ) : (
              <span className="settings-value">{email}</span>
            )}
          </div>
          {editing !== 'email' && (
            <button className="settings-edit-btn" onClick={() => setEditing('email')}>Edit</button>
          )}
        </div>
        <div className="settings-row">
          <div className="settings-label-block">
            <label>Phone</label>
            {editing === 'phone' ? (
              <>
                <input
                  type="tel"
                  value={tempPhone}
                  onChange={e => setTempPhone(e.target.value)}
                  autoFocus
                />
                <div style={{ marginTop: 8 }}>
                  <button className="settings-edit-btn" onClick={() => handleSave('phone')}>Save</button>
                  <button className="settings-edit-btn" onClick={handleCancel} style={{ marginLeft: 8 }}>Cancel</button>
                </div>
              </>
            ) : (
              <span className="settings-value">{phone}</span>
            )}
          </div>
          {editing !== 'phone' && (
            <button className="settings-edit-btn" onClick={() => setEditing('phone')}>Edit</button>
          )}
        </div>
        <div className="settings-row">
          <div className="settings-label-block">
            <label>Password</label>
            {editing === 'password' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordFields.current}
                  onChange={e => setPasswordFields({ ...passwordFields, current: e.target.value })}
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordFields.new}
                  onChange={handleNewPasswordChange}
                />
                {/* Password strength meter */}
                {passwordFields.new && (
                  <>
                    <div className="password-strength-meter">
                      <div
                        className="password-strength-bar"
                        style={{ background: passwordStrength.color, width: `${passwordStrength.score * 20}%` }}
                      ></div>
                      <span className="password-strength-label" style={{ color: passwordStrength.color, marginLeft: 8 }}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <ul className="password-criteria-list">
                      <li className={passwordCriteria.length ? 'met' : ''}>
                        {passwordCriteria.length ? '✔' : '✖'} At least 8 characters
                      </li>
                      <li className={passwordCriteria.upper ? 'met' : ''}>
                        {passwordCriteria.upper ? '✔' : '✖'} Uppercase letter
                      </li>
                      <li className={passwordCriteria.lower ? 'met' : ''}>
                        {passwordCriteria.lower ? '✔' : '✖'} Lowercase letter
                      </li>
                      <li className={passwordCriteria.number ? 'met' : ''}>
                        {passwordCriteria.number ? '✔' : '✖'} Number
                      </li>
                      <li className={passwordCriteria.special ? 'met' : ''}>
                        {passwordCriteria.special ? '✔' : '✖'} Special character
                      </li>
                    </ul>
                  </>
                )}
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordFields.confirm}
                  onChange={e => setPasswordFields({ ...passwordFields, confirm: e.target.value })}
                />
                <div style={{ marginTop: 8 }}>
                  <button
                    className="settings-edit-btn"
                    onClick={() => handleSave('password')}
                    disabled={passwordStrength.label !== 'Strong'}
                    style={{ opacity: passwordStrength.label === 'Strong' ? 1 : 0.5 }}
                  >
                    Save
                  </button>
                  <button className="settings-edit-btn" onClick={handleCancel} style={{ marginLeft: 8 }}>Cancel</button>
                </div>
              </div>
            ) : (
              <span className="settings-value">********</span>
            )}
          </div>
          {editing !== 'password' && (
            <button className="settings-edit-btn" onClick={() => setEditing('password')}>Change Password</button>
          )}
        </div>
      </section>

      <section>
        <h3>Notifications</h3>
        <div className="notif-row">
          <span>Email notifications</span>
          <button
            className={`notif-enable-btn${emailNotif ? ' enabled' : ''}`}
            onClick={() => handleToggleNotif('email')}
          >
            {emailNotif ? 'Disable' : 'Enable'}
          </button>
        </div>
        {pendingOtp === 'email' && (
          <div className="otp-row">
            <span className="otp-prompt">Enter OTP sent to your email</span>
            <input
              className="otp-input"
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            />
            <button className="settings-edit-btn" onClick={() => handleConfirmOtp('email')}>Confirm</button>
          </div>
        )}
        <div className="notif-row">
          <span>Phone notifications</span>
          <button
            className={`notif-enable-btn${phoneNotif ? ' enabled' : ''}`}
            onClick={() => handleToggleNotif('phone')}
          >
            {phoneNotif ? 'Disable' : 'Enable'}
          </button>
        </div>
        {pendingOtp === 'phone' && (
          <div className="otp-row">
            <span className="otp-prompt">Enter OTP sent to your phone</span>
            <input
              className="otp-input"
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            />
            <button className="settings-edit-btn" onClick={() => handleConfirmOtp('phone')}>Confirm</button>
          </div>
        )}
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
        <select value={timezone} onChange={e => setTimezone(e.target.value)}>
          {TIMEZONES.map(tz => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </section>

      <section>
        <h3>Display Preferences</h3>
        <div className="theme-buttons">
          <button
            className={displayPref === 'light' ? 'selected' : ''}
            onClick={() => setDisplayPref('light')}
          >Light</button>
          <button
            className={displayPref === 'dark' ? 'selected' : ''}
            onClick={() => setDisplayPref('dark')}
          >Dark</button>
          <button
            className={displayPref === 'default' ? 'selected' : ''}
            onClick={() => setDisplayPref('default')}
          >Default</button>
        </div>
      </section>
      <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
      {showConfirmation && (
        <div className="settings-confirm-popup">Changes saved successfully!</div>
      )}
    </div>
  );
};

export default Settings;
