'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Edit: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3l4 4-7 7H10v-4l7-7z" /></svg>),
  Calendar: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
  Card: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>),
  Book: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>),
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Jane Austen',
    email: 'jane@example.com',
    phone: '+254 700 000 000',
    address: '123 Library Lane, Kutus Town',
    joinDate: 'January 15, 2024',
    memberType: 'Standard Member',
    cardNumber: 'LIB-004821',
  })

  const stats = {
    booksBorrowed: 47,
    booksRead: 42,
    daysAsMember: 458,
  }

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Profile updated successfully')
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>My Profile</h2>
        <p>View and manage your personal information</p>
      </div>

      <div className="profile-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">JA</div>
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <Icons.Edit /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            )}
          </div>

          <div className="profile-info">
            <div className="info-row">
              <label>Full Name</label>
              {isEditing ? (
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
            <div className="info-row">
              <label>Email Address</label>
              {isEditing ? (
                <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
            <div className="info-row">
              <label>Phone Number</label>
              {isEditing ? (
                <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
              ) : (
                <p>{profile.phone}</p>
              )}
            </div>
            <div className="info-row">
              <label>Address</label>
              {isEditing ? (
                <textarea value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} rows={2} />
              ) : (
                <p>{profile.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="stats-card">
          <h3>Reading Stats</h3>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-value">{stats.booksBorrowed}</div>
              <div className="stat-label"><Icons.Book /> Books Borrowed</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.booksRead}</div>
              <div className="stat-label"><Icons.Book /> Books Read</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.daysAsMember}</div>
              <div className="stat-label"><Icons.Calendar /> Days a Member</div>
            </div>
          </div>
        </div>

        {/* Member Info Card */}
        <div className="member-info-card">
          <h3><Icons.Card /> Membership Information</h3>
          <div className="info-row">
            <label>Member Since</label>
            <p>{profile.joinDate}</p>
          </div>
          <div className="info-row">
            <label>Membership Type</label>
            <p><span className="member-badge">{profile.memberType}</span></p>
          </div>
          <div className="info-row">
            <label>Library Card Number</label>
            <p className="card-number">{profile.cardNumber}</p>
          </div>
          <button className="upgrade-btn" onClick={() => toast.info('Upgrade options coming soon')}>
            Upgrade Membership →
          </button>
        </div>
      </div>

      <style jsx>{`
        .profile-page {
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
        .profile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        .profile-card, .stats-card, .member-info-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem;
        }
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--rust), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
        }
        .edit-btn {
          padding: 0.4rem 1rem;
          background: none;
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .edit-actions {
          display: flex;
          gap: 0.5rem;
        }
        .save-btn, .cancel-btn {
          padding: 0.4rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .save-btn {
          background: var(--gold);
          border: none;
        }
        .cancel-btn {
          background: none;
          border: 1px solid var(--border);
        }
        .info-row {
          margin-bottom: 1rem;
        }
        .info-row label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.2rem;
        }
        .info-row p {
          font-size: 0.9rem;
        }
        .info-row input, .info-row textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg);
        }
        .stats-card h3, .member-info-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          text-align: center;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gold);
        }
        .stat-label {
          font-size: 0.65rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
        }
        .member-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: rgba(184,134,11,0.1);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--gold);
        }
        .card-number {
          font-family: monospace;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }
        .upgrade-btn {
          width: 100%;
          margin-top: 1rem;
          padding: 0.5rem;
          background: var(--gold);
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}