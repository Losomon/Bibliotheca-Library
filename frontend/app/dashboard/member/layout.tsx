'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

// SVG Icons
const Icons = {
  Dashboard: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
  Books: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>),
  ReadingList: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>),
  Favourites: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
  Catalogue: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
  Reservations: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
  Events: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  Digital: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>),
  Card: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>),
  Fines: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /></svg>),
  Settings: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.09a10 10 0 0 0 14.66 0z" /></svg>),
  Profile: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  Logout: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>),
  DarkMode: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>),
  LightMode: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>),
}

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const memberData = {
    name: 'Jane Austen',
    initial: 'JA',
    role: 'Standard Member',
    borrowedCount: 3,
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/login?redirect=/dashboard/member')
        return
      }
      setUser(user)
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) setSidebarCollapsed(true)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    localStorage.setItem('sidebarCollapsed', String(!sidebarCollapsed))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out successfully')
    router.push('/login')
  }

  const isActive = (path: string) => {
    if (path === '/dashboard/member' && pathname === '/dashboard/member') return true
    if (path !== '/dashboard/member' && pathname?.startsWith(path)) return true
    return false
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className={`member-dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="member-sidebar">
        <div className="sb-logo" onClick={toggleSidebar}>
          <div className="sb-logo-mark">{!sidebarCollapsed ? 'Bibliotheca' : '𝔅'}</div>
          {!sidebarCollapsed && <div className="sb-tagline">Member Portal</div>}
        </div>

        <nav className="sb-nav">
          <div className="sb-section">
            <div className="sb-section-label">Overview</div>
            <Link href="/dashboard/member" className={`sb-item ${isActive('/dashboard/member') && pathname === '/dashboard/member' ? 'active' : ''}`}>
              <Icons.Dashboard /> {!sidebarCollapsed && <>Dashboard</>}
            </Link>
            <Link href="/dashboard/member/books" className={`sb-item ${isActive('/dashboard/member/books') ? 'active' : ''}`}>
              <Icons.Books /> {!sidebarCollapsed && <>My Books <span className="sb-badge">{memberData.borrowedCount}</span></>}
            </Link>
            <Link href="/dashboard/member/reading-list" className={`sb-item ${isActive('/dashboard/member/reading-list') ? 'active' : ''}`}>
              <Icons.ReadingList /> {!sidebarCollapsed && <>Reading List</>}
            </Link>
            <Link href="/dashboard/member/favourites" className={`sb-item ${isActive('/dashboard/member/favourites') ? 'active' : ''}`}>
              <Icons.Favourites /> {!sidebarCollapsed && <>Favourites</>}
            </Link>
          </div>

          <div className="sb-section">
            <div className="sb-section-label">Library</div>
            <Link href="/dashboard/member/catalogue" className={`sb-item ${isActive('/dashboard/member/catalogue') ? 'active' : ''}`}>
              <Icons.Catalogue /> {!sidebarCollapsed && <>Catalogue</>}
            </Link>
            <Link href="/dashboard/member/reservations" className={`sb-item ${isActive('/dashboard/member/reservations') ? 'active' : ''}`}>
              <Icons.Reservations /> {!sidebarCollapsed && <>Reservations <span className="sb-badge">1</span></>}
            </Link>
            <Link href="/dashboard/member/events" className={`sb-item ${isActive('/dashboard/member/events') ? 'active' : ''}`}>
              <Icons.Events /> {!sidebarCollapsed && <>Events</>}
            </Link>
            <Link href="/dashboard/member/digital" className={`sb-item ${isActive('/dashboard/member/digital') ? 'active' : ''}`}>
              <Icons.Digital /> {!sidebarCollapsed && <>Digital Library</>}
            </Link>
          </div>

          <div className="sb-section">
            <div className="sb-section-label">Account</div>
            <Link href="/dashboard/member/card" className={`sb-item ${isActive('/dashboard/member/card') ? 'active' : ''}`}>
              <Icons.Card /> {!sidebarCollapsed && <>My Card</>}
            </Link>
            <Link href="/dashboard/member/fines" className={`sb-item ${isActive('/dashboard/member/fines') ? 'active' : ''}`}>
              <Icons.Fines /> {!sidebarCollapsed && <>Fines & Fees</>}
            </Link>
            <Link href="/dashboard/member/settings" className={`sb-item ${isActive('/dashboard/member/settings') ? 'active' : ''}`}>
              <Icons.Settings /> {!sidebarCollapsed && <>Settings</>}
            </Link>
            <Link href="/dashboard/member/profile" className={`sb-item ${isActive('/dashboard/member/profile') ? 'active' : ''}`}>
              <Icons.Profile /> {!sidebarCollapsed && <>Profile</>}
            </Link>
          </div>
        </nav>

        <div className="sb-avatar-area">
          <div className="avatar">{memberData.initial}</div>
          {!sidebarCollapsed && (
            <div className="avatar-info">
              <div className="avatar-name">{memberData.name}</div>
              <div className="avatar-role">{memberData.role}</div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            <Icons.Logout />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="member-main">
        <div className="topbar">
          <div className="topbar-search">
            <span className="search-icon"><Icons.Dashboard /></span>
            <input type="text" placeholder="Search titles, authors, genres…" />
          </div>
          <div className="topbar-right">
            <span className="topbar-date">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <button className="icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <Icons.LightMode /> : <Icons.DarkMode />}
            </button>
            <button className="icon-btn">🔔</button>
          </div>
        </div>
        <div className="content-area">
          {children}
        </div>
      </main>

      <style jsx>{`
        .member-dashboard {
          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          display: flex;
          overflow: hidden;
        }

        /* Sidebar */
        .member-sidebar {
          width: 260px;
          min-height: 100vh;
          background: var(--ink);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 100;
          overflow-y: auto;
          transition: width 0.3s ease;
        }
        .sidebar-collapsed .member-sidebar {
          width: 70px;
        }
        .sb-logo {
          padding: 1.2rem 1.2rem 1rem;
          border-bottom: 1px solid rgba(184,134,11,0.15);
          cursor: pointer;
        }
        .sb-logo-mark {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--gold);
        }
        .sb-tagline {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.25);
          margin-top: 0.2rem;
        }
        .sb-section {
          padding: 1rem 0.8rem 0.2rem;
        }
        .sb-section-label {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.2);
          padding: 0 0.5rem;
          margin-bottom: 0.3rem;
        }
        .sb-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.5rem 0.7rem;
          border-radius: 4px;
          cursor: pointer;
          color: rgba(245,240,232,0.5);
          font-size: 0.8rem;
          transition: all 0.18s;
          text-decoration: none;
          margin-bottom: 2px;
          position: relative;
        }
        .sb-item:hover {
          background: rgba(245,240,232,0.06);
          color: rgba(245,240,232,0.85);
        }
        .sb-item.active {
          background: rgba(184,134,11,0.12);
          color: var(--gold);
          font-weight: 500;
        }
        .sb-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 2px;
          background: var(--gold);
          border-radius: 2px;
        }
        .sb-badge {
          margin-left: auto;
          background: var(--rust);
          color: #fff;
          font-size: 0.55rem;
          padding: 1px 5px;
          border-radius: 10px;
        }
        .sb-avatar-area {
          margin-top: auto;
          padding: 1rem 1.2rem;
          border-top: 1px solid rgba(184,134,11,0.12);
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--rust), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
        }
        .avatar-info {
          flex: 1;
        }
        .avatar-name {
          font-size: 0.8rem;
          color: rgba(245,240,232,0.8);
          font-weight: 500;
        }
        .avatar-role {
          font-size: 0.65rem;
          color: rgba(245,240,232,0.3);
        }
        .logout-btn {
          background: none;
          border: none;
          color: rgba(245,240,232,0.4);
          cursor: pointer;
        }

        /* Main Content */
        .member-main {
          margin-left: 260px;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100vh;
        }
        .sidebar-collapsed .member-main {
          margin-left: 70px;
        }
        .topbar {
          height: 60px;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          gap: 1rem;
          flex-shrink: 0;
        }
        .topbar-search {
          flex: 1;
          max-width: 400px;
          position: relative;
        }
        .topbar-search input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2rem;
          border: 1px solid var(--border);
          border-radius: 30px;
          background: var(--bg);
          font-size: 0.8rem;
          outline: none;
        }
        .search-icon {
          position: absolute;
          left: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: auto;
        }
        .topbar-date {
          font-size: 0.75rem;
          color: var(--muted);
        }
        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .content-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .member-sidebar {
            transform: translateX(-100%);
            position: fixed;
            z-index: 200;
            transition: transform 0.3s ease;
          }
          .member-main {
            margin-left: 0;
          }
          .sidebar-collapsed .member-sidebar {
            transform: translateX(0);
            width: 260px;
          }
        }
      `}</style>
    </div>
  )
}