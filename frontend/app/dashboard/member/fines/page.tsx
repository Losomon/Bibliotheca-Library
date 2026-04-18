'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Pay: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>),
  History: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
}

interface Fine {
  id: string
  description: string
  amount: number
  date: string
  status: 'pending' | 'paid'
}

export default function FinesPage() {
  const [fines] = useState<Fine[]>([
    { id: '1', description: 'Overdue fine - Things Fall Apart', amount: 50, date: 'Mar 15, 2026', status: 'paid' },
    { id: '2', description: 'Late return - Americanah', amount: 30, date: 'Mar 10, 2026', status: 'paid' },
  ])

  const totalOutstanding = fines.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0)

  const handlePayFine = () => {
    toast.info('M-Pesa payment processing...')
  }

  return (
    <div className="fines-page">
      <div className="page-header">
        <h2>Fines & Fees</h2>
        <p>View and pay your outstanding fines</p>
      </div>

      {totalOutstanding === 0 ? (
        <div className="no-fines">
          <div className="check-icon">✓</div>
          <h3>No Outstanding Fines</h3>
          <p>Your account is in good standing. Keep up the good work!</p>
        </div>
      ) : (
        <div className="outstanding-card">
          <div className="outstanding-amount">Ksh {totalOutstanding}</div>
          <p>Total Outstanding Fines</p>
          <button className="pay-btn" onClick={handlePayFine}><Icons.Pay /> Pay via M-Pesa</button>
        </div>
      )}

      <div className="history-section">
        <h3><Icons.History /> Payment History</h3>
        <table className="history-table">
          <thead>
            <tr><th>Description</th><th>Amount</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {fines.map(fine => (
              <tr key={fine.id}>
                <td>{fine.description}</td>
                <td>Ksh {fine.amount}</td>
                <td>{fine.date}</td>
                <td><span className={`status ${fine.status}`}>{fine.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .fines-page {
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
        .no-fines {
          text-align: center;
          padding: 2rem;
          background: var(--surface);
          border-radius: 12px;
        }
        .check-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--green);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1rem;
        }
        .outstanding-card {
          text-align: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, var(--rust), var(--gold));
          border-radius: 12px;
          color: white;
        }
        .outstanding-amount {
          font-size: 2rem;
          font-weight: 700;
        }
        .pay-btn {
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: white;
          color: var(--rust);
          border: none;
          border-radius: 30px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .history-section h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .history-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 12px;
          overflow: hidden;
        }
        .history-table th {
          padding: 0.8rem;
          text-align: left;
          background: var(--bg2);
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
        }
        .history-table td {
          padding: 0.8rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.8rem;
        }
        .status {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.65rem;
        }
        .status.paid {
          background: rgba(82,194,120,0.1);
          color: var(--green);
        }
        .status.pending {
          background: rgba(224,160,82,0.1);
          color: var(--amber);
        }
      `}</style>
    </div>
  )
}