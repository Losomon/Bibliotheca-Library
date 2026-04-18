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
  Export: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Filter: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3" />
    </svg>
  ),
}

interface Transaction {
  id: string
  type: 'borrow' | 'return' | 'renew' | 'purchase' | 'fine'
  memberName: string
  memberCard: string
  bookTitle: string
  date: string
  amount: number
  status: 'complete' | 'pending' | 'failed'
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterPeriod, setFilterPeriod] = useState('today')
  const [currentPage, setCurrentPage] = useState(1)

  const [transactions] = useState<Transaction[]>([
    { id: 'TX-9921', type: 'borrow', memberName: 'Jane Austen', memberCard: 'LIB-004821', bookTitle: 'Things Fall Apart', date: 'Apr 17, 14:22', amount: 0, status: 'complete' },
    { id: 'TX-9920', type: 'return', memberName: 'David Ochieng', memberCard: 'LIB-001198', bookTitle: 'Weep Not, Child', date: 'Apr 17, 13:45', amount: 40, status: 'complete' },
    { id: 'TX-9919', type: 'purchase', memberName: 'Grace Njeri', memberCard: 'LIB-009003', bookTitle: 'Americanah', date: 'Apr 17, 12:10', amount: 1500, status: 'complete' },
    { id: 'TX-9918', type: 'renew', memberName: 'Kofi Mensah', memberCard: 'LIB-003341', bookTitle: 'Petals of Blood', date: 'Apr 17, 11:30', amount: 0, status: 'complete' },
    { id: 'TX-9917', type: 'fine', memberName: 'Amina Wanjiku', memberCard: 'LIB-007712', bookTitle: 'Arrow of God', date: 'Apr 17, 09:00', amount: 300, status: 'pending' },
    { id: 'TX-9916', type: 'borrow', memberName: 'Peter Kimani', memberCard: 'LIB-011009', bookTitle: 'Born a Crime', date: 'Apr 16, 16:45', amount: 0, status: 'complete' },
    { id: 'TX-9915', type: 'return', memberName: 'Sarah Muthoni', memberCard: 'LIB-012345', bookTitle: 'Homegoing', date: 'Apr 16, 15:20', amount: 0, status: 'complete' },
    { id: 'TX-9914', type: 'purchase', memberName: 'Michael Omondi', memberCard: 'LIB-013456', bookTitle: 'The Famished Road', date: 'Apr 16, 14:10', amount: 1300, status: 'complete' },
    { id: 'TX-9913', type: 'borrow', memberName: 'Esther Wanjiru', memberCard: 'LIB-014567', bookTitle: 'Purple Hibiscus', date: 'Apr 16, 11:45', amount: 0, status: 'complete' },
    { id: 'TX-9912', type: 'fine', memberName: 'James Mwakio', memberCard: 'LIB-002234', bookTitle: 'Wizard of the Crow', date: 'Apr 16, 09:30', amount: 200, status: 'pending' },
    { id: 'TX-9911', type: 'renew', memberName: 'Wanjiku Kamau', memberCard: 'LIB-010234', bookTitle: 'A Grain of Wheat', date: 'Apr 15, 16:00', amount: 0, status: 'complete' },
    { id: 'TX-9910', type: 'return', memberName: 'Kofi Mensah', memberCard: 'LIB-003341', bookTitle: 'Americanah', date: 'Apr 15, 14:30', amount: 0, status: 'complete' },
  ])

  const stats = {
    checkoutsToday: 86,
    returnsToday: 54,
    renewalsToday: 23,
    purchasesToday: 14200,
    checkoutsChange: '+12% vs yesterday',
    returnsChange: '+8% vs yesterday',
  }

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'borrow': return { bg: 'rgba(82,194,120,0.12)', color: 'var(--green)', label: 'Borrow' }
      case 'return': return { bg: 'rgba(82,148,224,0.12)', color: 'var(--blue)', label: 'Return' }
      case 'renew': return { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold)', label: 'Renew' }
      case 'purchase': return { bg: 'rgba(224,160,82,0.12)', color: 'var(--amber)', label: 'Purchase' }
      case 'fine': return { bg: 'rgba(224,82,82,0.12)', color: 'var(--red)', label: 'Fine' }
      default: return { bg: 'rgba(255,255,255,0.08)', color: 'var(--text2)', label: type }
    }
  }

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'complete': return { class: 'pill pg', text: 'Complete' }
      case 'pending': return { class: 'pill pa', text: 'Pending' }
      case 'failed': return { class: 'pill pr', text: 'Failed' }
      default: return { class: 'pill pb', text: status }
    }
  }

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.memberCard.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || t.type === filterType
    return matchesSearch && matchesType
  })

  const handleExport = () => {
    toast.success('Transactions exported to CSV')
  }

  const getPeriodLabel = () => {
    switch(filterPeriod) {
      case 'today': return 'Today'
      case 'week': return 'This Week'
      case 'month': return 'This Month'
      default: return 'All Time'
    }
  }

  return (
    <div className="transactions-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box gr">
          <div className="stat-lbl">Checkouts Today</div>
          <div className="stat-num green">{stats.checkoutsToday}</div>
          <div className="stat-change">{stats.checkoutsChange}</div>
        </div>
        <div className="stat-box b">
          <div className="stat-lbl">Returns Today</div>
          <div className="stat-num blue">{stats.returnsToday}</div>
          <div className="stat-change">{stats.returnsChange}</div>
        </div>
        <div className="stat-box g">
          <div className="stat-lbl">Renewals Today</div>
          <div className="stat-num gold">{stats.renewalsToday}</div>
          <div className="stat-change">automatic: 11</div>
        </div>
        <div className="stat-box a">
          <div className="stat-lbl">Purchases Today</div>
          <div className="stat-num amber">Ksh {stats.purchasesToday.toLocaleString()}</div>
          <div className="stat-change">9 orders placed</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">Transaction Log</div>
          <div className="panel-actions">
            <button className="panel-action" onClick={handleExport}>
              <Icons.Export /> Export CSV
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
                placeholder="Search by member, book, card no, tx ID…" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="borrow">Borrow</option>
              <option value="return">Return</option>
              <option value="renew">Renew</option>
              <option value="purchase">Purchase</option>
              <option value="fine">Fine</option>
            </select>
            <select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)}>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Transactions Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tx ID</th>
                  <th>Type</th>
                  <th>Member</th>
                  <th>Book</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(tx => {
                  const typeStyle = getTypeStyles(tx.type)
                  const statusStyle = getStatusStyles(tx.status)
                  return (
                    <tr key={tx.id}>
                      <td className="mono">{tx.id}</td>
                      <td>
                        <span className="type-badge" style={{ background: typeStyle.bg, color: typeStyle.color }}>
                          {typeStyle.label}
                        </span>
                      </td>
                      <td>
                        <div className="member-info">
                          <strong>{tx.memberName}</strong>
                          <div className="member-card">{tx.memberCard}</div>
                        </div>
                      </td>
                      <td className="book-title">{tx.bookTitle}</td>
                      <td className="mono date">{tx.date}</td>
                      <td className={`amount ${tx.type === 'fine' ? 'fine' : tx.type === 'purchase' ? 'purchase' : ''}`}>
                        {tx.amount === 0 ? 'Free' : `Ksh ${tx.amount.toLocaleString()}`}
                      </td>
                      <td>
                        <span className={statusStyle.class}>{statusStyle.text}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>‹ Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn" onClick={() => toast.info('Page 2')}>2</button>
            <button className="page-btn" onClick={() => toast.info('Page 3')}>3</button>
            <span className="page-dots">… 9,921 total</span>
            <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transactions-page {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }

        /* Stats Strip */
        .stat-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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
        .gr::after { background: var(--green); }
        .b::after { background: var(--blue); }
        .g::after { background: var(--gold); }
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
        .stat-num.green { color: var(--green); }
        .stat-num.blue { color: var(--blue); }
        .stat-num.gold { color: var(--gold); }
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
          min-width: 130px;
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
        .mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
        }
        .date {
          font-size: 0.68rem;
        }
        .type-badge {
          display: inline-block;
          font-size: 0.6rem;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .member-info {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .member-info strong {
          color: var(--text);
        }
        .member-card {
          font-size: 0.65rem;
          color: var(--text3);
          font-family: 'JetBrains Mono', monospace;
        }
        .book-title {
          font-weight: 500;
          color: var(--text);
          max-width: 200px;
        }
        .amount {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
        }
        .amount.fine {
          color: var(--red);
        }
        .amount.purchase {
          color: var(--amber);
        }
        .pill {
          display: inline-block;
          font-size: 0.55rem;
          padding: 2px 7px;
          border-radius: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .pg { background: rgba(82,194,120,0.12); color: var(--green); }
        .pr { background: rgba(224,82,82,0.12); color: var(--red); }
        .pa { background: rgba(224,160,82,0.12); color: var(--amber); }
        .pb { background: rgba(82,148,224,0.12); color: var(--blue); }

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
        }
      `}</style>
    </div>
  )
}