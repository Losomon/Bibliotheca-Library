'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Search: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  Collect: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>),
}

interface FineAccount {
  id: string
  memberName: string
  cardNo: string
  booksOverdue: number
  fine: number
  daysSinceDue: number
  status: 'pending' | 'paid'
}

export default function FinesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [fineAccounts] = useState<FineAccount[]>([
    { id: '1', memberName: 'Amina Wanjiku', cardNo: 'LIB-007712', booksOverdue: 1, fine: 300, daysSinceDue: 30, status: 'pending' },
    { id: '2', memberName: 'James Mwakio', cardNo: 'LIB-002234', booksOverdue: 2, fine: 420, daysSinceDue: 21, status: 'pending' },
    { id: '3', memberName: 'Fatuma Hassan', cardNo: 'LIB-005567', booksOverdue: 1, fine: 120, daysSinceDue: 12, status: 'pending' },
  ])

  const filteredAccounts = fineAccounts.filter(account =>
    account.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.cardNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCollectFine = (memberName: string, amount: number) => {
    toast.success(`Collected Ksh ${amount} from ${memberName}`)
  }

  return (
    <div className="fines-page">
      <div className="page-header">
        <h2>Fine Collection</h2>
        <p>Manage and collect overdue fines</p>
      </div>

      <div className="search-bar">
        <Icons.Search />
        <input type="text" placeholder="Search by member name or card number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <table className="fines-table">
        <thead>
          <tr><th>Member</th><th>Card No.</th><th>Books Overdue</th><th>Days Since Due</th><th>Fine (Ksh)</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredAccounts.map(account => (
            <tr key={account.id}>
              <td><strong>{account.memberName}</strong></td>
              <td>{account.cardNo}</td>
              <td>{account.booksOverdue}</td>
              <td><span className="days-badge">{account.daysSinceDue} days</span></td>
              <td className="fine">Ksh {account.fine}</td>
              <td><span className={`status ${account.status === 'pending' ? 'pending' : 'paid'}`}>{account.status}</span></td>
              <td>
                {account.status === 'pending' && (
                  <button className="collect-btn" onClick={() => handleCollectFine(account.memberName, account.fine)}>
                    <Icons.Collect /> Collect
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .fines-page {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
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
        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.5rem 0.8rem;
        }
        .search-bar input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
        }
        .fines-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 8px;
          overflow: hidden;
        }
        .fines-table th {
          text-align: left;
          padding: 0.8rem;
          background: var(--bg2);
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
        }
        .fines-table td {
          padding: 0.8rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.8rem;
        }
        .days-badge {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          background: rgba(224,82,82,0.1);
          color: var(--red);
          font-size: 0.7rem;
        }
        .fine {
          color: var(--red);
          font-weight: 600;
        }
        .status {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          font-size: 0.65rem;
          text-transform: capitalize;
        }
        .status.pending {
          background: rgba(224,160,82,0.1);
          color: var(--amber);
        }
        .status.paid {
          background: rgba(82,194,120,0.1);
          color: var(--green);
        }
        .collect-btn {
          padding: 0.3rem 0.8rem;
          background: var(--gold);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        @media (max-width: 768px) {
          .fines-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  )
}