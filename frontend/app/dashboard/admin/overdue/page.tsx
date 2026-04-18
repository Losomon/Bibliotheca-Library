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
  Suspend: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
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

interface OverdueItem {
  id: string
  bookTitle: string
  author: string
  memberId: string
  memberName: string
  dueDate: string
  daysOverdue: number
  fine: number
}

export default function OverduePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDays, setFilterDays] = useState('all')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const [overdueItems] = useState<OverdueItem[]>([
    { id: '1', bookTitle: 'Arrow of God', author: 'Chinua Achebe', memberId: 'LIB-007712', memberName: 'Amina Wanjiku', dueDate: 'Mar 18, 2026', daysOverdue: 30, fine: 300 },
    { id: '2', bookTitle: 'Weep Not, Child', author: 'Ngũgĩ wa Thiong\'o', memberId: 'LIB-002234', memberName: 'James Mwakio', dueDate: 'Mar 28, 2026', daysOverdue: 20, fine: 200 },
    { id: '3', bookTitle: 'Wizard of the Crow', author: 'Ngũgĩ wa Thiong\'o', memberId: 'LIB-005567', memberName: 'Fatuma Hassan', dueDate: 'Apr 5, 2026', daysOverdue: 12, fine: 120 },
    { id: '4', bookTitle: 'Things Fall Apart', author: 'Chinua Achebe', memberId: 'LIB-008812', memberName: 'Samuel Kiprotich', dueDate: 'Apr 8, 2026', daysOverdue: 9, fine: 90 },
    { id: '5', bookTitle: 'Americanah', author: 'Chimamanda Adichie', memberId: 'LIB-001045', memberName: 'Lucy Wambui', dueDate: 'Apr 10, 2026', daysOverdue: 7, fine: 70 },
    { id: '6', bookTitle: 'Petals of Blood', author: 'Ngũgĩ wa Thiong\'o', memberId: 'LIB-009876', memberName: 'John Otieno', dueDate: 'Apr 12, 2026', daysOverdue: 5, fine: 50 },
    { id: '7', bookTitle: 'Half of a Yellow Sun', author: 'Chimamanda Adichie', memberId: 'LIB-003210', memberName: 'Mary Wanjiku', dueDate: 'Apr 13, 2026', daysOverdue: 4, fine: 40 },
    { id: '8', bookTitle: 'Born a Crime', author: 'Trevor Noah', memberId: 'LIB-006543', memberName: 'Peter Kimani', dueDate: 'Apr 14, 2026', daysOverdue: 3, fine: 30 },
  ])

  const stats = {
    overdueItems: 47,
    totalFines: 4700,
    noticesSent: 39,
    autoSuspendSoon: 12,
  }

  const getDaysPill = (days: number) => {
    if (days > 25) return { class: 'pill pr', text: `${days} days` }
    if (days > 14) return { class: 'pill pa', text: `${days} days` }
    return { class: 'pill pa2', text: `${days} days` }
  }

  const getFineColor = (days: number) => {
    if (days > 25) return 'var(--red)'
    if (days > 14) return 'var(--amber)'
    return 'var(--gold)'
  }

  const filteredItems = overdueItems.filter(item => {
    const matchesSearch = item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.memberId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDays = filterDays === 'all' || 
      (filterDays === 'critical' && item.daysOverdue > 25) ||
      (filterDays === 'high' && item.daysOverdue > 14 && item.daysOverdue <= 25) ||
      (filterDays === 'medium' && item.daysOverdue > 7 && item.daysOverdue <= 14) ||
      (filterDays === 'low' && item.daysOverdue <= 7)
    return matchesSearch && matchesDays
  })

  const handleNotifyMember = (memberId: string, bookTitle: string) => {
    toast.info(`Notification sent to ${memberId} about "${bookTitle}"`)
  }

  const handleSuspendMember = (memberName: string) => {
    toast.warning(`${memberName} has been suspended`)
  }

  const handleSendBulkNotice = () => {
    if (selectedItems.length === 0) {
      toast.error('No items selected')
      return
    }
    toast.success(`Bulk notices sent to ${selectedItems.length} members`)
    setSelectedItems([])
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map(item => item.id))
    }
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleExport = () => {
    toast.success('Overdue report exported')
  }

  return (
    <div className="overdue-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box r">
          <div className="stat-lbl">Overdue Items</div>
          <div className="stat-num red">{stats.overdueItems}</div>
          <div className="stat-change">↑ 8 from last week</div>
        </div>
        <div className="stat-box a">
          <div className="stat-lbl">Total Fines Accruing</div>
          <div className="stat-num amber">Ksh {stats.totalFines.toLocaleString()}</div>
          <div className="stat-change">Ksh 10/day/book</div>
        </div>
        <div className="stat-box b">
          <div className="stat-lbl">Notices Sent</div>
          <div className="stat-num blue">{stats.noticesSent}</div>
          <div className="stat-change">8 unreachable</div>
        </div>
        <div className="stat-box r">
          <div className="stat-lbl">Auto-Suspend Soon</div>
          <div className="stat-num red">{stats.autoSuspendSoon}</div>
          <div className="stat-change">exceed 30 days</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">Overdue Books — Action Required</div>
          <div className="panel-actions">
            <button className="panel-action danger" onClick={handleSendBulkNotice}>
              <Icons.Notify /> Send Bulk Notice ({selectedItems.length})
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
                placeholder="Search by book title, author, member…" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={filterDays} onChange={(e) => setFilterDays(e.target.value)}>
              <option value="all">All Overdue</option>
              <option value="critical">Critical (&gt;25 days)</option>
              <option value="high">High (15-25 days)</option>
              <option value="medium">Medium (8-14 days)</option>
              <option value="low">Low (≤7 days)</option>
            </select>
          </div>

          {/* Overdue Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-col">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Member</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                  <th>Fine (Ksh)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => {
                  const daysPill = getDaysPill(item.daysOverdue)
                  const fineColor = getFineColor(item.daysOverdue)
                  return (
                    <tr key={item.id}>
                      <td className="checkbox-col">
                        <input 
                          type="checkbox" 
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      </td>
                      <td className="book-title">{item.bookTitle}</td>
                      <td className="author">{item.author}</td>
                      <td>
                        <div className="member-info">
                          <strong>{item.memberName}</strong>
                          <div className="member-card">{item.memberId}</div>
                        </div>
                      </td>
                      <td className="mono">{item.dueDate}</td>
                      <td>
                        <span className={daysPill.class}>{daysPill.text}</span>
                      </td>
                      <td className="fine-amount" style={{ color: fineColor }}>
                        Ksh {item.fine}
                      </td>
                      <td className="actions">
                        <button className="action-btn notify" onClick={() => handleNotifyMember(item.memberId, item.bookTitle)}>
                          <Icons.Notify /> Notify
                        </button>
                        <button className="action-btn suspend" onClick={() => handleSuspendMember(item.memberName)}>
                          <Icons.Suspend /> Suspend
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <p>No overdue items match your filters</p>
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>‹ Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn" onClick={() => toast.info('Page 2')}>2</button>
            <button className="page-btn" onClick={() => toast.info('Page 3')}>3</button>
            <span className="page-dots">… 8 pages</span>
            <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overdue-page {
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
        .r::after { background: var(--red); }
        .a::after { background: var(--amber); }
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
        .stat-num.red { color: var(--red); }
        .stat-num.amber { color: var(--amber); }
        .stat-num.blue { color: var(--blue); }
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
        .panel-action.danger {
          color: var(--red);
          border-color: rgba(224,82,82,0.3);
        }
        .panel-action.danger:hover {
          background: rgba(224,82,82,0.1);
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
          min-width: 150px;
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
        .checkbox-col {
          width: 30px;
          text-align: center;
        }
        .checkbox-col input {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: var(--gold);
        }
        .book-title {
          font-weight: 500;
          color: var(--text);
        }
        .author {
          color: var(--text2);
          font-style: italic;
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
        .mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
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
        .fine-amount {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
        }
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
        .action-btn.notify:hover {
          border-color: rgba(82,148,224,0.4);
          color: var(--blue);
        }
        .action-btn.suspend:hover {
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
            gap: 0.3rem;
          }
        }
      `}</style>
    </div>
  )
}