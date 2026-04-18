'use client'

import { useState } from 'react'
import { toast } from 'sonner'

// SVG Icons
const Icons = {
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Notify: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Extend: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Cancel: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Collected: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Export: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
}

interface Reservation {
  id: string
  memberName: string
  memberCard: string
  bookTitle: string
  bookAuthor: string
  reservedDate: string
  status: 'ready' | 'waiting' | 'expiring'
  holdExpires?: string
  queuePosition?: number
}

export default function ReservationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedReservations, setSelectedReservations] = useState<string[]>([])

  const [reservations] = useState<Reservation[]>([
    { id: '1', memberName: 'Jane Austen', memberCard: 'LIB-004821', bookTitle: 'Half of a Yellow Sun', bookAuthor: 'Chimamanda Adichie', reservedDate: 'Apr 14', status: 'ready', holdExpires: 'Apr 19' },
    { id: '2', memberName: 'Kofi Mensah', memberCard: 'LIB-003341', bookTitle: 'Arrow of God', bookAuthor: 'Chinua Achebe', reservedDate: 'Apr 15', status: 'waiting', queuePosition: 1 },
    { id: '3', memberName: 'Grace Njeri', memberCard: 'LIB-009003', bookTitle: 'Americanah', bookAuthor: 'Chimamanda Adichie', reservedDate: 'Apr 16', status: 'ready', holdExpires: 'Apr 20' },
    { id: '4', memberName: 'Peter Kimani', memberCard: 'LIB-011009', bookTitle: 'Wizard of the Crow', bookAuthor: 'Ngũgĩ wa Thiong\'o', reservedDate: 'Apr 17', status: 'expiring', holdExpires: 'Apr 18' },
    { id: '5', memberName: 'Sarah Muthoni', memberCard: 'LIB-012345', bookTitle: 'Things Fall Apart', bookAuthor: 'Chinua Achebe', reservedDate: 'Apr 17', status: 'waiting', queuePosition: 2 },
    { id: '6', memberName: 'Michael Omondi', memberCard: 'LIB-013456', bookTitle: 'Born a Crime', bookAuthor: 'Trevor Noah', reservedDate: 'Apr 16', status: 'ready', holdExpires: 'Apr 21' },
    { id: '7', memberName: 'Esther Wanjiru', memberCard: 'LIB-014567', bookTitle: 'Petals of Blood', bookAuthor: 'Ngũgĩ wa Thiong\'o', reservedDate: 'Apr 15', status: 'waiting', queuePosition: 1 },
    { id: '8', memberName: 'Wanjiku Kamau', memberCard: 'LIB-010234', bookTitle: 'Homegoing', bookAuthor: 'Yaa Gyasi', reservedDate: 'Apr 14', status: 'ready', holdExpires: 'Apr 19' },
  ])

  const stats = {
    activeReservations: 23,
    readyForPickup: 9,
    expiredToday: 3,
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ready': return { class: 'pill pg', text: 'Ready', icon: '✅' }
      case 'waiting': return { class: 'pill pb', text: 'Waiting', icon: '⏳' }
      case 'expiring': return { class: 'pill pa', text: 'Expiring', icon: '⚠️' }
      default: return { class: 'pill pb', text: status, icon: '📋' }
    }
  }

  const filteredReservations = reservations.filter(r => {
    const matchesSearch = r.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.memberCard.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleMarkCollected = (memberName: string, bookTitle: string) => {
    toast.success(`${memberName} collected "${bookTitle}"`)
  }

  const handleCancelReservation = (memberName: string, bookTitle: string) => {
    toast.warning(`Reservation for ${memberName} cancelled`)
  }

  const handleExtendHold = (memberName: string, bookTitle: string) => {
    toast.success(`Hold extended for ${memberName}`)
  }

  const handleNotifyMember = (memberCard: string, bookTitle: string) => {
    toast.info(`Notification sent to ${memberCard} about "${bookTitle}"`)
  }

  const handleSendPickupNotices = () => {
    const readyItems = reservations.filter(r => r.status === 'ready')
    if (readyItems.length === 0) {
      toast.error('No ready-for-pickup reservations')
      return
    }
    toast.success(`Pickup notifications sent to ${readyItems.length} members`)
  }

  const handleExport = () => {
    toast.success('Reservations report exported')
  }

  return (
    <div className="reservations-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box b">
          <div className="stat-lbl">Active Reservations</div>
          <div className="stat-num blue">{stats.activeReservations}</div>
          <div className="stat-change">awaiting pickup/availability</div>
        </div>
        <div className="stat-box gr">
          <div className="stat-lbl">Ready for Pickup</div>
          <div className="stat-num green">{stats.readyForPickup}</div>
          <div className="stat-change">notify members</div>
        </div>
        <div className="stat-box a">
          <div className="stat-lbl">Expired Today</div>
          <div className="stat-num amber">{stats.expiredToday}</div>
          <div className="stat-change">48h hold expired</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">Reservation Queue</div>
          <div className="panel-actions">
            <button className="panel-action" onClick={handleSendPickupNotices}>
              <Icons.Notify /> Notify Ready ({stats.readyForPickup})
            </button>
            <button className="panel-action" onClick={handleExport}>
              <Icons.Export /> Export
            </button>
          </div>
        </div>
        <div className="panel-body">
          {/* Search and Filters */}
          <div className="filters-bar">
            <div className="search-input">
              <Icons.Search />
              <input 
                type="text" 
                placeholder="Search by member, card, or book title…" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="ready">Ready for Pickup</option>
              <option value="waiting">Waiting</option>
              <option value="expiring">Expiring</option>
            </select>
          </div>

          {/* Reservations Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Book Title</th>
                  <th>Reserved</th>
                  <th>Status</th>
                  <th>Hold Expires</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map(res => {
                  const statusBadge = getStatusBadge(res.status)
                  return (
                    <tr key={res.id}>
                      <td>
                        <div className="member-info">
                          <strong className="member-name">{res.memberName}</strong>
                          <div className="member-card">{res.memberCard}</div>
                        </div>
                      </td>
                      <td>
                        <div className="book-info">
                          <div className="book-title">{res.bookTitle}</div>
                          <div className="book-author">{res.bookAuthor}</div>
                        </div>
                      </td>
                      <td className="mono">{res.reservedDate}</td>
                      <td>
                        <span className={statusBadge.class}>
                          {statusBadge.icon} {statusBadge.text}
                        </span>
                        {res.queuePosition && (
                          <span className="queue-position">Position #{res.queuePosition}</span>
                        )}
                      </td>
                      <td className="mono">
                        {res.holdExpires ? (
                          <span className={res.status === 'expiring' ? 'expiring-date' : ''}>
                            {res.holdExpires}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="actions">
                        {res.status === 'ready' && (
                          <button className="action-btn collected" onClick={() => handleMarkCollected(res.memberName, res.bookTitle)}>
                            <Icons.Collected /> Collected
                          </button>
                        )}
                        {res.status === 'waiting' && (
                          <button className="action-btn notify" onClick={() => handleNotifyMember(res.memberCard, res.bookTitle)}>
                            <Icons.Notify /> Notify
                          </button>
                        )}
                        {res.status === 'expiring' && (
                          <button className="action-btn extend" onClick={() => handleExtendHold(res.memberName, res.bookTitle)}>
                            <Icons.Extend /> Extend
                          </button>
                        )}
                        <button className="action-btn cancel" onClick={() => handleCancelReservation(res.memberName, res.bookTitle)}>
                          <Icons.Cancel /> Cancel
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredReservations.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>No reservations match your filters</p>
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>‹ Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn" onClick={() => toast.info('Page 2')}>2</button>
            <button className="page-btn" onClick={() => toast.info('Page 3')}>3</button>
            <span className="page-dots">… 23 total</span>
            <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reservations-page {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }

        /* Stats Strip */
        .stat-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .stat-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1rem 1.1rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.18s;
        }
        .stat-box::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
        }
        .b::after { background: var(--blue); }
        .gr::after { background: var(--green); }
        .a::after { background: var(--amber); }
        .stat-lbl {
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text3);
          margin-bottom: 0.45rem;
        }
        .stat-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.8rem;
          font-weight: 500;
          line-height: 1;
        }
        .stat-num.blue { color: var(--blue); }
        .stat-num.green { color: var(--green); }
        .stat-num.amber { color: var(--amber); }
        .stat-change {
          font-size: 0.66rem;
          color: var(--text3);
          margin-top: 0.3rem;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Panel */
        .panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }
        .panel-head {
          padding: 0.9rem 1.2rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .panel-title {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .panel-actions {
          display: flex;
          gap: 0.5rem;
        }
        .panel-action {
          font-size: 0.68rem;
          color: var(--gold);
          cursor: pointer;
          border: 1px solid rgba(201,168,76,0.22);
          padding: 0.28rem 0.65rem;
          border-radius: 3px;
          background: none;
          transition: all 0.14s;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .panel-action:hover {
          background: rgba(201,168,76,0.1);
        }
        .panel-body {
          padding: 1rem 1.2rem;
        }

        /* Filters Bar */
        .filters-bar {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }
        .search-input {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input svg {
          position: absolute;
          left: 0.8rem;
          color: var(--text3);
        }
        .search-input input {
          width: 100%;
          padding: 0.55rem 0.9rem 0.55rem 2.2rem;
          border: 1px solid var(--border);
          border-radius: 3px;
          background: var(--bg3);
          color: var(--text);
          font-size: 0.8rem;
          outline: none;
          transition: border-color 0.18s;
        }
        .search-input input:focus {
          border-color: rgba(201,168,76,0.4);
        }
        .filters-bar select {
          padding: 0.55rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 3px;
          background: var(--bg3);
          color: var(--text2);
          font-size: 0.78rem;
          outline: none;
          cursor: pointer;
          min-width: 160px;
        }

        /* Table */
        .table-wrapper {
          overflow-x: auto;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.76rem;
        }
        .data-table th {
          font-size: 0.59rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text3);
          padding: 0 0.75rem 0.55rem;
          text-align: left;
          font-weight: 500;
          border-bottom: 1px solid var(--border);
        }
        .data-table td {
          padding: 0.75rem 0.75rem;
          border-bottom: 1px solid var(--border);
          color: var(--text2);
          vertical-align: middle;
        }
        .data-table tr:last-child td {
          border-bottom: none;
        }
        .data-table tr:hover td {
          background: rgba(255,255,255,0.02);
          color: var(--text);
        }
        .member-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .member-name {
          color: var(--text);
          font-weight: 500;
        }
        .member-card {
          font-size: 0.65rem;
          color: var(--text3);
          font-family: 'JetBrains Mono', monospace;
        }
        .book-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .book-title {
          font-weight: 500;
          color: var(--text);
        }
        .book-author {
          font-size: 0.65rem;
          color: var(--text3);
          font-style: italic;
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.58rem;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .pg { background: rgba(82,194,120,0.12); color: var(--green); }
        .pb { background: rgba(82,148,224,0.12); color: var(--blue); }
        .pa { background: rgba(224,160,82,0.12); color: var(--amber); }
        .queue-position {
          display: inline-block;
          margin-left: 0.5rem;
          font-size: 0.55rem;
          color: var(--text3);
        }
        .expiring-date {
          color: var(--amber);
          font-weight: 500;
        }

        /* Actions */
        .actions {
          display: flex;
          gap: 0.3rem;
          flex-wrap: wrap;
        }
        .action-btn {
          font-size: 0.62rem;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid var(--border2);
          background: none;
          color: var(--text2);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          transition: all 0.13s;
        }
        .action-btn.collected:hover {
          border-color: rgba(82,194,120,0.4);
          color: var(--green);
        }
        .action-btn.notify:hover {
          border-color: rgba(82,148,224,0.4);
          color: var(--blue);
        }
        .action-btn.extend:hover {
          border-color: rgba(201,168,76,0.4);
          color: var(--gold);
        }
        .action-btn.cancel:hover {
          border-color: rgba(224,82,82,0.4);
          color: var(--red);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--text3);
        }
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        /* Pagination */
        .pagination {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          justify-content: flex-end;
          padding-top: 1rem;
          margin-top: 0.5rem;
          border-top: 1px solid var(--border);
        }
        .page-btn {
          min-width: 28px;
          height: 28px;
          border-radius: 3px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text2);
          font-size: 0.72rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          transition: all 0.13s;
        }
        .page-btn:hover {
          background: var(--surface2);
          color: var(--text);
        }
        .page-btn.active {
          background: var(--gold);
          color: #0e0e0f;
          border-color: var(--gold);
          font-weight: 700;
        }
        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .page-dots {
          font-size: 0.68rem;
          color: var(--text3);
          padding: 0 0.4rem;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .stat-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .filters-bar {
            flex-direction: column;
          }
          .filters-bar select {
            width: 100%;
          }
          .actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}