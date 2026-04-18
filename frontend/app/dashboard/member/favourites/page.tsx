'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Heart: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
  Remove: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  Borrow: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M9 12h6M12 9v6" /></svg>),
}

interface Favourite {
  id: string
  title: string
  author: string
  rating: number
  coverColor: string
}

export default function FavouritesPage() {
  const [favourites] = useState<Favourite[]>([
    { id: '1', title: 'Things Fall Apart', author: 'Chinua Achebe', rating: 5, coverColor: '#4a2c0a' },
    { id: '2', title: 'Americanah', author: 'Chimamanda Adichie', rating: 4, coverColor: '#1a2c4a' },
    { id: '3', title: 'Petals of Blood', author: 'Ngũgĩ wa Thiong\'o', rating: 5, coverColor: '#2a4a1a' },
  ])

  const handleRemove = (title: string) => {
    toast.info(`"${title}" removed from favourites`)
  }

  const handleBorrow = (title: string) => {
    toast.success(`"${title}" added to cart`)
  }

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="favourites-page">
      <div className="page-header">
        <h2>My Favourites</h2>
        <p>Books you've loved and rated highly</p>
      </div>

      {favourites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h3>No favourites yet</h3>
          <p>Click the heart icon on any book to add it to your favourites</p>
        </div>
      ) : (
        <div className="favourites-list">
          {favourites.map(book => (
            <div key={book.id} className="favourite-card">
              <div className="book-cover" style={{ background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}cc)` }}></div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <div className="rating">
                  <span className="stars">{renderStars(book.rating)}</span>
                  <span className="rating-text">({book.rating}/5)</span>
                </div>
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
        .favourites-page {
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
        }
        .favourites-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .favourite-card {
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
          margin-bottom: 0.3rem;
        }
        .rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .stars {
          color: var(--gold);
          font-size: 0.8rem;
        }
        .rating-text {
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