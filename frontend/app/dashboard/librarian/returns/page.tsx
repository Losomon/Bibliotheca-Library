'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Search: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  Return: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M9 12h6M12 9v6M19 12l-4 4-4-4" /></svg>),
  Process: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>),
}

interface ReturnItem {
  id: string
  cardNo: string
  bookTitle: string
  author: string
  memberName: string
  borrowedDate: string
  dueDate: string
  status: 'ontime' | 'overdue'
  daysOverdue?: number
  fine?: number
}

export default function ReturnsPage() {
  const [bookId, setBookId] = useState('')
  const [returnedBook, setReturnedBook] = useState<any>(null)
  const [recentReturns] = useState<ReturnItem[]>([
    { id: '1', cardNo: 'LIB-002219', bookTitle: 'Weep Not, Child', author: 'Ngũgĩ wa Thiong\'o', memberName: 'Grace Njeri', borrowedDate: 'Mar 28', dueDate: 'Apr 18', status: 'ontime' },
    { id: '2', cardNo: 'LIB-005567', bookTitle: 'Season of Migration', author: 'Tayeb Salih', memberName: 'David Ochieng', borrowedDate: 'Mar 15', dueDate: 'Apr 5', status: 'overdue', daysOverdue: 12, fine: 120 },
  ])

  const handleLookupBook = () => {
    if (!bookId) {
      toast.error('Please enter book ISBN or title')
      return
    }
    setTimeout(() => {
      setReturnedBook({
        title: 'Things Fall Apart',
        author: 'Chinua Achebe',
        isbn: bookId,
        memberName: 'Jane Austen',
        memberCard: 'LIB-004821',
        borrowedDate: 'Mar 20',
        dueDate: 'Apr 10',
        daysOverdue: 7,
        fine: 70
      })
      toast.success('Book found')
    }, 500)
  }

  const handleProcessReturn = () => {
    if (!returnedBook) {
      toast.error('Please lookup a book first')
      return
    }
    toast.success(`Return processed for "${returnedBook.title}". Fine collected: Ksh ${returnedBook.fine}`)
    setBookId('')
    setReturnedBook(null)
  }

  return (
    <div className="returns-page">
      <div className="page-header">
        <h2>Process Returns</h2>
        <p>Scan book ISBN to process return and calculate fines</p>
      </div>

      {/* Return Scanner */}
      <div className="scanner-panel">
        <div className="input-group">
          <label>Scan Book ISBN / Barcode</label>
          <div className="input-with-button">
            <input 
              type="text" 
              placeholder="Scan or enter ISBN" 
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
            <button onClick={handleLookupBook}>
              <Icons.Search /> Lookup
            </button>
          </div>
        </div>

        {returnedBook && (
          <div className="return-info">
            <div className="info-grid">
              <div><strong>Book:</strong> {returnedBook.title}</div>
              <div><strong>Author:</strong> {returnedBook.author}</div>
              <div><strong>Member:</strong> {returnedBook.memberName} ({returnedBook.memberCard})</div>
              <div><strong>Borrowed:</strong> {returnedBook.borrowedDate}</div>
              <div><strong>Due Date:</strong> {returnedBook.dueDate}</div>
              <div><strong>Days Overdue:</strong> {returnedBook.daysOverdue} days</div>
              <div><strong>Fine:</strong> Ksh {returnedBook.fine}</div>
            </div>
            <button className="process-btn" onClick={handleProcessReturn}>
              <Icons.Process /> Process Return & Collect Fine
            </button>
          </div>
        )}
      </div>

      {/* Recent Returns */}
      <div className="recent-panel">
        <h3>Recent Returns</h3>
        <table className="returns-table">
          <thead>
            <tr><th>Book</th><th>Member</th><th>Due Date</th><th>Status</th><th>Fine</th><th>Action</th></tr>
          </thead>
          <tbody>
            {recentReturns.map(item => (
              <tr key={item.id}>
                <td><strong>{item.bookTitle}</strong><br /><span className="author">{item.author}</span></td>
                <td>{item.memberName}<br /><span className="card">{item.cardNo}</span></td>
                <td>{item.dueDate}</td>
                <td><span className={`status ${item.status === 'ontime' ? 'ontime' : 'overdue'}`}>{item.status === 'ontime' ? 'On Time' : 'Overdue'}</span></td>
                <td>{item.fine ? `Ksh ${item.fine}` : '—'}</td>
                <td><button className="view-btn">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .returns-page {
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
        .scanner-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.2rem;
        }
        .input-group label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.3rem;
        }
        .input-with-button {
          display: flex;
          gap: 0.5rem;
        }
        .input-with-button input {
          flex: 1;
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg);
        }
        .input-with-button button {
          padding: 0.6rem 1rem;
          background: var(--gold);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .return-info {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--bg);
          border-radius: 6px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .info-grid div {
          font-size: 0.8rem;
          padding: 0.3rem 0;
        }
        .process-btn {
          width: 100%;
          padding: 0.7rem;
          background: var(--sage);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
        }
        .recent-panel h3 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
        }
        .returns-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 8px;
          overflow: hidden;
        }
        .returns-table th {
          text-align: left;
          padding: 0.8rem;
          background: var(--bg2);
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
        }
        .returns-table td {
          padding: 0.8rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.8rem;
        }
        .author, .card {
          font-size: 0.65rem;
          color: var(--muted);
        }
        .status {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          font-size: 0.65rem;
        }
        .status.ontime {
          background: rgba(82,194,120,0.1);
          color: var(--green);
        }
        .status.overdue {
          background: rgba(224,82,82,0.1);
          color: var(--red);
        }
        .view-btn {
          padding: 0.2rem 0.6rem;
          background: none;
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          .returns-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  )
}