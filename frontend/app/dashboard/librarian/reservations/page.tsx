'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export default function ReservationsPage() {
  const [reservations] = useState([
    { id: '1', memberName: 'Jane Austen', memberCard: 'LIB-004821', bookTitle: 'Things Fall Apart', reservedDate: 'Apr 15, 2026', status: 'Ready', priority: 'Normal' },
    { id: '2', memberName: 'Kofi Mensah', memberCard: 'LIB-003341', bookTitle: 'Arrow of God', reservedDate: 'Apr 14, 2026', status: 'Pending', priority: 'High' },
    { id: '3', memberName: 'Amina Wanjiku', memberCard: 'LIB-007712', bookTitle: 'The River Between', reservedDate: 'Apr 12, 2026', status: 'Pending', priority: 'Normal' },
  ])

  const handleFulfill = (id: string) => {
    toast.success('Reservation fulfilled')
  }

  const handleCancel = (id: string) => {
    toast.warning('Reservation cancelled')
  }

  return (
    <div className="panel returns-panel">
      <div className="ph">
        <div className="pt">Reservations</div>
      </div>
      <div className="pb">
        {reservations.map(item => (
          <div key={item.id} className="ret-item">
            <div className="ret-num">{item.memberCard}</div>
            <div className="ret-info">
              <div className="ret-title">{item.bookTitle}</div>
              <div className="ret-member">{item.memberName} · Reserved {item.reservedDate}</div>
            </div>
            <div className={`ret-days ${item.status === 'Ready' ? 'reserved' : 'ontime'}`}>
              {item.status}
            </div>
            {item.status === 'Ready' && (
              <button className="abt" onClick={() => handleFulfill(item.id)}>Fulfill</button>
            )}
            <button className="abt r" onClick={() => handleCancel(item.id)}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  )
}