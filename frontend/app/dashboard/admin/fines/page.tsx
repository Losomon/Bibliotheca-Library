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
  Notify: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
}

interface FineAccount {
  id: string
  memberName: string
  cardNo: string
  booksOverdue: number
  fine: number
  daysSinceDue: number
  status: 'pending' | 'paid' | 'waived'
}

interface WaiverRequest {
  id: string
  cardNo: string
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'denied'
}

export default function FinesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showWaiverModal, setShowWaiverModal] = useState(false)
  const [selectedWaiver, setSelectedWaiver] = useState<WaiverRequest | null>(null)

  const [fineAccounts] = useState<FineAccount[]>([
    { id: '1', memberName: 'Amina Wanjiku', cardNo: 'LIB-007712', booksOverdue: 1, fine: 300, daysSinceDue: 30, status: 'pending' },
    { id: '2', memberName: 'James Mwakio', cardNo: 'LIB-002234', booksOverdue: 2, fine: 420, daysSinceDue: 21, status: 'pending' },
    { id: '3', memberName: 'Fatuma Hassan', cardNo: 'LIB-005567', booksOverdue: 1, fine: 120, daysSinceDue: 12, status: 'pending' },
    { id: '4', memberName: 'Samuel Kiprotich', cardNo: 'LIB-008812', booksOverdue: 1, fine: 90, daysSinceDue: 9, status: 'pending' },
    { id: '5', memberName: 'Lucy Wambui', cardNo: 'LIB-001045', booksOverdue: 1, fine: 70, daysSinceDue: 7, status: 'pending' },
    { id: '6', memberName: 'John Otieno', cardNo: 'LIB-009876', booksOverdue: 1, fine: 50, daysSinceDue: 5, status: 'pending' },
    { id: '7', memberName: 'Mary Wanjiku', cardNo: 'LIB-003210', booksOverdue: 1, fine: 40, daysSinceDue: 4, status: 'pending' },
    { id: '8', memberName: 'Peter Kimani', cardNo: 'LIB-006543', booksOverdue: 1, fine: 30, daysSinceDue: 3, status: 'pending' },
  ])

  const [waiverRequests] = useState<WaiverRequest[]>([
    { id: '1', cardNo: 'LIB-003341', amount: 80, reason: 'Medical emergency', status: 'pending' },
    { id: '2', cardNo: 'LIB-009003', amount: 40, reason: 'First offence', status: 'pending' },
  ])

  const [collectionsData] = useState([
    { month: 'January', amount: 8200 },
    { month: 'February', amount: 6400 },
    { month: 'March', amount: 11800 },
    { month: 'April (so far)', amount: 12800 },
  ])

  const stats = {
    totalOutstanding: 28540,
    collectedThisMonth: 12800,
    overdue30Days: 8200,
    avgFinePerAccount: 321,
  }

  const getDaysPill = (days: number) => {
    if (days > 25) return { class: 'pill pr', text: `${days} days` }
    if (days > 14) return { class: 'pill pa', text: `${days} days` }
    return { class: 'pill pa2', text: `${days} days` }
  }

  const getStatusPill = (status: string) => {
    switch(status) {
      case 'pending': return { class: 'pill pr', text: 'Pending' }
      case 'paid': return { class: 'pill pg', text: 'Paid' }
      case 'waived': return { class: 'pill pb', text: 'Waived' }
      default: return { class: 'pill pb', text: status }
    }
  }

  const filteredAccounts = fineAccounts.filter(account => {
    const matchesSearch = account.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.cardNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleMarkPaid = (memberName: string, amount: number) => {
    toast.success(`Ksh ${amount} marked as paid for ${memberName}`)
  }

  const handleNotify = (cardNo: string) => {
    toast.info(`Payment reminder sent to ${cardNo}`)
  }

  const handleApproveWaiver = (id: string) => {
    toast.success('Waiver approved')
    setShowWaiverModal(false)
  }

  const handleDenyWaiver = (id: string) => {
    toast.error('Waiver denied')
    setShowWaiverModal(false)
  }

  const handleExport = () => {
    toast.success('Fines report exported')
  }

  const maxCollection = Math.max(...collectionsData.map(c => c.amount))

  return (
    <div className="fines-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box a">
          <div className="stat-lbl">Total Outstanding</div>
          <div className="stat-num amber">Ksh {stats.totalOutstanding.toLocaleString()}</div>
          <div className="stat-change">89 accounts</div>
        </div>
        <div className="stat-box gr">
          <div className="stat-lbl">Collected This Month</div>
          <div className="stat-num green">Ksh {stats.collectedThisMonth.toLocaleString()}</div>
          <div className="stat-change">34 payments</div>
        </div>
        <div className="stat-box r">
          <div className="stat-lbl">Overdue &gt;30 Days</div>
          <div className="stat-num red">Ksh {stats.overdue30Days.toLocaleString()}</div>
          <div className="stat-change">12 accounts</div>
        </div>
        <div className="stat-box b">
          <div className="stat-lbl">Avg Fine / Account</div>
          <div className="stat-num blue">{stats.avgFinePerAccount}</div>
          <div className="stat-change">Ksh per account</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="fines-grid">
        {/* Left Panel - Fine Accounts */}
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Fine Accounts</div>
            <div className="panel-actions">
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
                  placeholder="Search by member name or card no…" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="waived">Waived</option>
              </select>
            </div>

            {/* Fine Accounts Table */}
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Card No.</th>
                    <th>Books Overdue</th>
                    <th>Fine (Ksh)</th>
                    <th>Days Since Due</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map(account => {
                    const daysPill = getDaysPill(account.daysSinceDue)
                    const statusPill = getStatusPill(account.status)
                    return (
                      <tr key={account.id}>
                        <td>
                          <strong className="member-name">{account.memberName}</strong>
                        </td>
                        <td className="mono">{account.cardNo}</td>
                        <td className="mono">{account.booksOverdue}</td>
                        <td className="fine-amount">Ksh {account.fine}</td>
                        <td><span className={daysPill.class}>{daysPill.text}</span></td>
                        <td><span className={statusPill.class}>{statusPill.text}</span></td>
                        <td className="actions">
                          {account.status === 'pending' && (
                            <>
                              <button className="action-btn paid" onClick={() => handleMarkPaid(account.memberName, account.fine)}>
                                <Icons.Check /> Mark Paid
                              </button>
                              <button className="action-btn notify" onClick={() => handleNotify(account.cardNo)}>
                                <Icons.Notify /> Notify
                              </button>
                            </>
                          )}
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
              <span className="page-dots">… 89 accounts</span>
              <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
            </div>
          </div>
        </div>

        {/* Right Panels */}
        <div className="right-panels">
          {/* Collections Chart */}
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Collections by Month</div>
            </div>
            <div className="panel-body">
              {collectionsData.map((item, idx) => {
                const percentage = (item.amount / maxCollection) * 100
                const barColor = item.month === 'March' || item.month === 'April (so far)' ? 'var(--gold)' : 'var(--green)'
                return (
                  <div key={idx} className="collection-bar">
                    <div className="collection-bar-top">
                      <span>{item.month}</span>
                      <span>Ksh {item.amount.toLocaleString()}</span>
                    </div>
                    <div className="collection-bar-track">
                      <div 
                        className="collection-bar-fill" 
                        style={{ width: `${percentage}%`, background: barColor }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Waiver Requests */}
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Waiver Requests</div>
              <button className="panel-action" onClick={() => toast.info('New waiver form')}>+ New</button>
            </div>
            <div className="panel-body">
              {waiverRequests.map(request => (
                <div key={request.id} className="waiver-item">
                  <div className="waiver-dot" style={{ background: 'var(--amber)' }}></div>
                  <div className="waiver-info">
                    <strong>{request.cardNo}</strong> — Ksh {request.amount} — {request.reason}
                  </div>
                  <div className="waiver-actions">
                    <button className="waiver-btn approve" onClick={() => handleApproveWaiver(request.id)}>
                      <Icons.Check /> Approve
                    </button>
                    <button className="waiver-btn deny" onClick={() => handleDenyWaiver(request.id)}>
                      <Icons.Close /> Deny
                    </button>
                  </div>
                </div>
              ))}
              {waiverRequests.length === 0 && (
                <div className="empty-waivers">No pending waiver requests</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fines-page {
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
        .a::after { background: var(--amber); }
        .gr::after { background: var(--green); }
        .r::after { background: var(--red); }
        .b::after { background: var(--blue); }
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
        .stat-num.amber { color: var(--amber); }
        .stat-num.green { color: var(--green); }
        .stat-num.red { color: var(--red); }
        .stat-num.blue { color: var(--blue); }
        .stat-change {
          font-size: 0.66rem;
          color: var(--text3);
          margin-top: 0.3rem;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Grid Layout */
        .fines-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.2rem;
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
          min-width: 120px;
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
        .member-name {
          color: var(--text);
          font-weight: 500;
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
        }
        .fine-amount {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          color: var(--amber);
        }
        .pill {
          display: inline-block;
          font-size: 0.58rem;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .pr { background: rgba(224,82,82,0.12); color: var(--red); }
        .pa { background: rgba(224,160,82,0.12); color: var(--amber); }
        .pa2 { background: rgba(201,168,76,0.12); color: var(--gold); }
        .pg { background: rgba(82,194,120,0.12); color: var(--green); }
        .pb { background: rgba(82,148,224,0.12); color: var(--blue); }

        /* Actions */
        .actions {
          display: flex;
          gap: 0.3rem;
          white-space: nowrap;
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
        .action-btn.paid:hover {
          border-color: rgba(82,194,120,0.4);
          color: var(--green);
        }
        .action-btn.notify:hover {
          border-color: rgba(82,148,224,0.4);
          color: var(--blue);
        }

        /* Right Panels */
        .right-panels {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        /* Collection Bars */
        .collection-bar {
          margin-bottom: 0.8rem;
        }
        .collection-bar-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          margin-bottom: 0.25rem;
        }
        .collection-bar-top span:first-child { color: var(--text2); }
        .collection-bar-top span:last-child { color: var(--text); font-family: 'JetBrains Mono', monospace; }
        .collection-bar-track {
          height: 4px;
          background: var(--bg3);
          border-radius: 2px;
          overflow: hidden;
        }
        .collection-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        /* Waiver Items */
        .waiver-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 0;
          border-bottom: 1px solid var(--border);
        }
        .waiver-item:last-child {
          border-bottom: none;
        }
        .waiver-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .waiver-info {
          flex: 1;
          font-size: 0.73rem;
          color: var(--text2);
        }
        .waiver-info strong {
          color: var(--text);
        }
        .waiver-actions {
          display: flex;
          gap: 0.3rem;
        }
        .waiver-btn {
          font-size: 0.6rem;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid var(--border2);
          background: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          transition: all 0.13s;
        }
        .waiver-btn.approve:hover {
          border-color: rgba(82,194,120,0.4);
          color: var(--green);
        }
        .waiver-btn.deny:hover {
          border-color: rgba(224,82,82,0.4);
          color: var(--red);
        }
        .empty-waivers {
          text-align: center;
          padding: 1.5rem;
          color: var(--text3);
          font-size: 0.75rem;
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
          .fines-grid {
            grid-template-columns: 1fr;
          }
          .filters-bar {
            flex-direction: column;
          }
          .filters-bar select {
            width: 100%;
          }
          .actions {
            flex-direction: column;
            gap: 0.3rem;
          }
          .waiver-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .waiver-actions {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  )
}