'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

// SVG Icons (same as your page)
const Icons = {
  Dashboard: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
  Members: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  Catalogue: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>),
  Transactions: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10h18M6 14h4M13 14h4M3 6h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" /></svg>),
  Overdue: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  Fines: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>),
  Reservations: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /></svg>),
  Acquisitions: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>),
  Staff: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Reports: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>),
  AILogs: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10c0 4.5-3 8-7 9v-4" /><circle cx="12" cy="12" r="4" /><path d="M12 2v4M12 18v4" /></svg>),
  Settings: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.09a10 10 0 0 0 14.66 0z" /></svg>),
  Logout: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>),
  DarkMode: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>),
  LightMode: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>),
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const stats = {
    totalMembers: 12847,
    totalBooks: 84210,
    overdueItems: 47,
    finesOutstanding: 28540,
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/login?redirect=/dashboard/admin')
        return
      }
      const userRole = user.user_metadata?.role
      if (userRole !== 'admin') {
        toast.error('Access denied. Admin only.')
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
    if (path === '/dashboard/admin' && pathname === '/dashboard/admin') return true
    if (path !== '/dashboard/admin' && pathname?.startsWith(path)) return true
    return false
  }

  const pageTitles: Record<string, string> = {
    '/dashboard/admin': 'System Dashboard',
    '/dashboard/admin/members': 'Member Management',
    '/dashboard/admin/catalogue': 'Book Catalogue',
    '/dashboard/admin/transactions': 'Transaction History',
    '/dashboard/admin/overdue': 'Overdue Items',
    '/dashboard/admin/fines': 'Fine Management',
    '/dashboard/admin/reservations': 'Reservations',
    '/dashboard/admin/acquisitions': 'New Acquisitions',
    '/dashboard/admin/staff': 'Staff Management',
    '/dashboard/admin/reports': 'Reports',
    '/dashboard/admin/ai-logs': 'AI System Logs',
    '/dashboard/admin/settings': 'System Settings',
  }

  const pageCrumbs: Record<string, string> = {
    '/dashboard/admin': '/ overview',
    '/dashboard/admin/members': '/ members',
    '/dashboard/admin/catalogue': '/ catalogue',
    '/dashboard/admin/transactions': '/ transactions',
    '/dashboard/admin/overdue': '/ operations / overdue',
    '/dashboard/admin/fines': '/ operations / fines',
    '/dashboard/admin/reservations': '/ operations / reservations',
    '/dashboard/admin/acquisitions': '/ operations / acquisitions',
    '/dashboard/admin/staff': '/ system / staff',
    '/dashboard/admin/reports': '/ system / reports',
    '/dashboard/admin/ai-logs': '/ system / ai-logs',
    '/dashboard/admin/settings': '/ system / settings',
  }

  return (
    <div className="admin-dashboard">
      {/* Top Navigation Bar */}
      <div className="pnav">
        <Link href="/dashboard/admin" className={pathname === '/dashboard/admin' ? 'cur' : ''}>
          <Icons.Dashboard /> Admin
        </Link>
        <Link href="/dashboard/librarian">
          <Icons.Catalogue /> Librarian
        </Link>
        <Link href="/dashboard">
          <Icons.Dashboard /> Public
        </Link>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Icons.LightMode /> : <Icons.DarkMode />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className="admin-sidebar">
        <div className="sb-head">
          <div className="sb-logo">BIBLIOTHECA</div>
          <div className="sb-role">// Admin Control</div>
        </div>

        <div className="sb-sec">
          <div className="sb-lbl">Core</div>
          <Link href="/dashboard/admin" className={`sb-item ${isActive('/dashboard/admin') && pathname === '/dashboard/admin' ? 'active' : ''}`}>
            <Icons.Dashboard /> Dashboard
          </Link>
          <Link href="/dashboard/admin/members" className={`sb-item ${isActive('/dashboard/admin/members') ? 'active' : ''}`}>
            <Icons.Members /> Members 
            <span className="sb-badge ba">{stats.totalMembers.toLocaleString()}</span>
          </Link>
          <Link href="/dashboard/admin/catalogue" className={`sb-item ${isActive('/dashboard/admin/catalogue') ? 'active' : ''}`}>
            <Icons.Catalogue /> Catalogue 
            <span className="sb-badge ba">{stats.totalBooks.toLocaleString()}</span>
          </Link>
          <Link href="/dashboard/admin/transactions" className={`sb-item ${isActive('/dashboard/admin/transactions') ? 'active' : ''}`}>
            <Icons.Transactions /> Transactions
          </Link>
        </div>

        <div className="sb-sec">
          <div className="sb-lbl">Operations</div>
          <Link href="/dashboard/admin/overdue" className={`sb-item ${isActive('/dashboard/admin/overdue') ? 'active' : ''}`}>
            <Icons.Overdue /> Overdue 
            <span className="sb-badge br">{stats.overdueItems}</span>
          </Link>
          <Link href="/dashboard/admin/fines" className={`sb-item ${isActive('/dashboard/admin/fines') ? 'active' : ''}`}>
            <Icons.Fines /> Fines 
            <span className="sb-badge br">Ksh {stats.finesOutstanding.toLocaleString()}</span>
          </Link>
          <Link href="/dashboard/admin/reservations" className={`sb-item ${isActive('/dashboard/admin/reservations') ? 'active' : ''}`}>
            <Icons.Reservations /> Reservations 
            <span className="sb-badge bb">23</span>
          </Link>
          <Link href="/dashboard/admin/acquisitions" className={`sb-item ${isActive('/dashboard/admin/acquisitions') ? 'active' : ''}`}>
            <Icons.Acquisitions /> Acquisitions 
            <span className="sb-badge bg">12</span>
          </Link>
        </div>

        <div className="sb-sec">
          <div className="sb-lbl">System</div>
          <Link href="/dashboard/admin/staff" className={`sb-item ${isActive('/dashboard/admin/staff') ? 'active' : ''}`}>
            <Icons.Staff /> Staff Mgmt
          </Link>
          <Link href="/dashboard/admin/reports" className={`sb-item ${isActive('/dashboard/admin/reports') ? 'active' : ''}`}>
            <Icons.Reports /> Reports
          </Link>
          <Link href="/dashboard/admin/ai-logs" className={`sb-item ${isActive('/dashboard/admin/ai-logs') ? 'active' : ''}`}>
            <Icons.AILogs /> AI Logs
          </Link>
          <Link href="/dashboard/admin/settings" className={`sb-item ${isActive('/dashboard/admin/settings') ? 'active' : ''}`}>
            <Icons.Settings /> Settings
          </Link>
        </div>

        <div className="sb-bottom">
          <div className="sb-dot"></div>
          <div className="sb-admin">Admin · {user?.email?.split('@')[0] || 'Dr. Mwangi'}</div>
          <button className="logout-btn" onClick={handleLogout}>
            <Icons.Logout />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="admin-main">
        <div className="topbar">
          <div className="tb-title">{pageTitles[pathname || '/dashboard/admin']}</div>
          <span className="tb-breadcrumb">{pageCrumbs[pathname || '/dashboard/admin']}</span>
          <div className="tb-time">{currentTime}</div>
          <button className="tb-btn" onClick={() => toast.success('Export started')}>↓ Export</button>
          <button className="tb-btn danger" onClick={() => toast.info('3 active alerts')}>⚠ 3 Alerts</button>
        </div>

        <div className="content-area">
          {children}
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          display: flex;
          overflow: hidden;
        }

        /* Top Navigation */
        .pnav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          height: 36px;
          background: rgba(14,14,15,0.96);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          padding: 0 1rem;
          backdrop-filter: blur(8px);
        }
        .pnav a {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.32rem 0.9rem;
          border-radius: 3px;
          text-decoration: none;
          color: var(--text2);
          border: 1px solid transparent;
          transition: all 0.18s;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .pnav a:hover {
          color: var(--text);
          border-color: var(--border2);
        }
        .pnav a.cur {
          background: var(--gold);
          color: #0e0e0f;
          font-weight: 700;
        }
        .dark-mode-toggle {
          background: none;
          border: 1px solid var(--border2);
          border-radius: 3px;
          padding: 0.28rem 0.6rem;
          cursor: pointer;
          color: var(--text2);
          display: flex;
          align-items: center;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 224px;
          min-height: 100vh;
          background: var(--bg2);
          border-right: 1px solid var(--border);
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
          padding: 1.3rem 1.2rem 1rem;
          border-bottom: 1px solid var(--border);
        }
        .sb-logo {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.06em;
        }
        .sb-role {
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text3);
          margin-top: 3px;
          font-family: 'JetBrains Mono', monospace;
        }
        .sb-sec {
          padding: 0.9rem 0.7rem 0.2rem;
        }
        .sb-lbl {
          font-size: 0.55rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--text3);
          padding: 0 0.5rem;
          margin-bottom: 0.35rem;
        }
        .sb-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.52rem 0.65rem;
          border-radius: 3px;
          cursor: pointer;
          color: var(--text2);
          font-size: 0.78rem;
          transition: all 0.14s;
          margin-bottom: 1px;
          position: relative;
          text-decoration: none;
        }
        .sb-item:hover {
          background: var(--surface);
          color: var(--text);
        }
        .sb-item.active {
          background: rgba(201,168,76,0.12);
          color: var(--gold);
        }
        .sb-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 22%;
          bottom: 22%;
          width: 2px;
          background: var(--gold);
          border-radius: 2px;
        }
        .sb-badge {
          margin-left: auto;
          font-size: 0.58rem;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }
        .br { background: rgba(224,82,82,0.2); color: var(--red); }
        .ba { background: rgba(224,160,82,0.2); color: var(--amber); }
        .bg { background: rgba(82,194,120,0.18); color: var(--green); }
        .bb { background: rgba(82,148,224,0.18); color: var(--blue); }
        .sb-bottom {
          margin-top: auto;
          padding: 1rem 1.2rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .sb-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 6px var(--green);
          flex-shrink: 0;
        }
        .sb-admin {
          font-size: 0.78rem;
          color: var(--text2);
          flex: 1;
        }
        .logout-btn {
          background: none;
          border: none;
          color: var(--text2);
          cursor: pointer;
        }

        /* Main Content */
        .admin-main {
          margin-left: 224px;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 36px;
          overflow: hidden;
          height: 100vh;
        }
        .topbar {
          height: 56px;
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 1.6rem;
          gap: 0.9rem;
          flex-shrink: 0;
        }
        .tb-title {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .tb-breadcrumb {
          font-size: 0.7rem;
          color: var(--text3);
          font-family: 'JetBrains Mono', monospace;
        }
        .tb-time {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--text3);
          margin-left: auto;
        }
        .tb-btn {
          padding: 0.38rem 0.9rem;
          border-radius: 3px;
          border: 1px solid var(--border2);
          background: transparent;
          color: var(--text2);
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          cursor: pointer;
          transition: all 0.14s;
        }
        .tb-btn:hover {
          background: var(--surface);
          color: var(--text);
        }
        .tb-btn.danger {
          border-color: rgba(224,82,82,0.3);
          color: var(--red);
        }
        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
            position: fixed;
            z-index: 200;
            transition: transform 0.3s ease;
          }
          .admin-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}