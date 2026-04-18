'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Remove: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  Move: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>),
  Borrow: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M9 12h6M12 9v6" /></svg>),
}

interface ReadingItem {
  id: string
  title: string
  author: string
  addedDate: string
  coverColor: string
}

export default function ReadingListPage() {
  const [readingList] = useState<ReadingItem[]>([
    { id: '1', title: 'The River Between', author: 'Ngũgĩ wa Thiong\'o', addedDate: 'Apr 10, 2026', coverColor: '#2a4a3a' },
    { id: '2', title: 'Weep Not, Child', author: 'Ngũgĩ wa Thiong\'o', addedDate: 'Apr 5, 2026', coverColor: '#1a1a4a' },
    { id: '3', title: 'Season of Migration', author: 'Tayeb Salih', addedDate: 'Apr 1, 2026', coverColor: '#4a2a0a' },
  ])

  const handleRemove = (title: string) => {
    toast.info(`"${title}" removed from reading list`)
  }

  const handleBorrow = (title: string) => {
    toast.success(`"${title}" added to cart for borrowing`)
  }

  return (
    <div className="reading-list-page">
      <div className="page-header">
        <h2>My Reading List</h2>
        <p>Books you want to read later</p>
      </div>

      {readingList.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>Your reading list is empty</h3>
          <p>Browse the catalogue and add books you want to read</p>
          <button className="browse-btn" onClick={() => window.location.href = '/dashboard/member/catalogue'}>
            Browse Catalogue
          </button>
        </div>
      ) : (
        <div className="reading-list">
          {readingList.map(book => (
            <div key={book.id} className="reading-card">
              <div className="book-cover" style={{ background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}cc)` }}></div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p className="added">Added: {book.addedDate}</p>
              </div>
              <div className="book-actions">
                <button className="borrow-btn" onClick={() => handleBorrow(book.title)}>
                  <Icons.Borrow /> Borrow
                </button>
                <button className="remove-btn" onClick={() => handleRemove(book.title)}>
                  <Icons.Remove /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .reading-list-page {
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
        .empty-state {
          text-align: center;
          padding: 3rem;
          background: var(--surface);
          border-radius: 12px;
        }
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .empty-state h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        .empty-state p {
          font-size: 0.8rem;
          color: var(--muted);
          margin-bottom: 1rem;
        }
        .browse-btn {
          padding: 0.5rem 1.5rem;
          background: var(--gold);
          border: none;
          border-radius: 30px;
          cursor: pointer;
        }
        .reading-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .reading-card {
          display: flex;
          gap: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
          align-items: center;
        }
        .book-cover {
          width: 50px;
          height: 70px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .book-info {
          flex: 1;
        }
        .book-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .author {
          font-size: 0.75rem;
          color: var(--muted);
          font-style: italic;
          margin-bottom: 0.2rem;
        }
        .added {
          font-size: 0.65rem;
          color: var(--muted);
        }
        .book-actions {
          display: flex;
          gap: 0.5rem;
        }
        .borrow-btn, .remove-btn {
          padding: 0.4rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
        }
        .borrow-btn {
          background: var(--sage);
          color: white;
          border: none;
        }
        .remove-btn {
          background: none;
          border: 1px solid var(--border);
        }
      `}</style>
    </div>
  )
}