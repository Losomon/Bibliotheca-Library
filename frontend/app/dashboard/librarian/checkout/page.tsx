'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Icons = {
  Search: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  CheckOut: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M9 12h6M12 9v6" /></svg>),
  User: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Book: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>),
}

export default function CheckoutPage() {
  const [memberCard, setMemberCard] = useState('')
  const [bookId, setBookId] = useState('')
  const [memberInfo, setMemberInfo] = useState<any>(null)
  const [bookInfo, setBookInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleLookupMember = () => {
    if (!memberCard) {
      toast.error('Please enter member card number')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setMemberInfo({
        name: 'Jane Austen',
        cardNo: memberCard,
        type: 'Standard',
        booksOut: 3,
        maxAllowed: 5,
        fines: 0
      })
      setLoading(false)
      toast.success('Member found')
    }, 500)
  }

  const handleLookupBook = () => {
    if (!bookId) {
      toast.error('Please enter book ISBN or title')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setBookInfo({
        title: 'Things Fall Apart',
        author: 'Chinua Achebe',
        isbn: bookId,
        available: 4,
        total: 8,
        location: 'Section A, Row 3'
      })
      setLoading(false)
      toast.success('Book found')
    }, 500)
  }

  const handleCheckout = () => {
    if (!memberInfo || !bookInfo) {
      toast.error('Please lookup both member and book first')
      return
    }
    if (memberInfo.booksOut >= memberInfo.maxAllowed) {
      toast.error('Member has reached borrowing limit')
      return
    }
    if (bookInfo.available === 0) {
      toast.error('No copies available for checkout')
      return
    }
    toast.success(`Checked out "${bookInfo.title}" to ${memberInfo.name}`)
    setMemberCard('')
    setBookId('')
    setMemberInfo(null)
    setBookInfo(null)
  }

  return (
    <div className="checkout-page">
      <div className="page-header">
        <h2>Check-out Books</h2>
        <p>Scan member card and book ISBN to process checkout</p>
      </div>

      <div className="checkout-grid">
        {/* Member Section */}
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title"><Icons.User /> Member Information</div>
          </div>
          <div className="panel-body">
            <div className="input-group">
              <label>Member Card Number</label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  placeholder="LIB-XXXXXX" 
                  value={memberCard}
                  onChange={(e) => setMemberCard(e.target.value)}
                />
                <button onClick={handleLookupMember} disabled={loading}>
                  <Icons.Search /> Lookup
                </button>
              </div>
            </div>
            {memberInfo && (
              <div className="member-info">
                <div className="info-row"><strong>Name:</strong> {memberInfo.name}</div>
                <div className="info-row"><strong>Card No:</strong> {memberInfo.cardNo}</div>
                <div className="info-row"><strong>Type:</strong> {memberInfo.type}</div>
                <div className="info-row"><strong>Books Borrowed:</strong> {memberInfo.booksOut}/{memberInfo.maxAllowed}</div>
                <div className="info-row"><strong>Fines:</strong> Ksh {memberInfo.fines}</div>
              </div>
            )}
          </div>
        </div>

        {/* Book Section */}
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title"><Icons.Book /> Book Information</div>
          </div>
          <div className="panel-body">
            <div className="input-group">
              <label>Book ISBN / Title</label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  placeholder="ISBN or title" 
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                />
                <button onClick={handleLookupBook} disabled={loading}>
                  <Icons.Search /> Lookup
                </button>
              </div>
            </div>
            {bookInfo && (
              <div className="book-info">
                <div className="info-row"><strong>Title:</strong> {bookInfo.title}</div>
                <div className="info-row"><strong>Author:</strong> {bookInfo.author}</div>
                <div className="info-row"><strong>ISBN:</strong> {bookInfo.isbn}</div>
                <div className="info-row"><strong>Available:</strong> {bookInfo.available}/{bookInfo.total}</div>
                <div className="info-row"><strong>Location:</strong> {bookInfo.location}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-primary" onClick={handleCheckout} disabled={!memberInfo || !bookInfo}>
          <Icons.CheckOut /> Confirm Checkout
        </button>
      </div>

      <style jsx>{`
        .checkout-page {
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
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .panel-head {
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid var(--border);
        }
        .panel-title {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .panel-body {
          padding: 1rem 1.2rem;
        }
        .input-group {
          margin-bottom: 1rem;
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
        .member-info, .book-info {
          margin-top: 1rem;
          padding: 0.8rem;
          background: var(--bg);
          border-radius: 6px;
        }
        .info-row {
          font-size: 0.8rem;
          padding: 0.3rem 0;
          border-bottom: 1px solid var(--border);
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .action-buttons {
          display: flex;
          justify-content: flex-end;
        }
        .btn-primary {
          padding: 0.7rem 1.5rem;
          background: var(--sage);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}