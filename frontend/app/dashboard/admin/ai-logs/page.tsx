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
  Filter: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3" />
    </svg>
  ),
}

interface AIRequest {
  id: string
  method: 'POST' | 'GET'
  endpoint: string
  query: string
  timestamp: string
  status: number
  responseTime: string
  source: 'public' | 'librarian' | 'member'
  user?: string
}

export default function AILogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSource, setFilterSource] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const [aiLogs] = useState<AIRequest[]>([
    { id: '1', method: 'POST', endpoint: '/v1/messages', query: 'Recommend African fiction for teenager', timestamp: '14:32:11', status: 200, responseTime: '2.1s', source: 'public', user: 'Guest' },
    { id: '2', method: 'POST', endpoint: '/v1/messages', query: 'What are library opening hours on Saturday?', timestamp: '14:31:44', status: 200, responseTime: '1.8s', source: 'public', user: 'Guest' },
    { id: '3', method: 'POST', endpoint: '/v1/messages', query: 'Books similar to Americanah', timestamp: '14:30:22', status: 200, responseTime: '2.3s', source: 'member', user: 'Jane Austen' },
    { id: '4', method: 'POST', endpoint: '/v1/messages', query: 'Member LIB-007712 overdue — what action to take?', timestamp: '14:28:55', status: 200, responseTime: '1.9s', source: 'librarian', user: 'Mary Kamau' },
    { id: '5', method: 'POST', endpoint: '/v1/messages', query: 'How do I get a library card?', timestamp: '14:25:10', status: 200, responseTime: '2.0s', source: 'public', user: 'Guest' },
    { id: '6', method: 'POST', endpoint: '/v1/messages', query: 'Classify book under Dewey for Kenyan history', timestamp: '14:22:03', status: 500, responseTime: '3.2s', source: 'librarian', user: 'James Otieno' },
    { id: '7', method: 'POST', endpoint: '/v1/messages', query: 'Run a quiz on Ngũgĩ wa Thiong\'o', timestamp: '14:18:47', status: 200, responseTime: '2.5s', source: 'public', user: 'Guest' },
    { id: '8', method: 'POST', endpoint: '/v1/messages', query: 'What are the fines for overdue books?', timestamp: '14:15:30', status: 200, responseTime: '1.7s', source: 'member', user: 'Kofi Mensah' },
    { id: '9', method: 'POST', endpoint: '/v1/messages', query: 'How to renew borrowed books online?', timestamp: '14:12:18', status: 200, responseTime: '1.9s', source: 'member', user: 'Grace Njeri' },
    { id: '10', method: 'POST', endpoint: '/v1/messages', query: 'Tell me about Things Fall Apart', timestamp: '14:08:45', status: 200, responseTime: '2.2s', source: 'public', user: 'Guest' },
    { id: '11', method: 'POST', endpoint: '/v1/messages', query: 'Book club recommendations for April', timestamp: '14:05:22', status: 200, responseTime: '2.0s', source: 'librarian', user: 'Fatuma Ndegwa' },
    { id: '12', method: 'POST', endpoint: '/v1/messages', query: 'How to become a patron member?', timestamp: '14:02:10', status: 200, responseTime: '1.6s', source: 'public', user: 'Guest' },
  ])

  const stats = {
    queriesToday: 1284,
    avgResponse: '2.3s',
    errorRate: '0.8%',
    tokenUsage: '84K',
  }

  const getMethodBadge = (method: string) => {
    switch(method) {
      case 'POST': return { class: 'method method-post', text: 'POST' }
      case 'GET': return { class: 'method method-get', text: 'GET' }
      default: return { class: 'method', text: method }
    }
  }

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) return { class: 'status status-success', text: `${status}` }
    if (status >= 400 && status < 500) return { class: 'status status-error', text: `${status}` }
    if (status >= 500) return { class: 'status status-error', text: `${status}` }
    return { class: 'status', text: `${status}` }
  }

  const getSourceBadge = (source: string) => {
    switch(source) {
      case 'public': return { class: 'source source-public', text: 'Public Chat' }
      case 'librarian': return { class: 'source source-librarian', text: 'Librarian Desk' }
      case 'member': return { class: 'source source-member', text: 'Member Dashboard' }
      default: return { class: 'source', text: source }
    }
  }

  const filteredLogs = aiLogs.filter(log => {
    const matchesSearch = log.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.endpoint.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSource = filterSource === 'all' || log.source === filterSource
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'success' && log.status < 400) ||
      (filterStatus === 'error' && log.status >= 400)
    return matchesSearch && matchesSource && matchesStatus
  })

  const handleExport = () => {
    toast.success('AI logs exported to CSV')
  }

  return (
    <div className="ai-logs-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box b">
          <div className="stat-lbl">Queries Today</div>
          <div className="stat-num blue">{stats.queriesToday.toLocaleString()}</div>
          <div className="stat-change">public + librarian AI</div>
        </div>
        <div className="stat-box gr">
          <div className="stat-lbl">Avg Response</div>
          <div className="stat-num green">{stats.avgResponse}</div>
          <div className="stat-change">↓ 0.4s vs yesterday</div>
        </div>
        <div className="stat-box a">
          <div className="stat-lbl">Error Rate</div>
          <div className="stat-num amber">{stats.errorRate}</div>
          <div className="stat-change">10 failed requests</div>
        </div>
        <div className="stat-box p">
          <div className="stat-lbl">Token Usage</div>
          <div className="stat-num purple">{stats.tokenUsage}</div>
          <div className="stat-change">tokens today</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">AI Request Log</div>
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
                placeholder="Search queries, endpoints, users…" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
              <option value="all">All Sources</option>
              <option value="public">Public Chat</option>
              <option value="librarian">Librarian Desk</option>
              <option value="member">Member Dashboard</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="success">Success (200)</option>
              <option value="error">Error (4xx/5xx)</option>
            </select>
          </div>

          {/* Logs Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Endpoint</th>
                  <th>Query / Message</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Response</th>
                  <th>Source</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => {
                  const methodBadge = getMethodBadge(log.method)
                  const statusBadge = getStatusBadge(log.status)
                  const sourceBadge = getSourceBadge(log.source)
                  return (
                    <tr key={log.id}>
                      <td><span className={methodBadge.class}>{methodBadge.text}</span></td>
                      <td className="endpoint">{log.endpoint}</td>
                      <td className="query-cell">
                        <div className="query-text">{log.query}</div>
                      </td>
                      <td className="mono time">{log.timestamp}</td>
                      <td><span className={statusBadge.class}>{statusBadge.text}</span></td>
                      <td className="mono">{log.responseTime}</td>
                      <td><span className={sourceBadge.class}>{sourceBadge.text}</span></td>
                      <td className="user">{log.user || '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🤖</div>
              <p>No AI logs match your filters</p>
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>‹ Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn" onClick={() => toast.info('Page 2')}>2</button>
            <button className="page-btn" onClick={() => toast.info('Page 3')}>3</button>
            <span className="page-dots">… 1,284 total</span>
            <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ai-logs-page {
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
        .b::after { background: var(--blue); }
        .gr::after { background: var(--green); }
        .a::after { background: var(--amber); }
        .p::after { background: var(--purple); }
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
        .stat-num.purple { color: var(--purple); }
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
          min-width: 140px;
        }

        /* Table */
        .table-wrapper {
          overflow-x: auto;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.73rem;
        }
        .data-table th {
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text3);
          padding: 0 0.75rem 0.55rem;
          text-align: left;
          font-weight: 500;
          border-bottom: 1px solid var(--border);
        }
        .data-table td {
          padding: 0.7rem 0.75rem;
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

        /* Method Badges */
        .method {
          display: inline-block;
          font-size: 0.55rem;
          padding: 2px 8px;
          border-radius: 3px;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }
        .method-post {
          background: rgba(82,148,224,0.15);
          color: var(--blue);
        }
        .method-get {
          background: rgba(82,194,120,0.15);
          color: var(--green);
        }

        /* Status Badges */
        .status {
          display: inline-block;
          font-size: 0.55rem;
          padding: 2px 8px;
          border-radius: 3px;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }
        .status-success {
          background: rgba(82,194,120,0.12);
          color: var(--green);
        }
        .status-error {
          background: rgba(224,82,82,0.12);
          color: var(--red);
        }

        /* Source Badges */
        .source {
          display: inline-block;
          font-size: 0.55rem;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .source-public {
          background: rgba(82,148,224,0.12);
          color: var(--blue);
        }
        .source-librarian {
          background: rgba(201,168,76,0.12);
          color: var(--gold);
        }
        .source-member {
          background: rgba(82,194,120,0.12);
          color: var(--green);
        }

        .endpoint {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: var(--text3);
        }
        .query-cell {
          max-width: 300px;
        }
        .query-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.73rem;
          color: var(--text2);
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
        }
        .time {
          color: var(--text3);
        }
        .user {
          font-size: 0.7rem;
          color: var(--text3);
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
          .query-cell {
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  )
}
