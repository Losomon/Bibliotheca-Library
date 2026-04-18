'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Bell: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
  Mail: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>),
  Shield: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  Save: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>),
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    dueReminders: true,
    promotionEmails: false,
    twoFactorAuth: false,
  })

  const [profile, setProfile] = useState({
    name: 'Jane Austen',
    email: 'jane@example.com',
    phone: '+254 700 000 000',
  })

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully')
  }

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved')
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your account preferences</p>
      </div>

      <div className="settings-grid">
        {/* Profile Section */}
        <div className="settings-card">
          <h3>Profile Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
          </div>
          <button className="save-btn" onClick={handleSaveProfile}>
            <Icons.Save /> Save Changes
          </button>
        </div>

        {/* Notifications Section */}
        <div className="settings-card">
          <h3><Icons.Bell /> Notifications</h3>
          <div className="toggle-item">
            <div className="toggle-info">
              <strong>Email Notifications</strong>
              <p>Receive account updates and alerts via email</p>
            </div>
            <button className={`toggle ${settings.emailNotifications ? 'on' : ''}`} onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}>
              <span className="knob"></span>
            </button>
          </div>
          <div className="toggle-item">
            <div className="toggle-info">
              <strong>Due Date Reminders</strong>
              <p>Get notified before your books are due</p>
            </div>
            <button className={`toggle ${settings.dueReminders ? 'on' : ''}`} onClick={() => setSettings({...settings, dueReminders: !settings.dueReminders})}>
              <span className="knob"></span>
            </button>
          </div>
          <div className="toggle-item">
            <div className="toggle-info">
              <strong>Promotional Emails</strong>
              <p>Receive news about events and new books</p>
            </div>
            <button className={`toggle ${settings.promotionEmails ? 'on' : ''}`} onClick={() => setSettings({...settings, promotionEmails: !settings.promotionEmails})}>
              <span className="knob"></span>
            </button>
          </div>
          <button className="save-btn" onClick={handleSaveNotifications}>
            <Icons.Save /> Save Preferences
          </button>
        </div>

        {/* Security Section */}
        <div className="settings-card">
          <h3><Icons.Shield /> Security</h3>
          <div className="toggle-item">
            <div className="toggle-info">
              <strong>Two-Factor Authentication</strong>
              <p>Add an extra layer of security to your account</p>
            </div>
            <button className={`toggle ${settings.twoFactorAuth ? 'on' : ''}`} onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}>
              <span className="knob"></span>
            </button>
          </div>
          <div className="form-group">
            <label>Change Password</label>
            <input type="password" placeholder="Current password" />
            <input type="password" placeholder="New password" style={{ marginTop: '0.5rem' }} />
            <input type="password" placeholder="Confirm new password" style={{ marginTop: '0.5rem' }} />
          </div>
          <button className="save-btn" onClick={() => toast.success('Password updated')}>
            <Icons.Save /> Update Password
          </button>
        </div>
      </div>

      <style jsx>{`
        .settings-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .page-header h2 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .page-header p {
          font-size: 0.8rem;
          color: var(--muted);
        }
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        .settings-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
        }
        .settings-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.3rem;
        }
        .form-group input {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
        }
        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 0;
          border-bottom: 1px solid var(--border);
        }
        .toggle-item:last-child {
          border-bottom: none;
        }
        .toggle-info strong {
          display: block;
          font-size: 0.85rem;
          margin-bottom: 0.2rem;
        }
        .toggle-info p {
          font-size: 0.7rem;
          color: var(--muted);
        }
        .toggle {
          width: 48px;
          height: 24px;
          border-radius: 12px;
          background: var(--border);
          border: none;
          cursor: pointer;
          position: relative;
        }
        .toggle.on {
          background: var(--sage);
        }
        .toggle .knob {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: left 0.2s;
        }
        .toggle.on .knob {
          left: 26px;
        }
        .save-btn {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: var(--gold);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
        }
        @media (max-width: 768px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}