'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Save: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>),
  Bell: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
  Shield: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
}

export default function LibrarianSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoRenew: true,
    maxRenewals: 2,
    loanPeriod: 21,
    finePerDay: 10,
    remindBeforeDue: 3,
  })

  const handleSave = () => {
    toast.success('Settings saved successfully')
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Librarian Settings</h2>
        <p>Configure your desk preferences and library rules</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3><Icons.Bell /> Notifications</h3>
          <div className="setting-item">
            <label>Email Notifications</label>
            <button className={`toggle ${settings.emailNotifications ? 'on' : ''}`} onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}>
              <span className="knob"></span>
            </button>
          </div>
          <div className="setting-item">
            <label>Auto-renew for eligible books</label>
            <button className={`toggle ${settings.autoRenew ? 'on' : ''}`} onClick={() => setSettings({...settings, autoRenew: !settings.autoRenew})}>
              <span className="knob"></span>
            </button>
          </div>
        </div>

        <div className="settings-card">
          <h3><Icons.Shield /> Borrowing Rules</h3>
          <div className="setting-item">
            <label>Max Renewals per book</label>
            <input type="number" value={settings.maxRenewals} onChange={(e) => setSettings({...settings, maxRenewals: parseInt(e.target.value)})} />
          </div>
          <div className="setting-item">
            <label>Loan Period (days)</label>
            <input type="number" value={settings.loanPeriod} onChange={(e) => setSettings({...settings, loanPeriod: parseInt(e.target.value)})} />
          </div>
          <div className="setting-item">
            <label>Fine Rate (Ksh/day)</label>
            <input type="number" value={settings.finePerDay} onChange={(e) => setSettings({...settings, finePerDay: parseInt(e.target.value)})} />
          </div>
          <div className="setting-item">
            <label>Remind before due (days)</label>
            <input type="number" value={settings.remindBeforeDue} onChange={(e) => setSettings({...settings, remindBeforeDue: parseInt(e.target.value)})} />
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button className="save-btn" onClick={handleSave}><Icons.Save /> Save Settings</button>
      </div>

      <style jsx>{`
        .settings-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .page-header h2 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .page-header p {
          font-size: 0.75rem;
          color: var(--muted);
        }
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.2rem;
        }
        .settings-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
        }
        .settings-card h3 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--border);
        }
        .setting-item:last-child {
          border-bottom: none;
        }
        .setting-item label {
          font-size: 0.8rem;
        }
        .setting-item input {
          width: 80px;
          padding: 0.3rem 0.5rem;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: var(--bg);
          text-align: center;
        }
        .toggle {
          width: 44px;
          height: 22px;
          border-radius: 11px;
          background: var(--border);
          border: none;
          cursor: pointer;
          position: relative;
        }
        .toggle.on {
          background: var(--sage);
        }
        .toggle .knob {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: left 0.2s;
        }
        .toggle.on .knob {
          left: 24px;
        }
        .action-bar {
          display: flex;
          justify-content: flex-end;
        }
        .save-btn {
          padding: 0.7rem 1.5rem;
          background: var(--gold);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
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