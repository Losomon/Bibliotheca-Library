'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Renew: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
  Return: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M9 12h6M12 9v6M19 12l-4 4-4-4" /></svg>),
}

interface BorrowedBook {
  id: string
  title: string
  author: string
  borrowedDate: string
  dueDate: string
  status: 'reading' | 'due-soon' | 'overdue'
  coverColor: string
}

export default function MyBooksPage() {
  const [books] = useState<BorrowedBook[]>([
    { id: '1', title: 'Things Fall Apart', author: 'Chinua Achebe', borrowedDate: 'Mar 30, 2026', dueDate: 'Apr 20, 2026', status: 'reading', coverColor: '#4a2c0a' },
    { id: '2', title: 'Americanah', author: 'Chimamanda Adichie', borrowedDate: 'Apr 1, 2026', dueDate: 'Apr 22, 2026', status: 'due-soon', coverColor: '#1a2c4a' },
    { id: '3', title: 'Petals of Blood', author: 'Ngũgĩ wa Thiong\'o', borrowedDate: 'Apr 10, 2026', dueDate: 'May 1, 2026', status: 'reading', coverColor: '#2a4a1a' },
  ])

  const handleRenew = (title: string) => {
    toast.success(`"${title}" renewed! New due date: +21 days`)
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'reading': return <span className="badge reading">Reading</span>
      case 'due-soon': return <span className="badge due-soon">Due Soon</span>
      case 'overdue': return <span className="badge overdue">Overdue</span>
      default: return null
    }
  }

  return (
    <div className="mybooks-page">
      <div className="page-header">
        <h2>My Borrowed Books</h2>
        <p>You have {books.length} books currently borrowed</p>
      </div>

      <div className="books-list">
        {books.map(book => (
          <div key={book.id} className="borrowed-card">
            <div className="book-cover" style={{ background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}cc)` }}></div>
            <div className="book-details">
              <h3>{book.title}</h3>
              <p className="author">{book.author}</p>
              <div className="dates">
                <span>Borrowed: {book.borrowedDate}</span>
                <span>Due: {book.dueDate}</span>
              </div>
              {getStatusBadge(book.status)}
            </div>
            <div className="book-actions">
              <button className="renew-btn" onClick={() => handleRenew(book.title)}>
                <Icons.Renew /> Renew
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .mybooks-page {
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
        .books-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .borrowed-card {
          display: flex;
          gap: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
        }
        .book-cover {
          width: 60px;
          height: 80px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .book-details {
          flex: 1;
        }
        .book-details h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .author {
          font-size: 0.75rem;
          color: var(--muted);
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        .dates {
          display: flex;
          gap: 1rem;
          font-size: 0.7rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.65rem;
        }
        .badge.reading {
          background: rgba(82,194,120,0.1);
          color: var(--green);
        }
        .badge.due-soon {
          background: rgba(224,160,82,0.1);
          color: var(--amber);
        }
        .badge.overdue {
          background: rgba(224,82,82,0.1);
          color: var(--red);
        }
        .renew-btn {
          padding: 0.4rem 1rem;
          background: var(--gold);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  )
}