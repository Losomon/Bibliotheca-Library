'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  User: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Card: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>),
}

export default function IssueCardPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    membershipType: 'Standard'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cardNo = `LIB-${Math.floor(100000 + Math.random() * 900000)}`
    toast.success(`Member registered! Library Card: ${cardNo}`)
    setForm({ firstName: '', lastName: '', email: '', phone: '', idNumber: '', membershipType: 'Standard' })
  }

  return (
    <div className="issue-card-page">
      <div className="page-header">
        <h2><Icons.Card /> Issue Library Card</h2>
        <p>Register new members and issue library cards</p>
      </div>

      <form onSubmit={handleSubmit} className="card-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input type="text" placeholder="Jane" required value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input type="text" placeholder="Austen" required value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input type="email" placeholder="member@email.com" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="+254 700 000 000" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>ID Number *</label>
            <input type="text" placeholder="National ID" required value={form.idNumber} onChange={(e) => setForm({...form, idNumber: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Membership Type</label>
            <select value={form.membershipType} onChange={(e) => setForm({...form, membershipType: e.target.value})}>
              <option>Standard (Free)</option>
              <option>Scholar (Ksh 500/yr)</option>
              <option>Patron (Ksh 1,200/yr)</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn"><Icons.User /> Register & Issue Card</button>
        </div>
      </form>

      <style jsx>{`
        .issue-card-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .page-header h2 {
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.2rem;
        }
        .page-header p {
          font-size: 0.75rem;
          color: var(--muted);
        }
        .card-form {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .form-group label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.3rem;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg);
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }
        .submit-btn {
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
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}