'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Search: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  Edit: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3l4 4-7 7H10v-4l7-7z" /></svg>),
}

interface Member {
  id: string
  name: string
  cardNo: string
  email: string
  phone: string
  type: string
  booksOut: string
  joined: string
  status: string
}

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [members] = useState<Member[]>([
    { id: '1', name: 'Jane Austen', cardNo: 'LIB-004821', email: 'jane@email.com', phone: '+254 700 000 001', type: 'Standard', booksOut: '3/5', joined: 'Jan 2024', status: 'Active' },
    { id: '2', name: 'Kofi Mensah', cardNo: 'LIB-003341', email: 'kofi@email.com', phone: '+254 700 000 002', type: 'Scholar', booksOut: '8/15', joined: 'Mar 2023', status: 'Active' },
    { id: '3', name: 'Amina Wanjiku', cardNo: 'LIB-007712', email: 'amina@email.com', phone: '+254 700 000 003', type: 'Patron', booksOut: '2/∞', joined: 'Jun 2022', status: 'Overdue' },
  ])

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.cardNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="members-page">
      <div className="page-header">
        <h2>Member Lookup</h2>
        <p>Search and manage library members</p>
      </div>

      <div className="search-bar">
        <Icons.Search />
        <input type="text" placeholder="Search by name, card number, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <table className="members-table">
        <thead>
          <tr><th>Member</th><th>Card No.</th><th>Contact</th><th>Type</th><th>Books</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredMembers.map(member => (
            <tr key={member.id}>
              <td><strong>{member.name}</strong></td>
              <td>{member.cardNo}</td>
              <td>{member.email}<br /><span className="phone">{member.phone}</span></td>
              <td>{member.type}</td>
              <td>{member.booksOut}</td>
              <td>{member.joined}</td>
              <td><span className={`status ${member.status === 'Active' ? 'active' : 'overdue'}`}>{member.status}</span></td>
              <td><button className="view-btn"><Icons.Edit /> View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .members-page {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
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
        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.5rem 0.8rem;
        }
        .search-bar input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
        }
        .members-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--surface);
          border-radius: 8px;
          overflow: hidden;
        }
        .members-table th {
          text-align: left;
          padding: 0.8rem;
          background: var(--bg2);
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--muted);
        }
        .members-table td {
          padding: 0.8rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.8rem;
        }
        .phone {
          font-size: 0.65rem;
          color: var(--muted);
        }
        .status {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          font-size: 0.65rem;
        }
        .status.active {
          background: rgba(82,194,120,0.1);
          color: var(--green);
        }
        .status.overdue {
          background: rgba(224,82,82,0.1);
          color: var(--red);
        }
        .view-btn {
          padding: 0.2rem 0.6rem;
          background: none;
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }
        @media (max-width: 768px) {
          .members-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  )
}