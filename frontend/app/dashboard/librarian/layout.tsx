'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

// SVG Icons
const Icons = {
  Dashboard: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
  CheckInOut: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
  Overdue: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  Reservations: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
  BrowseBooks: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>),
  AddTitle: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>),
  EditRecords: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3l4 4-7 7H10v-4l7-7z" /><path d="M4 20h16" /></svg>),
  NewArrivals: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
  MemberLookup: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  IssueCard: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>),
  CollectFine: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /></svg>),
  Settings: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.09a10 10 0 0 0 14.66 0z" /></svg>),
  Logout: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>),
  DarkMode: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>),
  LightMode: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>),
}

export default function LibrarianLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const stats = {
    checkoutsToday: 18,
    returnsToday: 11,
    readyPickup: 9,
    overdueItems: 47,
  }

  const staffData = {
    name: 'Ms. Mary Kamau',
    initials: 'MK',
    shift: '08:00 – 16:00'
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/login?redirect=/dashboard/librarian')
        return
      }
      const userRole = user.user_metadata?.role
      if (userRole !== 'librarian' && userRole !== 'admin') {
        toast.error('Access denied. Librarian only.')
        router.push('/dashboard')
        return
      }
      setUser(user)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out successfully')
    router.push('/login')
  }

  const isActive = (path: string) => {
    if (path === '/dashboard/librarian' && pathname === '/dashboard/librarian') return true
    if (path !== '/dashboard/librarian' && pathname?.startsWith(path)) return true
    return false
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="librarian-dashboard">
      {/* Top Navigation Bar */}
      <div className="page-nav">
        <Link href="/dashboard/librarian" className={pathname === '/dashboard/librarian' ? 'current' : ''}>
          <Icons.Dashboard /> Librarian
        </Link>
        <Link href="/dashboard">
          <Icons.Dashboard /> Public
        </Link>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Icons.LightMode /> : <Icons.DarkMode />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className="librarian-sidebar">
        <div className="sb-head">
          <div className="sb-logo">Bibliotheca</div>
          <div className="sb-role">Librarian Desk</div>
          <div className="sb-staff">
            <div className="staff-av">{staffData.initials}</div>
            <div className="staff-info">
              <div className="staff-name">{staffData.name}</div>
              <div className="staff-shift">Shift: {staffData.shift}</div>
            </div>
          </div>
        </div>

        <div className="sb-sec">
          <div className="sb-lbl">Desk</div>
          <Link href="/dashboard/librarian" className={`sb-item ${isActive('/dashboard/librarian') && pathname === '/dashboard/librarian' ? 'active' : ''}`}>
            <Icons.Dashboard /> Today's Queue
          </Link>
          <Link href="/dashboard/librarian/checkout" className={`sb-item ${isActive('/dashboard/librarian/checkout') ? 'active' : ''}`}>
            <Icons.CheckInOut /> Check-in / Out <span className="sb-count">{stats.checkoutsToday + stats.returnsToday}</span>
          </Link>
          <Link href="/dashboard/librarian/overdue" className={`sb-item ${isActive('/dashboard/librarian/overdue') ? 'active' : ''}`}>
            <Icons.Overdue /> Overdue Returns <span className="sb-count sb-urgent">{stats.overdueItems}</span>
          </Link>
          <Link href="/dashboard/librarian/reservations" className={`sb-item ${isActive('/dashboard/librarian/reservations') ? 'active' : ''}`}>
            <Icons.Reservations /> Reservations <span className="sb-count">{stats.readyPickup}</span>
          </Link>
        </div>

        <div className="sb-sec">
          <div className="sb-lbl">Catalogue</div>
          <Link href="/dashboard/librarian/catalogue" className={`sb-item ${isActive('/dashboard/librarian/catalogue') ? 'active' : ''}`}>
            <Icons.BrowseBooks /> Browse Books
          </Link>
          <Link href="/dashboard/librarian/arrivals" className={`sb-item ${isActive('/dashboard/librarian/arrivals') ? 'active' : ''}`}>
            <Icons.NewArrivals /> New Arrivals <span className="sb-count">12</span>
          </Link>
        </div>

        <div className="sb-sec">
          <div className="sb-lbl">Members</div>
          <Link href="/dashboard/librarian/members" className={`sb-item ${isActive('/dashboard/librarian/members') ? 'active' : ''}`}>
            <Icons.MemberLookup /> Member Lookup
          </Link>
          <Link href="/dashboard/librarian/issue-card" className={`sb-item ${isActive('/dashboard/librarian/issue-card') ? 'active' : ''}`}>
            <Icons.IssueCard /> Issue Card
          </Link>
          <Link href="/dashboard/librarian/fines" className={`sb-item ${isActive('/dashboard/librarian/fines') ? 'active' : ''}`}>
            <Icons.CollectFine /> Collect Fine
          </Link>
        </div>

        <div className="sb-sec">
          <div className="sb-lbl">System</div>
          <Link href="/dashboard/librarian/settings" className={`sb-item ${isActive('/dashboard/librarian/settings') ? 'active' : ''}`}>
            <Icons.Settings /> Settings
          </Link>
        </div>

        <div className="sb-bottom">
          <div className="admin-dot"></div>
          <div className="admin-name">Librarian · {staffData.name}</div>
          <button className="logout-btn" onClick={handleLogout}>
            <Icons.Logout />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="librarian-main">
        <div className="topbar">
          <div>
            <span className="tb-greeting">{getGreeting()}, {staffData.name.split(' ')[1]?.replace(',', '') || 'Mary'}.</span>
            <span className="tb-date">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="search-wrap">
            <span className="search-icon"><Icons.Dashboard /></span>
            <input type="text" placeholder="Search member, book title, ISBN…" />
          </div>
          <button className="tb-badge warn" onClick={() => router.push('/dashboard/librarian/overdue')}>
            <Icons.Overdue /> {stats.overdueItems} Overdue
          </button>
          <button className="tb-badge info" onClick={() => router.push('/dashboard/librarian/arrivals')}>
            <Icons.NewArrivals /> 12 New Arrivals
          </button>
        </div>

        <div className="content-area">
          {children}
        </div>
      </div>

      <style jsx>{`
        .librarian-dashboard {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          display: flex;
          overflow: hidden;
        }

        .page-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          height: 36px;
          background: rgba(247, 243, 236, 0.96);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 0 1rem;
          backdrop-filter: blur(8px);
        }
        .page-nav a {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.28rem 0.9rem;
          border-radius: 3px;
          text-decoration: none;
          color: var(--text2);
          border: 1px solid transparent;
          transition: all 0.18s;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .page-nav a:hover {
          color: var(--text);
          border-color: var(--border2);
        }
        .page-nav a.current {
          background: var(--ink);
          color: #f7f3ec;
          font-weight: 600;
        }
        .dark-mode-toggle {
          background: none;
          border: 1px solid var(--border2);
          border-radius: 3px;
          padding: 0.28rem 0.6rem;
          cursor: pointer;
          color: var(--text2);
          display: inline-flex;
          align-items: center;
        }

        .librarian-sidebar {
          width: 240px;
          min-height: 100vh;
          background: var(--ink);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: fixed;
          left: 0;
          top: 36px;
          bottom: 0;
          z-index: 100;
          overflow-y: auto;
        }
        .sb-head {
          padding: 1.2rem 1.2rem 1rem;
          border-bottom: 1px solid rgba(247, 243, 236, 0.08);
        }
        .sb-logo {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.1rem;
          color: #e8dfc8;
        }
        .sb-role {
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(247, 243, 236, 0.25);
          margin-top: 4px;
        }
        .sb-staff {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-top: 1rem;
          padding-top: 0.8rem;
          border-top: 1px solid rgba(247, 243, 236, 0.06);
        }
        .staff-av {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9a6f0a, #7a3010);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
        }
        .staff-info {
          flex: 1;
        }
        .staff-name {
          font-size: 0.78rem;
          color: rgba(247, 243, 236, 0.75);
        }
        .staff-shift {
          font-size: 0.6rem;
          color: rgba(247, 243, 236, 0.25);
        }
        .sb-sec {
          padding: 0.9rem 0.7rem 0.2rem;
        }
        .sb-lbl {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(247, 243, 236, 0.2);
          padding: 0 0.5rem;
          margin-bottom: 0.35rem;
        }
        .sb-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.7rem;
          border-radius: 4px;
          cursor: pointer;
          color: rgba(247, 243, 236, 0.45);
          font-size: 0.78rem;
          transition: all 0.14s;
          margin-bottom: 1px;
          position: relative;
          text-decoration: none;
        }
        .sb-item:hover {
          background: rgba(247, 243, 236, 0.06);
          color: rgba(247, 243, 236, 0.85);
        }
        .sb-item.active {
          background: rgba(154, 111, 10, 0.15);
          color: #d4a843;
        }
        .sb-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 22%;
          bottom: 22%;
          width: 2px;
          background: #9a6f0a;
          border-radius: 2px;
        }
        .sb-count {
          margin-left: auto;
          font-size: 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          background: rgba(247, 243, 236, 0.08);
          padding: 1px 7px;
          border-radius: 10px;
          color: rgba(247, 243, 236, 0.3);
        }
        .sb-urgent {
          background: rgba(192, 57, 43, 0.25) !important;
          color: #e57373 !important;
        }
        .sb-bottom {
          margin-top: auto;
          padding: 1rem 1.2rem;
          border-top: 1px solid rgba(247, 243, 236, 0.06);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .admin-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 6px var(--green);
        }
        .admin-name {
          font-size: 0.75rem;
          color: rgba(247, 243, 236, 0.6);
          flex: 1;
        }
        .logout-btn {
          background: none;
          border: none;
          color: rgba(247, 243, 236, 0.4);
          cursor: pointer;
        }

        .librarian-main {
          margin-left: 240px;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 36px;
          overflow: hidden;
          height: 100vh;
        }
        .topbar {
          height: 56px;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          gap: 1rem;
          flex-shrink: 0;
        }
        .tb-greeting {
          font-family: 'Libre Baskerville', serif;
          font-size: 0.9rem;
          font-style: italic;
          color: var(--ink);
        }
        .tb-date {
          font-size: 0.7rem;
          color: var(--muted);
          margin-left: 0.4rem;
        }
        .search-wrap {
          flex: 1;
          max-width: 360px;
          position: relative;
          margin-left: auto;
        }
        .search-wrap input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2rem;
          border: 1px solid var(--border);
          border-radius: 3px;
          background: var(--bg);
          font-size: 0.8rem;
          outline: none;
        }
        .search-icon {
          position: absolute;
          left: 0.6rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
        }
        .tb-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 3px;
          font-size: 0.68rem;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .tb-badge.warn {
          background: rgba(192, 57, 43, 0.1);
          color: var(--red);
          border: 1px solid rgba(192, 57, 43, 0.2);
        }
        .tb-badge.info {
          background: rgba(154, 111, 10, 0.08);
          color: var(--gold);
          border: 1px solid rgba(154, 111, 10, 0.2);
        }
        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.2rem;
        }

        @media (max-width: 768px) {
          .librarian-sidebar {
            transform: translateX(-100%);
            position: fixed;
            z-index: 200;
            transition: transform 0.3s ease;
          }
          .librarian-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}