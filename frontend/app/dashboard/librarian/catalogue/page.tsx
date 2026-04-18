'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Search: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  Edit: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3l4 4-7 7H10v-4l7-7z" /></svg>),
  Add: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>),
}

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  genre: string
  copies: number
  available: number
  location: string
  spineColor: string
}

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [books] = useState<Book[]>([
    { id: '1', title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '978-0385474542', genre: 'African Lit', copies: 8, available: 4, location: 'Section A', spineColor: '#4a2c0a' },
    { id: '2', title: 'Americanah', author: 'Chimamanda Adichie', isbn: '978-0307455925', genre: 'African Lit', copies: 5, available: 2, location: 'Section A', spineColor: '#1a2c4a' },
    { id: '3', title: 'Petals of Blood', author: 'Ngũgĩ wa Thiong\'o', isbn: '978-0142007020', genre: 'African Lit', copies: 5, available: 5, location: 'Section B', spineColor: '#2a4a1a' },
    { id: '4', title: 'Born a Crime', author: 'Trevor Noah', isbn: '978-0399588174', genre: 'Memoir', copies: 3, available: 1, location: 'Section C', spineColor: '#2a1a1a' },
  ])

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  )

  return (
    <div className="catalogue-page">
      <div className="page-header">
        <h2>Book Catalogue</h2>
        <button className="add-btn"><Icons.Add /> Add New Book</button>
      </div>

      <div className="search-bar">
        <Icons.Search />
        <input type="text" placeholder="Search by title, author, or ISBN..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-spine" style={{ background: `linear-gradient(160deg, ${book.spineColor}, ${book.spineColor}cc)` }}></div>
            <div className="book-info">
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
              <div className="book-meta">{book.genre} · {book.isbn}</div>
              <div className="book-stats">Copies: {book.available}/{book.copies} · {book.location}</div>
            </div>
            <div className="book-actions">
              <button className="edit-btn"><Icons.Edit /> Edit</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .catalogue-page {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .page-header h2 {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .add-btn {
          padding: 0.5rem 1rem;
          background: var(--gold);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
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
        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }
        .book-card {
          display: flex;
          gap: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1rem;
        }
        .book-spine {
          width: 40px;
          height: 56px;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .book-info {
          flex: 1;
        }
        .book-title {
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .book-author {
          font-size: 0.7rem;
          color: var(--muted);
          font-style: italic;
        }
        .book-meta {
          font-size: 0.65rem;
          color: var(--muted);
          margin-top: 0.2rem;
        }
        .book-stats {
          font-size: 0.65rem;
          margin-top: 0.2rem;
          color: var(--sage);
        }
        .edit-btn {
          padding: 0.3rem 0.8rem;
          background: none;
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }
      `}</style>
    </div>
  )
}