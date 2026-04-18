'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Cancel: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  Notify: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>),
}

interface Reservation {
  id: string
  title: string
  author: string
  reservedDate: string
  status: 'ready' | 'waiting'
  expires?: string
  queuePosition?: number
}

export default function ReservationsPage() {
  const [reservations] = useState<Reservation[]>([
    { id: '1', title: 'Half of a Yellow Sun', author: 'Chimamanda Adichie', reservedDate: 'Apr 14, 2026', status: 'ready', expires: 'Apr 21, 2026' },
    { id: '2', title: 'The River Between', author: 'Ngũgĩ wa Thiong\'o', reservedDate: 'Apr 10, 2026', status: 'waiting', queuePosition: 3 },
  ])

  const handleCancel = (title: string) => {
    toast.info(`Reservation for "${title}" cancelled`)
  }

  const handleNotify = () => {
    toast.info('We\'ll notify you when your reservation is ready')
  }

  return (
    <div className="reservations-page">
      <div className="page-header">
        <h2>My Reservations</h2>
        <p>Books you have reserved</p>
      </div>

      <div className="reservations-list">
        {reservations.map(res => (
          <div key={res.id} className="reservation-card">
            <div className="reservation-info">
              <h3>{res.title}</h3>
              <p className="author">{res.author}</p>
              <div className="meta">
                <span>Reserved: {res.reservedDate}</span>
                {res.status === 'ready' && <span className="expires">Pick up by: {res.expires}</span>}
                {res.status === 'waiting' && <span className="queue">Position: #{res.queuePosition}</span>}
              </div>
              <span className={`status ${res.status}`}>{res.status === 'ready' ? 'Ready for Pickup' : 'Waiting'}</span>
            </div>
            <div className="actions">
              {res.status === 'ready' && (
                <button className="notify-btn" onClick={handleNotify}>
                  <Icons.Notify /> Notify Me
                </button>
              )}
              <button className="cancel-btn" onClick={() => handleCancel(res.title)}>
                <Icons.Cancel /> Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .reservations-page {
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
        .reservations-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .reservation-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
        }
        .reservation-info h3 {
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
        .meta {
          display: flex;
          gap: 1rem;
          font-size: 0.7rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .expires {
          color: var(--amber);
        }
        .queue {
          color: var(--blue);
        }
        .status {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.65rem;
        }
        .status.ready {
          background: rgba(82,194,120,0.1);
          color: var(--green);
        }
        .status.waiting {
          background: rgba(82,148,224,0.1);
          color: var(--blue);
        }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        .notify-btn, .cancel-btn {
          padding: 0.4rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
        }
        .notify-btn {
          background: var(--gold);
          border: none;
        }
        .cancel-btn {
          background: none;
          border: 1px solid var(--border);
        }
      `}</style>
    </div>
  )
}