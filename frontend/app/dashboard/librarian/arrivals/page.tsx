'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Classify: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>),
}

interface NewArrival {
  id: string
  title: string
  author: string
  category: string
  copies: number
  receivedDate: string
  spineColor: string
}

export default function ArrivalsPage() {
  const [arrivals] = useState<NewArrival[]>([
    { id: '1', title: 'The Famished Road', author: 'Ben Okri', category: 'Fiction', copies: 2, receivedDate: 'Apr 17', spineColor: '#4a2c0a' },
    { id: '2', title: 'Born a Crime', author: 'Trevor Noah', category: 'Memoir', copies: 1, receivedDate: 'Apr 16', spineColor: '#1a3a5a' },
    { id: '3', title: 'Homegoing', author: 'Yaa Gyasi', category: 'Fiction', copies: 3, receivedDate: 'Apr 15', spineColor: '#1a4a2a' },
    { id: '4', title: 'The River and the Source', author: 'Margaret Ogola', category: 'Fiction', copies: 2, receivedDate: 'Apr 14', spineColor: '#3a2a0a' },
  ])

  const handleClassify = (title: string) => {
    toast.info(`Opening classification wizard for "${title}"`)
  }

  return (
    <div className="arrivals-page">
      <div className="page-header">
        <h2>New Arrivals</h2>
        <p>Recently received books awaiting classification</p>
      </div>

      <div className="arrivals-list">
        {arrivals.map(book => (
          <div key={book.id} className="arrival-card">
            <div className="arrival-spine" style={{ background: `linear-gradient(160deg, ${book.spineColor}, ${book.spineColor}cc)` }}></div>
            <div className="arrival-info">
              <div className="arrival-title">{book.title}</div>
              <div className="arrival-author">{book.author}</div>
              <div className="arrival-meta">{book.category} · {book.copies} copies · Received {book.receivedDate}</div>
            </div>
            <button className="classify-btn" onClick={() => handleClassify(book.title)}>
              <Icons.Classify /> Classify
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .arrivals-page {
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
        .arrivals-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .arrival-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1rem;
        }
        .arrival-spine {
          width: 40px;
          height: 56px;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .arrival-info {
          flex: 1;
        }
        .arrival-title {
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .arrival-author {
          font-size: 0.7rem;
          color: var(--muted);
          font-style: italic;
        }
        .arrival-meta {
          font-size: 0.65rem;
          color: var(--muted);
          margin-top: 0.2rem;
        }
        .classify-btn {
          padding: 0.5rem 1rem;
          background: var(--gold);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
      `}</style>
    </div>
  )
}