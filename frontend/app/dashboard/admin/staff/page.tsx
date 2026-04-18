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
  Edit: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3l4 4-7 7H10v-4l7-7z" />
    </svg>
  ),
  Add: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
}

interface Staff {
  id: string
  name: string
  initials: string
  role: string
  email: string
  phone: string
  shift: string
  department: string
  status: 'on-duty' | 'off-duty' | 'on-call'
  avatarColor: string
}

interface ShiftSchedule {
  staff: string
  mon: string
  tue: string
  wed: string
  thu: string
  fri: string
  sat: string
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const [staff] = useState<Staff[]>([
    { id: '1', name: 'Dr. David Mwangi', initials: 'DM', role: 'Admin', email: 'david@bibliotheca.ke', phone: '+254 700 000 001', shift: '08:00–17:00', department: 'Administration', status: 'on-duty', avatarColor: 'linear-gradient(135deg, #c9a84c, #8b3a1a)' },
    { id: '2', name: 'Ms. Mary Kamau', initials: 'MK', role: 'Senior Librarian', email: 'mary@bibliotheca.ke', phone: '+254 700 000 002', shift: '08:00–16:00', department: 'Circulation', status: 'on-duty', avatarColor: 'linear-gradient(135deg, #5294e0, #1a2c4a)' },
    { id: '3', name: 'Mr. James Otieno', initials: 'JO', role: 'Librarian', email: 'james@bibliotheca.ke', phone: '+254 700 000 003', shift: '12:00–20:00', department: 'Digital Services', status: 'off-duty', avatarColor: 'linear-gradient(135deg, #52c278, #1a4a2a)' },
    { id: '4', name: 'Ms. Fatuma Ndegwa', initials: 'FN', role: 'Cataloguer', email: 'fatuma@bibliotheca.ke', phone: '+254 700 000 004', shift: '09:00–17:00', department: 'Technical Services', status: 'on-duty', avatarColor: 'linear-gradient(135deg, #a066e0, #2a1a4a)' },
    { id: '5', name: 'Mr. Samuel Kariuki', initials: 'SK', role: 'IT Support', email: 'samuel@bibliotheca.ke', phone: '+254 700 000 005', shift: 'On-call', department: 'IT', status: 'on-call', avatarColor: 'linear-gradient(135deg, #e0a052, #4a2a0a)' },
    { id: '6', name: 'Ms. Grace Wanjiku', initials: 'GW', role: 'Children\'s Librarian', email: 'grace@bibliotheca.ke', phone: '+254 700 000 006', shift: '09:00–17:00', department: 'Children\'s Services', status: 'on-duty', avatarColor: 'linear-gradient(135deg, #e052a0, #4a1a3a)' },
    { id: '7', name: 'Mr. Peter Omondi', initials: 'PO', role: 'Library Assistant', email: 'peter@bibliotheca.ke', phone: '+254 700 000 007', shift: '14:00–22:00', department: 'Circulation', status: 'off-duty', avatarColor: 'linear-gradient(135deg, #52a0e0, #1a3a6a)' },
  ])

  const [shiftSchedule] = useState<ShiftSchedule[]>([
    { staff: 'M. Kamau', mon: 'AM', tue: 'AM', wed: '—', thu: 'AM', fri: 'AM', sat: '—' },
    { staff: 'J. Otieno', mon: '—', tue: 'PM', wed: 'PM', thu: 'PM', fri: 'PM', sat: 'Half' },
    { staff: 'F. Ndegwa', mon: 'AM', tue: 'AM', wed: 'AM', thu: 'AM', fri: '—', sat: '—' },
    { staff: 'S. Kariuki', mon: 'On-call', tue: 'On-call', wed: 'On-call', thu: 'On-call', fri: 'On-call', sat: '—' },
  ])

  const stats = {
    totalStaff: 18,
    onDutyNow: 6,
    librarians: 8,
    adminStaff: 3,
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'on-duty': return { class: 'pill pg', text: 'On Duty', icon: '🟢' }
      case 'off-duty': return { class: 'pill pa', text: 'Off Duty', icon: '⚪' }
      case 'on-call': return { class: 'pill pb', text: 'On Call', icon: '📞' }
      default: return { class: 'pill pb', text: status }
    }
  }

  const getShiftPill = (shift: string) => {
    switch(shift) {
      case 'AM': return { class: 'pill pg', text: 'AM' }
      case 'PM': return { class: 'pill pb', text: 'PM' }
      case 'Half': return { class: 'pill pa', text: 'Half' }
      case 'On-call': return { class: 'pill pa2', text: 'On-call' }
      case '—': return { class: 'pill', text: '—' }
      default: return { class: 'pill', text: shift }
    }
  }

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || s.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember)
    setShowEditModal(true)
  }

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('New staff member added')
    setShowAddModal(false)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`${selectedStaff?.name} updated`)
    setShowEditModal(false)
  }

  const departments = ['all', 'Administration', 'Circulation', 'Digital Services', 'Technical Services', 'IT', "Children's Services"]

  return (
    <div className="staff-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box gr">
          <div className="stat-lbl">Total Staff</div>
          <div className="stat-num green">{stats.totalStaff}</div>
          <div className="stat-change">across all roles</div>
        </div>
        <div className="stat-box b">
          <div className="stat-lbl">On Duty Now</div>
          <div className="stat-num blue">{stats.onDutyNow}</div>
          <div className="stat-change">current shift</div>
        </div>
        <div className="stat-box g">
          <div className="stat-lbl">Librarians</div>
          <div className="stat-num gold">{stats.librarians}</div>
          <div className="stat-change">4 active today</div>
        </div>
        <div className="stat-box a">
          <div className="stat-lbl">Admin Staff</div>
          <div className="stat-num amber">{stats.adminStaff}</div>
          <div className="stat-change">including Dr. Mwangi</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="staff-grid">
        {/* Left Panel - Staff Directory */}
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Staff Directory</div>
            <div className="panel-actions">
              <button className="panel-action" onClick={() => setShowAddModal(true)}>
                <Icons.Add /> Add Staff
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
                  placeholder="Search by name, role, or email…" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
                ))}
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="on-duty">On Duty</option>
                <option value="off-duty">Off Duty</option>
                <option value="on-call">On Call</option>
              </select>
            </div>

            {/* Staff Cards */}
            <div className="staff-list">
              {filteredStaff.map(member => {
                const statusBadge = getStatusBadge(member.status)
                return (
                  <div key={member.id} className="staff-card">
                    <div className="staff-avatar" style={{ background: member.avatarColor }}>
                      {member.initials}
                    </div>
                    <div className="staff-info">
                      <div className="staff-name">{member.name}</div>
                      <div className="staff-role">{member.role}</div>
                      <div className="staff-meta">
                        <span className="staff-dept">{member.department}</span>
                        <span className="staff-shift">{member.shift}</span>
                      </div>
                      <div className="staff-contact">
                        <span>{member.email}</span>
                        <span>{member.phone}</span>
                      </div>
                    </div>
                    <div className="staff-status">
                      <span className={statusBadge.class}>
                        {statusBadge.icon} {statusBadge.text}
                      </span>
                    </div>
                    <div className="staff-actions">
                      <button className="action-btn" onClick={() => handleEditStaff(member)}>
                        <Icons.Edit /> Edit
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredStaff.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <p>No staff members match your filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Shift Schedule */}
        <div className="right-panel">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Shift Schedule — This Week</div>
            </div>
            <div className="panel-body">
              <div className="schedule-wrapper">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>Staff</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shiftSchedule.map((row, idx) => (
                      <tr key={idx}>
                        <td className="staff-name-cell">{row.staff}</td>
                        <td><span className={getShiftPill(row.mon).class}>{row.mon}</span></td>
                        <td><span className={getShiftPill(row.tue).class}>{row.tue}</span></td>
                        <td><span className={getShiftPill(row.wed).class}>{row.wed}</span></td>
                        <td><span className={getShiftPill(row.thu).class}>{row.thu}</span></td>
                        <td><span className={getShiftPill(row.fri).class}>{row.fri}</span></td>
                        <td><span className={getShiftPill(row.sat).class}>{row.sat}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Staff Member</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleAddStaff}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Full name" required />
                  </div>
                  <div className="form-group">
                    <label>Initials</label>
                    <input type="text" placeholder="JD" maxLength={2} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" placeholder="staff@bibliotheca.ke" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" placeholder="+254 700 000 000" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Role *</label>
                    <input type="text" placeholder="Job title" required />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select>
                      <option>Administration</option>
                      <option>Circulation</option>
                      <option>Digital Services</option>
                      <option>Technical Services</option>
                      <option>IT</option>
                      <option>Children's Services</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Shift</label>
                    <input type="text" placeholder="e.g., 09:00–17:00" />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select>
                      <option>On Duty</option>
                      <option>Off Duty</option>
                      <option>On Call</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Hire Date</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <input type="text" placeholder="Name and phone" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && selectedStaff && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit — {selectedStaff.name}</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={selectedStaff.name} required />
                  </div>
                  <div className="form-group">
                    <label>Initials</label>
                    <input type="text" defaultValue={selectedStaff.initials} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={selectedStaff.email} required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" defaultValue={selectedStaff.phone} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <input type="text" defaultValue={selectedStaff.role} required />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select defaultValue={selectedStaff.department}>
                      <option>Administration</option>
                      <option>Circulation</option>
                      <option>Digital Services</option>
                      <option>Technical Services</option>
                      <option>IT</option>
                      <option>Children's Services</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Shift</label>
                    <input type="text" defaultValue={selectedStaff.shift} />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select defaultValue={selectedStaff.status === 'on-duty' ? 'On Duty' : selectedStaff.status === 'off-duty' ? 'Off Duty' : 'On Call'}>
                      <option>On Duty</option>
                      <option>Off Duty</option>
                      <option>On Call</option>
                    </select>
                  </div>
                </div>
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
        .staff-page {
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

        /* Grid Layout */
        .staff-grid {
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

        /* Staff List */
        .staff-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 500px;
          overflow-y: auto;
        }
        .staff-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg3);
          border-radius: 8px;
          transition: all 0.14s;
        }
        .staff-card:hover {
          background: var(--surface2);
        }
        .staff-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .staff-info {
          flex: 1;
          min-width: 0;
        }
        .staff-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text);
        }
        .staff-role {
          font-size: 0.7rem;
          color: var(--gold);
          margin-top: 0.1rem;
        }
        .staff-meta {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.2rem;
          font-size: 0.65rem;
          color: var(--text3);
          flex-wrap: wrap;
        }
        .staff-contact {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.2rem;
          font-size: 0.6rem;
          color: var(--text3);
          font-family: 'JetBrains Mono', monospace;
          flex-wrap: wrap;
        }
        .staff-status {
          flex-shrink: 0;
        }
        .staff-actions {
          flex-shrink: 0;
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
        .pa { background: rgba(224,160,82,0.12); color: var(--amber); }
        .pb { background: rgba(82,148,224,0.12); color: var(--blue); }
        .pa2 { background: rgba(201,168,76,0.12); color: var(--gold); }
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
        .action-btn:hover {
          background: var(--surface2);
          color: var(--text);
        }

        /* Right Panel */
        .right-panel {
          display: flex;
          flex-direction: column;
        }

        /* Schedule Table */
        .schedule-wrapper {
          overflow-x: auto;
        }
        .schedule-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.7rem;
        }
        .schedule-table th {
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text3);
          padding: 0.5rem 0.3rem;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .schedule-table td {
          padding: 0.5rem 0.3rem;
          text-align: center;
          color: var(--text2);
          border-bottom: 1px solid var(--border);
        }
        .staff-name-cell {
          text-align: left;
          font-weight: 500;
          color: var(--text);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: var(--text3);
        }
        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
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
          .staff-grid {
            grid-template-columns: 1fr;
          }
          .filters-bar {
            flex-direction: column;
          }
          .filters-bar select {
            width: 100%;
          }
          .staff-card {
            flex-wrap: wrap;
          }
          .staff-actions {
            width: 100%;
            text-align: right;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}