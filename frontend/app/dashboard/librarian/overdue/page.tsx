'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Search: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  Notify: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
}

interface OverdueItem {
  id: string
  bookTitle: string
  author: string
  memberName: string
  memberCard: string
  dueDate: string
  daysOverdue: number
  fine: number
}

export default function OverduePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [overdueItems] = useState<OverdueItem[]>([
    { id: '1', bookTitle: 'Arrow of God', author: 'Chinua Achebe', memberName: 'Amina Wanjiku', memberCard: 'LIB-007712', dueDate: 'Mar 18, 2026', daysOverdue: 30, fine: 300 },
    { id: '2', bookTitle: 'Weep Not, Child', author: 'Ngũgĩ wa Thiong\'o', memberName: 'James Mwakio', memberCard: 'LIB-002234', dueDate: 'Mar 28, 2026', daysOverdue: 20, fine: 200 },
    { id: '3', bookTitle: 'Wizard of the Crow', author: 'Ngũgĩ wa Thiong\'o', memberName: 'Fatuma Hassan', memberCard: 'LIB-005567', dueDate: 'Apr 5, 2026', daysOverdue: 12, fine: 120 },
  ])

  const stats = { total: 47, totalFines: 4700 }

  const filteredItems = overdueItems.filter(item =>
    item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNotify = (memberCard: string, bookTitle: string) => {
    toast.info(`Notice sent to ${memberCard} about "${bookTitle}"`)
  }

  return (
    <div className="overdue-page">
      <div className="page-header">
        <h2>Overdue Items</h2>
        <p>Monitor and manage overdue books</p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card"><div className="stat-value">{stats.total}</div><div className="stat-label">Total Overdue</div></div>
        <div className="stat-card"><div className="stat-value">Ksh {stats.totalFines}</div><div className="stat-label">Accrued Fines</div></div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <Icons.Search />
        <input type="text" placeholder="Search by book title or member..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {/* Overdue Table */}
      <table className="overdue-table">
        <thead>
          <tr><th>Book Title</th><th>Author</th><th>Member</th><th>Due Date</th><th>Days Overdue</th><th>Fine (Ksh)</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td><strong>{item.bookTitle}</strong></td>
              <td>{item.author}</td>
              <td>{item.memberName}<br /><span className="card">{item.memberCard}</span></td>
              <td>{item.dueDate}</td>
              <td><span className="days-badge">{item.daysOverdue} days</span></td>
              <td className="fine">Ksh {item.fine}</td>
              <td><button className="notify-btn" onClick={() => handleNotify(item.memberCard, item.bookTitle)}><Icons.Notify /> Notify</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .overdue-page {
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
        .stats-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }
        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--red);
        }
        .stat-label {
          font-size: 0.7rem;
          color: var(--muted);
          margin-top: 0.2rem;
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
        .overdue-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 8px;
          overflow: hidden;
        }
        .overdue-table th {
          text-align: left;
          padding: 0.8rem;
          background: var(--bg2);
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
        }
        .overdue-table td {
          padding: 0.8rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.8rem;
        }
        .card {
          font-size: 0.65rem;
          color: var(--muted);
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
        .notify-btn {
          padding: 0.3rem 0.8rem;
          background: none;
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        @media (max-width: 768px) {
          .overdue-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  )
}