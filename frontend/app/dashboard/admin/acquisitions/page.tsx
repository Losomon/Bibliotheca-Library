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
  Classify: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Add: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Edit: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3l4 4-7 7H10v-4l7-7z" />
    </svg>
  ),
  Delete: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
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
}

interface NewArrival {
  id: string
  title: string
  author: string
  category: string
  copies: number
  receivedDate: string
  coverColor: string
  deweyCode?: string
  status: 'pending' | 'classified'
}

interface PurchaseOrder {
  id: string
  title: string
  quantity: number
  cost: number
  status: 'ordered' | 'in_transit' | 'delivered'
  orderDate: string
}

export default function AcquisitionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<NewArrival | null>(null)
  const [showClassifyModal, setShowClassifyModal] = useState(false)

  const [newArrivals] = useState<NewArrival[]>([
    { id: '1', title: 'Born a Crime', author: 'Trevor Noah', category: 'Memoir', copies: 1, receivedDate: 'Apr 17', coverColor: '#2a1a1a', status: 'pending' },
    { id: '2', title: 'The Famished Road', author: 'Ben Okri', category: 'Fiction', copies: 2, receivedDate: 'Apr 16', coverColor: '#1a2a1a', status: 'pending' },
    { id: '3', title: 'Homegoing', author: 'Yaa Gyasi', category: 'Fiction', copies: 3, receivedDate: 'Apr 15', coverColor: '#2a1a3a', status: 'pending' },
    { id: '4', title: 'The River and the Source', author: 'Margaret Ogola', category: 'Fiction', copies: 2, receivedDate: 'Apr 14', coverColor: '#3a2a0a', status: 'pending' },
    { id: '5', title: 'Dust', author: 'Yvonne Owuor', category: 'Fiction', copies: 5, receivedDate: 'Apr 12', coverColor: '#1a3a4a', status: 'classified', deweyCode: 'PR9381' },
    { id: '6', title: 'Kintu', author: 'Jennifer Nansubuga', category: 'Fiction', copies: 3, receivedDate: 'Apr 10', coverColor: '#4a2a0a', status: 'classified', deweyCode: 'PR9381' },
  ])

  const [purchaseOrders] = useState<PurchaseOrder[]>([
    { id: 'PO-001', title: 'Dust (Yvonne Owuor)', quantity: 5, cost: 6000, status: 'in_transit', orderDate: 'Apr 5' },
    { id: 'PO-002', title: 'Kintu (Jennifer Nansubuga)', quantity: 3, cost: 4500, status: 'ordered', orderDate: 'Apr 8' },
    { id: 'PO-003', title: 'Season of Migration', quantity: 4, cost: 4800, status: 'delivered', orderDate: 'Mar 28' },
    { id: 'PO-004', title: 'Purple Hibiscus (restock)', quantity: 6, cost: 7200, status: 'ordered', orderDate: 'Apr 10' },
  ])

  const stats = {
    pendingClassify: 234,
    shelvedThisMonth: 412,
    onOrder: 89,
    budgetRemaining: 148000,
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return { class: 'pill pa', text: 'Pending Classify' }
      case 'classified': return { class: 'pill pg', text: 'Classified' }
      default: return { class: 'pill pb', text: status }
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch(status) {
      case 'ordered': return { class: 'pill pa', text: 'Ordered' }
      case 'in_transit': return { class: 'pill pb', text: 'In Transit' }
      case 'delivered': return { class: 'pill pg', text: 'Delivered' }
      default: return { class: 'pill pb', text: status }
    }
  }

  const filteredArrivals = newArrivals.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'pending' && item.status === 'pending') ||
      (filterStatus === 'classified' && item.status === 'classified')
    return matchesSearch && matchesStatus
  })

  const handleClassify = (book: NewArrival) => {
    setSelectedBook(book)
    setShowClassifyModal(true)
  }

  const handleSaveClassification = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`${selectedBook?.title} classified and added to catalogue`)
    setShowClassifyModal(false)
  }

  const handleAddAcquisition = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('New acquisition added to pending list')
    setShowAddModal(false)
  }

  const handleExport = () => {
    toast.success('Acquisitions report exported')
  }

  const handleNewOrder = () => {
    toast.info('New purchase order form')
  }

  return (
    <div className="acquisitions-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box a">
          <div className="stat-lbl">Pending Classify</div>
          <div className="stat-num amber">{stats.pendingClassify}</div>
          <div className="stat-change">awaiting Dewey code</div>
        </div>
        <div className="stat-box gr">
          <div className="stat-lbl">Shelved This Month</div>
          <div className="stat-num green">{stats.shelvedThisMonth}</div>
          <div className="stat-change">new titles added</div>
        </div>
        <div className="stat-box b">
          <div className="stat-lbl">On Order</div>
          <div className="stat-num blue">{stats.onOrder}</div>
          <div className="stat-change">from publishers</div>
        </div>
        <div className="stat-box g">
          <div className="stat-lbl">Budget Remaining</div>
          <div className="stat-num gold">Ksh {stats.budgetRemaining.toLocaleString()}</div>
          <div className="stat-change">FY 2026</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="acquisitions-grid">
        {/* Left Panel - New Arrivals */}
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">New Arrivals — To Classify</div>
            <div className="panel-actions">
              <button className="panel-action" onClick={() => setShowAddModal(true)}>
                <Icons.Add /> Add Acquisition
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
                  placeholder="Search by title or author…" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending Classify</option>
                <option value="classified">Classified</option>
              </select>
            </div>

            {/* New Arrivals List */}
            <div className="arrivals-list">
              {filteredArrivals.map(item => {
                const statusBadge = getStatusBadge(item.status)
                return (
                  <div key={item.id} className="arrival-item">
                    <div className="arrival-spine" style={{ background: `linear-gradient(160deg, ${item.coverColor}, ${item.coverColor}cc)` }}></div>
                    <div className="arrival-info">
                      <div className="arrival-title">{item.title}</div>
                      <div className="arrival-author">{item.author}</div>
                      <div className="arrival-meta">
                        <span className="arrival-category">{item.category}</span>
                        <span className="arrival-copies">{item.copies} {item.copies === 1 ? 'copy' : 'copies'}</span>
                        <span className="arrival-date">Received {item.receivedDate}</span>
                      </div>
                      {item.deweyCode && (
                        <div className="arrival-dewey">Dewey: {item.deweyCode}</div>
                      )}
                    </div>
                    <div className="arrival-actions">
                      {item.status === 'pending' ? (
                        <button className="action-btn classify" onClick={() => handleClassify(item)}>
                          <Icons.Classify /> Classify
                        </button>
                      ) : (
                        <span className={statusBadge.class}>{statusBadge.text}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredArrivals.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>No acquisitions match your filters</p>
              </div>
            )}

            {/* Pagination */}
            <div className="pagination">
              <button className="page-btn" disabled>‹ Prev</button>
              <button className="page-btn active">1</button>
              <button className="page-btn" onClick={() => toast.info('Page 2')}>2</button>
              <button className="page-btn" onClick={() => toast.info('Page 3')}>3</button>
              <span className="page-dots">… 234 total</span>
              <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
            </div>
          </div>
        </div>

        {/* Right Panel - Purchase Orders */}
        <div className="right-panel">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Purchase Orders</div>
              <button className="panel-action" onClick={handleNewOrder}>
                <Icons.Add /> New Order
              </button>
            </div>
            <div className="panel-body">
              <div className="orders-list">
                {purchaseOrders.map(order => {
                  const statusBadge = getOrderStatusBadge(order.status)
                  return (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <div className="order-title">{order.title}</div>
                        <div className="order-meta">
                          <span className="order-id">{order.id}</span>
                          <span className="order-qty">Qty: {order.quantity}</span>
                          <span className="order-cost">Ksh {order.cost.toLocaleString()}</span>
                          <span className="order-date">Ordered {order.orderDate}</span>
                        </div>
                      </div>
                      <div className="order-status">
                        <span className={statusBadge.class}>{statusBadge.text}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Empty State for Orders */}
              {purchaseOrders.length === 0 && (
                <div className="empty-state small">
                  <p>No purchase orders</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Acquisition Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Acquisition</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleAddAcquisition}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" placeholder="Book title" required />
                  </div>
                  <div className="form-group">
                    <label>Author *</label>
                    <input type="text" placeholder="Author name" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>ISBN</label>
                    <input type="text" placeholder="978-..." />
                  </div>
                  <div className="form-group">
                    <label>Year Published</label>
                    <input type="number" placeholder="2024" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Genre</label>
                    <select>
                      <option>African Literature</option>
                      <option>Fiction</option>
                      <option>History</option>
                      <option>Science</option>
                      <option>Children</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Copies</label>
                    <input type="number" defaultValue="1" min="1" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Purchase Price (Ksh)</label>
                    <input type="number" placeholder="0" />
                  </div>
                  <div className="form-group">
                    <label>Vendor</label>
                    <input type="text" placeholder="Supplier name" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Notes</label>
                    <textarea rows={2} placeholder="Additional notes…"></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add to Acquisitions</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Classify Modal */}
      {showClassifyModal && selectedBook && (
        <div className="modal-overlay" onClick={() => setShowClassifyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Classify — {selectedBook.title}</h3>
              <button className="modal-close" onClick={() => setShowClassifyModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleSaveClassification}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Dewey Decimal Code</label>
                    <input type="text" placeholder="e.g., PR9387" required />
                  </div>
                  <div className="form-group">
                    <label>Section</label>
                    <select>
                      <option>Fiction</option>
                      <option>Non-Fiction</option>
                      <option>Reference</option>
                      <option>Children</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Call Number</label>
                    <input type="text" placeholder="e.g., 823.912" />
                  </div>
                  <div className="form-group">
                    <label>Shelf Location</label>
                    <select>
                      <option>Section A</option>
                      <option>Section B</option>
                      <option>Section C</option>
                      <option>Children's Section</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Subjects/Tags</label>
                    <input type="text" placeholder="African literature, post-colonial, fiction" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowClassifyModal(false)}>Skip</button>
                <button type="submit" className="btn-primary">Save & Add to Catalogue</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .acquisitions-page {
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
        .b::after { background: var(--blue); }
        .g::after { background: var(--gold); }
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
        .stat-num.blue { color: var(--blue); }
        .stat-num.gold { color: var(--gold); }
        .stat-change {
          font-size: 0.66rem;
          color: var(--text3);
          margin-top: 0.3rem;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Grid Layout */
        .acquisitions-grid {
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
          min-width: 140px;
        }

        /* Arrivals List */
        .arrivals-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 1rem;
        }
        .arrival-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.65rem;
          border-radius: 4px;
          background: var(--bg3);
          transition: background 0.14s;
        }
        .arrival-item:hover {
          background: var(--surface2);
        }
        .arrival-spine {
          width: 32px;
          height: 44px;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .arrival-info {
          flex: 1;
          min-width: 0;
        }
        .arrival-title {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text);
        }
        .arrival-author {
          font-size: 0.7rem;
          color: var(--text3);
          font-style: italic;
        }
        .arrival-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.6rem;
          color: var(--text3);
          margin-top: 0.2rem;
          font-family: 'JetBrains Mono', monospace;
          flex-wrap: wrap;
        }
        .arrival-dewey {
          font-size: 0.6rem;
          color: var(--green);
          margin-top: 0.2rem;
          font-family: 'JetBrains Mono', monospace;
        }
        .arrival-actions {
          flex-shrink: 0;
        }
        .pill {
          display: inline-block;
          font-size: 0.58rem;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .pa { background: rgba(224,160,82,0.12); color: var(--amber); }
        .pg { background: rgba(82,194,120,0.12); color: var(--green); }
        .pb { background: rgba(82,148,224,0.12); color: var(--blue); }
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
        .action-btn.classify:hover {
          border-color: rgba(82,194,120,0.4);
          color: var(--green);
        }

        /* Right Panel */
        .right-panel {
          display: flex;
          flex-direction: column;
        }

        /* Orders List */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .order-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem;
          border-bottom: 1px solid var(--border);
        }
        .order-item:last-child {
          border-bottom: none;
        }
        .order-info {
          flex: 1;
        }
        .order-title {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 0.2rem;
        }
        .order-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.62rem;
          color: var(--text3);
          font-family: 'JetBrains Mono', monospace;
          flex-wrap: wrap;
        }
        .order-status {
          flex-shrink: 0;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: var(--text3);
        }
        .empty-state.small {
          padding: 1.5rem;
        }
        .empty-icon {
          font-size: 2.5rem;
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

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 6px;
          width: 100%;
          max-width: 560px;
          max-height: 85vh;
          overflow-y: auto;
        }
        .modal-header {
          padding: 1rem 1.3rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .modal-close {
          background: none;
          border: none;
          color: var(--text2);
          cursor: pointer;
          padding: 0.2rem;
          transition: color 0.14s;
        }
        .modal-close:hover {
          color: var(--text);
        }
        .modal-body {
          padding: 1.2rem 1.3rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .form-group.full-width {
          grid-column: span 2;
        }
        .form-group label {
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text3);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.55rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 3px;
          background: var(--bg3);
          color: var(--text);
          font-size: 0.8rem;
          outline: none;
          transition: border-color 0.18s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: rgba(201,168,76,0.4);
        }
        .form-group textarea {
          resize: vertical;
          min-height: 60px;
        }
        .modal-footer {
          padding: 1rem 1.3rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 0.8rem;
          justify-content: flex-end;
        }
        .btn-primary {
          padding: 0.5rem 1.2rem;
          background: var(--gold);
          color: #0e0e0f;
          border: none;
          border-radius: 3px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.14s;
        }
        .btn-primary:hover {
          background: var(--gold2);
        }
        .btn-secondary {
          padding: 0.5rem 1.2rem;
          background: transparent;
          color: var(--text2);
          border: 1px solid var(--border2);
          border-radius: 3px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.14s;
        }
        .btn-secondary:hover {
          background: var(--surface2);
          color: var(--text);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .stat-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .acquisitions-grid {
            grid-template-columns: 1fr;
          }
          .filters-bar {
            flex-direction: column;
          }
          .filters-bar select {
            width: 100%;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .form-group.full-width {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  )
}