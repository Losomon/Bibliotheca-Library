'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

// ============ SVG ICONS ============
const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Books: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  ReadingList: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Favourites: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Catalogue: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Reservations: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Events: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Digital: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Card: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  Fines: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.09a10 10 0 0 0 14.66 0z" />
    </svg>
  ),
  Logout: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Profile: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  AI: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 0 1 10 10c0 4.5-3 8-7 9v-4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  DarkMode: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  LightMode: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Renew: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  BookIcon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Clear: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Floating: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Add: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
}

// Types
interface Book {
  id: string
  title: string
  author: string
  dueDate?: string
  status: 'reading' | 'reserved' | 'overdue'
  spineColor: string
  isReserved?: boolean
}

interface Activity {
  id: number
  action: string
  item: string
  author?: string
  time: string
  dotColor: string
}

interface CalendarDay {
  day: number
  currentMonth: boolean
  isToday: boolean
  hasEvent: boolean
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'due' | 'reserved' | 'return' | 'system'
}

interface Message {
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function MemberDashboard() {
  // ============ STATE MANAGEMENT ============
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [showRenewModal, setShowRenewModal] = useState(false)
  const [renewBook, setRenewBook] = useState<Book | null>(null)
  const [showReserveModal, setShowReserveModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarEvents, setCalendarEvents] = useState<number[]>([])
  
  // AI Chat State
  const [aiPanelOpen, setAiPanelOpen] = useState(true)
  const [aiFloatingMode, setAiFloatingMode] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()
  const router = useRouter()

  // ============ MEMBER DATA ============
  const [memberData, setMemberData] = useState({
    name: 'Jane Austen',
    initial: 'JA',
    email: 'jane@example.com',
    role: 'Standard Member',
    borrowedCount: 3,
    maxBorrow: 5,
    dueSoon: 2,
    booksReadThisYear: 47,
    fines: 0,
    phone: '+254 700 000 000',
    joinDate: 'January 2024'
  })

  const [books, setBooks] = useState<Book[]>([
    { id: '1', title: 'Things Fall Apart', author: 'Chinua Achebe', dueDate: 'Apr 20, 2026', status: 'reading', spineColor: 'linear-gradient(160deg,#4a2c0a,#8b3a1a)' },
    { id: '2', title: 'Americanah', author: 'Chimamanda Ngozi Adichie', dueDate: 'Apr 22, 2026', status: 'reading', spineColor: 'linear-gradient(160deg,#1a2c4a,#2c4a6a)' },
    { id: '3', title: 'Petals of Blood', author: 'Ngũgĩ wa Thiong\'o', dueDate: 'May 1, 2026', status: 'reading', spineColor: 'linear-gradient(160deg,#2c4a1a,#3d5c2a)' },
    { id: '4', title: 'Half of a Yellow Sun', author: 'Chimamanda N. Adichie', status: 'reserved', spineColor: 'linear-gradient(160deg,#3a3a3a,#555)', isReserved: true },
  ])

  const [activities] = useState<Activity[]>([
    { id: 1, action: 'Borrowed', item: 'Things Fall Apart', author: 'Chinua Achebe', time: '2 days ago', dotColor: 'var(--sage)' },
    { id: 2, action: 'Reserved', item: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', time: '4 days ago', dotColor: 'var(--gold)' },
    { id: 3, action: 'Returned', item: 'Season of Migration to the North', author: 'Tayeb Salih', time: '1 week ago', dotColor: 'var(--rust)' },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Book Due Soon', message: '"Things Fall Apart" is due in 3 days', time: '2 hours ago', read: false, type: 'due' },
    { id: '2', title: 'Reservation Ready', message: '"Half of a Yellow Sun" is ready for pickup', time: '1 day ago', read: false, type: 'reserved' },
  ])

  // ============ AUTHENTICATION CHECK ============
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/login?redirect=/dashboard/member')
        return
      }
      setUser(user)
      setLoading(false)
    }
    checkAuth()
  }, [])

  // ============ DARK MODE ============
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
      toast.success('Dark mode enabled')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
      toast.success('Light mode enabled')
    }
  }

  // ============ RESPONSIVE SIDEBAR ============
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) setSidebarCollapsed(true)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    localStorage.setItem('sidebarCollapsed', String(!sidebarCollapsed))
  }

  // ============ NAVIGATION ============
  const handlePageChange = (page: string) => {
    setActivePage(page)
    setShowProfileDropdown(false)
    setShowNotifications(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    toast.info(`Navigating to ${page}`)
  }

  // ============ SEARCH ============
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 1) {
      const results = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  // ============ BOOK ACTIONS ============
  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setShowBookModal(true)
  }

  const handleRenewBook = (book: Book) => {
    setRenewBook(book)
    setShowRenewModal(true)
  }

  const confirmRenew = () => {
    toast.success(`${renewBook?.title} renewed successfully!`)
    setShowRenewModal(false)
    setRenewBook(null)
  }

  const getNewDueDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 21)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const confirmReserve = () => {
    toast.success('Book reserved successfully!')
    setShowReserveModal(false)
  }

  // ============ NOTIFICATIONS ============
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // ============ CALENDAR ============
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    
    const days: CalendarDay[] = []
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, currentMonth: false, isToday: false, hasEvent: false })
    }
    
    const today = new Date()
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ 
        day: i, 
        currentMonth: true,
        isToday: isCurrentMonth && i === today.getDate(),
        hasEvent: calendarEvents.includes(i)
      })
    }
    
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false, isToday: false, hasEvent: false })
    }
    
    return days
  }

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1))
  }

  // ============ AI CHAT ============
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'ai',
        content: `Welcome back, ${memberData.name.split(' ')[0]}! I'm your personal librarian assistant. How can I help you today?`,
        timestamp: new Date()
      }])
    }
  }, [memberData.name])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_history_member', JSON.stringify(messages))
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isAiLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsAiLoading(true)

    setTimeout(() => {
      let response = "That's a great question! "
      if (userMessage.content.toLowerCase().includes('recommend')) {
        response = "Based on your reading history, I'd recommend 'The River Between' by Ngũgĩ wa Thiong'o."
      } else if (userMessage.content.toLowerCase().includes('achebe')) {
        response = "Chinua Achebe is often called the father of African literature."
      } else {
        response = "I'm here to help with book recommendations, library policies, and reading suggestions!"
      }
      setMessages(prev => [...prev, { role: 'ai', content: response, timestamp: new Date() }])
      setIsAiLoading(false)
    }, 1000)
  }

  const clearChat = () => {
    setMessages([{
      role: 'ai',
      content: "Chat cleared! How can I help you today?",
      timestamp: new Date()
    }])
    localStorage.removeItem('chat_history_member')
    toast.success('Chat history cleared')
  }

  const toggleAIPanel = () => {
    setAiPanelOpen(!aiPanelOpen)
    if (!aiPanelOpen && isMobile) setAiFloatingMode(true)
  }

  // ============ GREETING ============
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  // ============ LOGOUT ============
  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('chat_history_member')
    toast.success('Logged out successfully')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your library...</p>
      </div>
    )
  }

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      
      {/* ============ SIDEBAR ============ */}
      <aside className="sidebar">
        <div className="sb-logo" onClick={toggleSidebar}>
          <div className="sb-logo-mark">
            {!sidebarCollapsed ? 'Bibliotheca' : '𝔅'}
          </div>
          {!sidebarCollapsed && <div className="sb-tagline">Member Portal</div>}
        </div>

        <nav className="sb-nav">
          <div className="sb-section">
            <div className="sb-section-label">Overview</div>
            <button className={`sb-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => handlePageChange('dashboard')}>
              <Icons.Dashboard /> {!sidebarCollapsed && <>Dashboard</>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('books')}>
              <Icons.Books /> {!sidebarCollapsed && <>My Books <span className="sb-badge">{memberData.borrowedCount}</span></>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('reading-list')}>
              <Icons.ReadingList /> {!sidebarCollapsed && <>Reading List</>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('favourites')}>
              <Icons.Favourites /> {!sidebarCollapsed && <>Favourites</>}
            </button>
          </div>

          <div className="sb-section">
            <div className="sb-section-label">Library</div>
            <button className="sb-item" onClick={() => handlePageChange('catalogue')}>
              <Icons.Catalogue /> {!sidebarCollapsed && <>Catalogue</>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('reservations')}>
              <Icons.Reservations /> {!sidebarCollapsed && <>Reservations <span className="sb-badge">1</span></>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('events')}>
              <Icons.Events /> {!sidebarCollapsed && <>Events</>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('digital')}>
              <Icons.Digital /> {!sidebarCollapsed && <>Digital Library</>}
            </button>
          </div>

          <div className="sb-section">
            <div className="sb-section-label">Account</div>
            <button className="sb-item" onClick={() => handlePageChange('card')}>
              <Icons.Card /> {!sidebarCollapsed && <>My Card</>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('fines')}>
              <Icons.Fines /> {!sidebarCollapsed && <>Fines & Fees</>}
            </button>
            <button className="sb-item" onClick={() => handlePageChange('settings')}>
              <Icons.Settings /> {!sidebarCollapsed && <>Settings</>}
            </button>
          </div>
        </nav>

        <div className="sb-avatar-area">
          <button className="avatar-trigger" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <div className="avatar">{memberData.initial}</div>
            {!sidebarCollapsed && (
              <div className="avatar-info">
                <div className="avatar-name">{memberData.name}</div>
                <div className="avatar-role">{memberData.role}</div>
              </div>
            )}
          </button>
          
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <button className="dropdown-item" onClick={() => handlePageChange('profile')}>
                <Icons.Profile /> View Profile
              </button>
              <button className="dropdown-item" onClick={() => handlePageChange('settings')}>
                <Icons.Settings /> Settings
              </button>
              <button className="dropdown-item" onClick={() => handlePageChange('card')}>
                <Icons.Card /> Library Card
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <Icons.Logout /> Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ============ MAIN CONTENT ============ */}
      <main className="main">
        <header className="topbar">
          <div className="topbar-search">
            <span className="search-icon"><Icons.Search /></span>
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search titles, authors, genres…"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(book => (
                  <button key={book.id} className="search-result-item" onClick={() => handleBookClick(book)}>
                    <strong>{book.title}</strong>
                    <span>{book.author}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="topbar-right">
            <span className="topbar-date">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            
            <button className="icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <Icons.LightMode /> : <Icons.DarkMode />}
            </button>
            
            <div className="notifications-container">
              <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
                <Icons.Bell />
                {unreadCount > 0 && <span className="dot"></span>}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <button onClick={markAllRead}>Mark all read</button>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="empty-state">No notifications</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`} onClick={() => markNotificationRead(notif.id)}>
                        <div className="notification-title">{notif.title}</div>
                        <div className="notification-message">{notif.message}</div>
                        <div className="notification-time">{notif.time}</div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            
            <button className="icon-btn ai-toggle" onClick={toggleAIPanel}>
              <Icons.AI />
            </button>
          </div>
        </header>

        <div className="content">
          {/* GREETING */}
          <div className="greeting">
            <div className="greeting-line">{getGreeting()}, {memberData.name.split(' ')[0]}. ✦</div>
            <div className="greeting-sub">
              You have <em>{memberData.dueSoon} books due soon</em> and 1 reserved title ready for pickup.
            </div>
          </div>

          {/* STATS ROW */}
          <div className="stats-row">
            <div className="stat-card gold">
              <div className="stat-icon"><Icons.Books /></div>
              <div className="stat-label">Books Borrowed</div>
              <div className="stat-num">{memberData.borrowedCount}</div>
              <div className="stat-sub">of {memberData.maxBorrow} allowed</div>
            </div>
            <div className="stat-card rust">
              <div className="stat-icon"><Icons.Calendar /></div>
              <div className="stat-label">Due Soon</div>
              <div className="stat-num">{memberData.dueSoon}</div>
              <div className="stat-sub">within 5 days</div>
            </div>
            <div className="stat-card sage">
              <div className="stat-icon"><Icons.Star /></div>
              <div className="stat-label">Books Read</div>
              <div className="stat-num">{memberData.booksReadThisYear}</div>
              <div className="stat-sub">this year</div>
            </div>
            <div className="stat-card ink">
              <div className="stat-icon"><Icons.Fines /></div>
              <div className="stat-label">Fines</div>
              <div className="stat-num">Ksh {memberData.fines}</div>
              <div className="stat-sub">All clear ✓</div>
            </div>
          </div>

          {/* CURRENT READS */}
          <div className="books-section">
            <div className="section-header">
              <div className="section-title">Currently Borrowed</div>
              <button className="section-link" onClick={() => handlePageChange('books')}>View all →</button>
            </div>
            <div className="books-grid">
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className={`book-card ${book.isReserved ? 'reserved-card' : ''}`}
                  onClick={() => handleBookClick(book)}
                  onMouseEnter={() => setHoveredBook(book.id)}
                  onMouseLeave={() => setHoveredBook(null)}
                >
                  <div className="book-spine" style={{ background: book.spineColor }}>
                    <div className="book-spine-text">{book.title}</div>
                  </div>
                  <div className="book-info">
                    <div className="book-title">{book.title}</div>
                    <div className="book-author">{book.author}</div>
                    {book.dueDate && <div className="book-due">Due: {book.dueDate}</div>}
                    {book.isReserved && <div className="book-due">Ready for pickup</div>}
                    <span className={`book-status status-${book.status}`}>
                      {book.status === 'reading' ? 'Reading' : 'Reserved'}
                    </span>
                    {book.status === 'reading' && (
                      <button className="renew-btn" onClick={(e) => { e.stopPropagation(); handleRenewBook(book); }}>
                        <Icons.Renew /> Renew
                      </button>
                    )}
                  </div>
                  {hoveredBook === book.id && (
                    <div className="book-preview">
                      <h4>{book.title}</h4>
                      <p>by {book.author}</p>
                      <button>Quick View →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="books-section">
            <div className="section-header">
              <div className="section-title">Recent Activity</div>
            </div>
            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-dot" style={{ background: activity.dotColor }}></div>
                  <div className="activity-text">
                    {activity.action} <strong>{activity.item}</strong>
                    {activity.author && ` — ${activity.author}`}
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col">
            
            {/* AI ASSISTANT PANEL */}
            {aiPanelOpen && (
              <div className={`ai-panel ${aiFloatingMode ? 'floating' : ''}`}>
                <div className="ai-header">
                  <div className="ai-orb"><Icons.AI /></div>
                  <div>
                    <div className="ai-title">Librarian AI</div>
                    <div className="ai-subtitle">Ask about books, recommendations & more</div>
                  </div>
                  <div className="ai-controls">
                    <button className="ai-control-btn" onClick={clearChat} title="Clear chat"><Icons.Clear /></button>
                    <button className="ai-control-btn" onClick={() => setAiFloatingMode(!aiFloatingMode)} title="Toggle floating mode"><Icons.Floating /></button>
                    <button className="ai-control-btn" onClick={toggleAIPanel} title="Close"><Icons.Close /></button>
                  </div>
                </div>

                <div className="ai-msgs">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`msg ${msg.role}`}>
                      <div className="msg-avatar">{msg.role === 'ai' ? '✦' : memberData.initial}</div>
                      <div className="msg-bubble">{msg.content}</div>
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="msg ai">
                      <div className="msg-avatar">✦</div>
                      <div className="msg-bubble">
                        <div className="typing-indicator">
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="ai-suggestions">
                  {['Recommend a book', 'Find African fiction', 'When is my book due?', 'Tell me about Achebe'].map((suggestion, idx) => (
                    <button key={idx} className="suggestion-chip" onClick={() => {
                      setInputMessage(suggestion)
                      setTimeout(() => sendMessage(), 100)
                    }}>
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="ai-input-row">
                  <textarea 
                    className="ai-input" 
                    rows={1}
                    placeholder="Ask your librarian anything…"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  />
                  <button className="ai-send" onClick={sendMessage} disabled={isAiLoading || !inputMessage.trim()}>
                    <Icons.Send />
                  </button>
                </div>
              </div>
            )}

            {/* FLOATING AI BUTTON */}
            {!aiPanelOpen && (
              <button className="ai-float-btn" onClick={toggleAIPanel}>
                <Icons.AI />
              </button>
            )}

            {/* QUICK ACTIONS */}
            <div className="quick-panel">
              <div className="quick-title">Quick Actions</div>
              <div className="quick-grid">
                <button className="quick-btn" onClick={() => handlePageChange('renew')}>
                  <span className="quick-icon"><Icons.Renew /></span>Renew Books
                </button>
                <button className="quick-btn" onClick={() => setShowReserveModal(true)}>
                  <span className="quick-icon"><Icons.Add /></span>Reserve Title
                </button>
                <button className="quick-btn" onClick={() => handlePageChange('card')}>
                  <span className="quick-icon"><Icons.Card /></span>My Card
                </button>
                <button className="quick-btn" onClick={() => handlePageChange('events')}>
                  <span className="quick-icon"><Icons.Calendar /></span>Events
                </button>
              </div>
            </div>

            {/* MINI CALENDAR */}
            <div className="cal-panel">
              <div className="cal-header">
                <div className="cal-month">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button className="cal-nav" onClick={() => changeMonth(-1)}>‹</button>
                  <button className="cal-nav" onClick={() => changeMonth(1)}>›</button>
                </div>
              </div>
              <div className="cal-grid">
                {weekDays.map(day => (<div key={day} className="cal-day-label">{day}</div>))}
                {getCalendarDays().map((day, idx) => (
                  <button key={idx} className={`cal-day ${!day.currentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''} ${day.hasEvent ? 'has-event' : ''}`}>
                    {day.day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOOK DETAIL MODAL */}
      {showBookModal && selectedBook && (
        <div className="modal-overlay" onClick={() => setShowBookModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedBook.title}</h2>
              <button className="modal-close" onClick={() => setShowBookModal(false)}><Icons.Close /></button>
            </div>
            <div className="modal-body">
              <p><strong>Author:</strong> {selectedBook.author}</p>
              {selectedBook.dueDate && <p><strong>Due Date:</strong> {selectedBook.dueDate}</p>}
              <p><strong>Status:</strong> {selectedBook.status === 'reading' ? 'Currently Reading' : 'Reserved'}</p>
              <div className="modal-actions">
                {selectedBook.status === 'reading' && (
                  <button className="modal-btn primary" onClick={() => { setShowBookModal(false); handleRenewBook(selectedBook); }}>
                    <Icons.Renew /> Renew Book
                  </button>
                )}
                <button className="modal-btn secondary" onClick={() => { toast.success('Added to reading list'); setShowBookModal(false); }}>
                  <Icons.Add /> Add to Reading List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENEW MODAL */}
      {showRenewModal && renewBook && (
        <div className="modal-overlay" onClick={() => setShowRenewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Renew Book</h2>
              <button className="modal-close" onClick={() => setShowRenewModal(false)}><Icons.Close /></button>
            </div>
            <div className="modal-body">
              <p>Renew <strong>{renewBook.title}</strong>?</p>
              <p>New due date: <strong>{getNewDueDate()}</strong></p>
              <div className="modal-actions">
                <button className="modal-btn primary" onClick={confirmRenew}>Confirm Renewal</button>
                <button className="modal-btn secondary" onClick={() => setShowRenewModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESERVE MODAL */}
      {showReserveModal && (
        <div className="modal-overlay" onClick={() => setShowReserveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reserve a Book</h2>
              <button className="modal-close" onClick={() => setShowReserveModal(false)}><Icons.Close /></button>
            </div>
            <div className="modal-body">
              <input type="text" placeholder="Search for a book to reserve..." className="reserve-search" />
              <div className="modal-actions">
                <button className="modal-btn primary" onClick={confirmReserve}>Confirm Reservation</button>
                <button className="modal-btn secondary" onClick={() => setShowReserveModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}