'use client'

import { useState } from 'react'
import { toast } from 'sonner'

// SVG Icons
const Icons = {
  Edit: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3l4 4-7 7H10v-4l7-7z" />
    </svg>
  ),
  Suspend: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Reinstate: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 1 1-9-9" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Fine: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
    </svg>
  ),
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
}

interface Member {
  id: string
  name: string
  cardNo: string
  email: string
  phone: string
  type: 'Standard' | 'Scholar' | 'Patron'
  booksOut: string
  joined: string
  status: 'Active' | 'Overdue' | 'Suspended'
  fine?: number
}

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const [members] = useState<Member[]>([
    { id: '1', name: 'Jane Austen', cardNo: 'LIB-004821', email: 'jane@email.com', phone: '+254 700 000 001', type: 'Standard', booksOut: '3/5', joined: 'Jan 2024', status: 'Active' },
    { id: '2', name: 'Kofi Mensah', cardNo: 'LIB-003341', email: 'kofi@email.com', phone: '+254 700 000 002', type: 'Scholar', booksOut: '8/15', joined: 'Mar 2023', status: 'Active' },
    { id: '3', name: 'Amina Wanjiku', cardNo: 'LIB-007712', email: 'amina@email.com', phone: '+254 700 000 003', type: 'Patron', booksOut: '2/∞', joined: 'Jun 2022', status: 'Overdue', fine: 300 },
    { id: '4', name: 'David Ochieng', cardNo: 'LIB-001198', email: 'david@email.com', phone: '+254 700 000 004', type: 'Standard', booksOut: '5/5', joined: 'Feb 2021', status: 'Suspended' },
    { id: '5', name: 'Grace Njeri', cardNo: 'LIB-009003', email: 'grace@email.com', phone: '+254 700 000 005', type: 'Scholar', booksOut: '1/15', joined: 'Apr 2026', status: 'Active' },
    { id: '6', name: 'Wanjiku Kamau', cardNo: 'LIB-010234', email: 'wanjiku@email.com', phone: '+254 700 000 006', type: 'Standard', booksOut: '2/5', joined: 'Feb 2026', status: 'Active' },
    { id: '7', name: 'Peter Kimani', cardNo: 'LIB-011009', email: 'peter@email.com', phone: '+254 700 000 007', type: 'Scholar', booksOut: '6/15', joined: 'Jan 2025', status: 'Active' },
    { id: '8', name: 'Sarah Muthoni', cardNo: 'LIB-012345', email: 'sarah@email.com', phone: '+254 700 000 008', type: 'Patron', booksOut: '4/∞', joined: 'Dec 2024', status: 'Active' },
    { id: '9', name: 'Michael Omondi', cardNo: 'LIB-013456', email: 'michael@email.com', phone: '+254 700 000 009', type: 'Standard', booksOut: '1/5', joined: 'Mar 2026', status: 'Active' },
    { id: '10', name: 'Esther Wanjiru', cardNo: 'LIB-014567', email: 'esther@email.com', phone: '+254 700 000 010', type: 'Scholar', booksOut: '10/15', joined: 'Aug 2025', status: 'Active' },
  ])

  const stats = {
    total: 12847,
    active: 11903,
    suspended: 312,
    overdue: 37,
    newThisMonth: 124,
  }

  const getStatusPill = (status: string) => {
    switch(status) {
      case 'Active': return 'pill pg'
      case 'Overdue': return 'pill pr'
      case 'Suspended': return 'pill pa'
      default: return 'pill pb'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'Active': return 'Active'
      case 'Overdue': return 'Overdue'
      case 'Suspended': return 'Suspended'
      default: return status
    }
  }

  const getTypePill = (type: string) => {
    switch(type) {
      case 'Standard': return 'pill pb'
      case 'Scholar': return 'pill pg'
      case 'Patron': return 'pill pa'
      default: return 'pill pb'
    }
  }

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.cardNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || m.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === 'all' || m.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesType && matchesStatus
  })

  const handleEditMember = (member: Member) => {
    setSelectedMember(member)
    setShowEditModal(true)
  }

  const handleSuspendMember = (name: string) => {
    toast.warning(`${name} has been suspended`)
  }

  const handleReinstateMember = (name: string) => {
    toast.success(`${name} has been reinstated`)
  }

  const handleFineMember = (name: string) => {
    toast.info(`Fine added to ${name}'s account`)
  }

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Member registered successfully!')
    setShowAddModal(false)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`${selectedMember?.name} updated successfully`)
    setShowEditModal(false)
  }

  const handleExport = () => {
    toast.success('Members exported to CSV')
  }

  return (
    <div className="members-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box g">
          <div className="stat-lbl">Total Members</div>
          <div className="stat-num gold">{stats.total.toLocaleString()}</div>
          <div className="stat-change">+{stats.newThisMonth} this month</div>
        </div>
        <div className="stat-box gr">
          <div className="stat-lbl">Active</div>
          <div className="stat-num green">{stats.active.toLocaleString()}</div>
          <div className="stat-change">92.6% of total</div>
        </div>
        <div className="stat-box r">
          <div className="stat-lbl">Suspended</div>
          <div className="stat-num red">{stats.suspended}</div>
          <div className="stat-change">2.4% of total</div>
        </div>
        <div className="stat-box a">
          <div className="stat-lbl">Overdue</div>
          <div className="stat-num amber">{stats.overdue}</div>
          <div className="stat-change">needs attention</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="panel">
        <div className="panel-head">
          <div className="panel-title">All Members</div>
          <div className="panel-actions">
            <button className="panel-action" onClick={() => setShowAddModal(true)}>+ Add Member</button>
            <button className="panel-action" onClick={handleExport}>↓ Export</button>
          </div>
        </div>
        <div className="panel-body">
          {/* Search and Filters */}
          <div className="search-bar">
            <div className="search-input">
              <Icons.Search />
              <input 
                type="text" 
                placeholder="Search by name, card no, email…" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="standard">Standard</option>
              <option value="scholar">Scholar</option>
              <option value="patron">Patron</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Members Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Card No.</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Books</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr key={member.id}>
                    <td>
                      <strong className="member-name">{member.name}</strong>
                      <div className="member-phone">{member.phone}</div>
                    </td>
                    <td className="mono">{member.cardNo}</td>
                    <td className="mono email">{member.email}</td>
                    <td><span className={getTypePill(member.type)}>{member.type}</span></td>
                    <td className="mono">{member.booksOut}</td>
                    <td className="mono">{member.joined}</td>
                    <td><span className={getStatusPill(member.status)}>{getStatusText(member.status)}</span></td>
                    <td className="actions">
                      <button className="action-btn" onClick={() => handleEditMember(member)} title="Edit">
                        <Icons.Edit />
                      </button>
                      {member.status !== 'Suspended' ? (
                        <button className="action-btn suspend" onClick={() => handleSuspendMember(member.name)} title="Suspend">
                          <Icons.Suspend />
                        </button>
                      ) : (
                        <button className="action-btn reinstate" onClick={() => handleReinstateMember(member.name)} title="Reinstate">
                          <Icons.Reinstate />
                        </button>
                      )}
                      {member.status === 'Overdue' && (
                        <button className="action-btn fine" onClick={() => handleFineMember(member.name)} title="Add Fine">
                          <Icons.Fine />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>‹ Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn" onClick={() => toast.info('Page 2')}>2</button>
            <button className="page-btn" onClick={() => toast.info('Page 3')}>3</button>
            <span className="page-dots">… 1,284 pages</span>
            <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Member</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Jane" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Austen" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="jane@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" placeholder="+254 7XX XXX XXX" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Membership Type</label>
                    <select>
                      <option>Standard (Free)</option>
                      <option>Scholar (Ksh 500/yr)</option>
                      <option>Patron (Ksh 1,200/yr)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>ID Number</label>
                    <input type="text" placeholder="National ID" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Kutus Town" />
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" placeholder="10300" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Register Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit — {selectedMember.name}</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={selectedMember.name} required />
                  </div>
                  <div className="form-group">
                    <label>Card No.</label>
                    <input type="text" defaultValue={selectedMember.cardNo} readOnly disabled />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={selectedMember.email} required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" defaultValue={selectedMember.phone} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Membership Type</label>
                    <select defaultValue={selectedMember.type}>
                      <option>Standard</option>
                      <option>Scholar</option>
                      <option>Patron</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select defaultValue={selectedMember.status}>
                      <option>Active</option>
                      <option>Suspended</option>
                      <option>Overdue</option>
                    </select>
                  </div>
                </div>
                {selectedMember.fine && (
                  <div className="form-group">
                    <label>Outstanding Fine (Ksh)</label>
                    <input type="number" defaultValue={selectedMember.fine} />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .members-page {
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
        .g::after { background: var(--gold); }
        .r::after { background: var(--red); }
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
        .stat-num.gold { color: var(--gold); }
        .stat-num.red { color: var(--red); }
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
        }
        .panel-action:hover {
          background: rgba(201,168,76,0.1);
        }
        .panel-body {
          padding: 1rem 1.2rem;
        }

        /* Search Bar */
        .search-bar {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
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
        .search-bar select {
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
          padding: 0.65rem 0.75rem;
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
        .member-phone {
          font-size: 0.65rem;
          color: var(--text3);
          margin-top: 0.2rem;
        }
        .email {
          font-size: 0.68rem;
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
        }
        .pill {
          display: inline-block;
          font-size: 0.58rem;
          padding: 2px 7px;
          border-radius: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .pg { background: rgba(82,194,120,0.12); color: var(--green); }
        .pr { background: rgba(224,82,82,0.12); color: var(--red); }
        .pa { background: rgba(224,160,82,0.12); color: var(--amber); }
        .pb { background: rgba(82,148,224,0.12); color: var(--blue); }

        /* Actions */
        .actions {
          display: flex;
          gap: 0.3rem;
          white-space: nowrap;
        }
        .action-btn {
          background: none;
          border: 1px solid var(--border2);
          border-radius: 3px;
          padding: 0.25rem;
          cursor: pointer;
          color: var(--text2);
          transition: all 0.14s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .action-btn:hover {
          background: var(--surface2);
          color: var(--text);
        }
        .action-btn.suspend:hover {
          border-color: rgba(224,82,82,0.4);
          color: var(--red);
        }
        .action-btn.reinstate:hover {
          border-color: rgba(82,194,120,0.4);
          color: var(--green);
        }
        .action-btn.fine:hover {
          border-color: rgba(224,160,82,0.4);
          color: var(--amber);
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
        .form-group label {
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text3);
        }
        .form-group input,
        .form-group select {
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
        .form-group select:focus {
          border-color: rgba(201,168,76,0.4);
        }
        .form-group input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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
      `}</style>
    </div>
  )
}