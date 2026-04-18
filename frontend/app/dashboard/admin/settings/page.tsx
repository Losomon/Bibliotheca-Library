'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

// SVG Icons (reused from main admin)
const Icons = {
  Dashboard: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Members: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Catalogue: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Transactions: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10h18M6 14h4M13 14h4M3 6h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
    </svg>
  ),
  Overdue: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Fines: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Reservations: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
    </svg>
  ),
  Acquisitions: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Staff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Reports: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  AILogs: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 0 1 10 10c0 4.5-3 8-7 9v-4" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4M12 18v4" />
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.09a10 10 0 0 0 14.66 0z" />
    </svg>
  ),
  Save: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Building: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <path d="M8 20h8" />
    </svg>
  ),
  Bot: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Database: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <ellipse cx="12" cy="19" rx="9" ry="3" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Logout: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  DarkMode: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  LightMode: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
    </svg>
  ),
  Alert: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

interface SettingSection {
  id: string
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export default function AdminSettings() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [saving, setSaving] = useState(false)

  // Settings state
  const [libName, setLibName] = useState('Bibliotheca Public Library')
  const [libEmail, setLibEmail] = useState('admin@bibliotheca.org')
  const [libPhone, setLibPhone] = useState('+254 700 000 000')
  const [libAddress, setLibAddress] = useState('123 Mombasa Road\nNairobi, Kenya')
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiApiKey, setAiApiKey] = useState('')
  const [aiResponseLimit, setAiResponseLimit] = useState('500')
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [overdueReminderDays, setOverdueReminderDays] = useState('3')
  const [autoSuspendDays, setAutoSuspendDays] = useState('30')
  const [require2FA, setRequire2FA] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('60')
  const [backupFrequency, setBackupFrequency] = useState('daily')
  const [dataRetention, setDataRetention] = useState('5')
  const [defaultLanguage, setDefaultLanguage] = useState('en')
  const [timezone, setTimezone] = useState('Africa/Nairobi')

  const supabase = createClient()
  const router = useRouter()

  // Authentication Check
  useEffect(() => {
    const checkAdmin = async () => {
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
      setLoading(false)
    }

    checkAdmin()
  }, [])

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Dark Mode
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

  const handleSave = async () => {
    setSaving(true)
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setSaving(false)
    toast.success('Settings saved successfully')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out successfully')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading settings...</p>
      </div>
    )
  }

  const settingsSections: SettingSection[] = [
    {
      id: 'library',
      title: 'Library Profile',
      icon: <Icons.Building />,
      children: (
        <div className="settings-form">
          <div className="form-group">
            <label>Library Name</label>
            <input
              type="text"
              value={libName}
              onChange={e => setLibName(e.target.value)}
              placeholder="Enter library name"
            />
          </div>
          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              value={libEmail}
              onChange={e => setLibEmail(e.target.value)}
              placeholder="admin@library.org"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={libPhone}
              onChange={e => setLibPhone(e.target.value)}
              placeholder="+254 XXX XXX XXX"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              value={libAddress}
              onChange={e => setLibAddress(e.target.value)}
              rows="3"
              placeholder="Library address"
            />
          </div>
        </div>
      )
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      icon: <Icons.Bot />,
      children: (
        <div className="settings-form">
          <div className="form-toggle">
            <div className="toggle-info">
              <strong>Enable AI Assistant</strong>
              <p>Allow members to use the AI-powered search and recommendations</p>
            </div>
            <button
              className={`toggle-switch ${aiEnabled ? 'on' : ''}`}
              onClick={() => setAiEnabled(!aiEnabled)}
            >
              <span className="toggle-knob"></span>
            </button>
          </div>
          <div className="form-group">
            <label>API Key (OpenAI/Anthropic)</label>
            <input
              type="password"
              value={aiApiKey}
              onChange={e => setAiApiKey(e.target.value)}
              placeholder="sk-..."
            />
            <span className="form-hint">Your API key is stored securely and never shared</span>
          </div>
          <div className="form-group">
            <label>Max Response Tokens</label>
            <input
              type="number"
              value={aiResponseLimit}
              onChange={e => setAiResponseLimit(e.target.value)}
              min="100"
              max="2000"
            />
            <span className="form-hint">Maximum length of AI-generated responses</span>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Icons.Bell />,
      children: (
        <div className="settings-form">
          <div className="form-toggle">
            <div className="toggle-info">
              <strong>Email Notifications</strong>
              <p>Send automated emails for overdue items, reservations, and announcements</p>
            </div>
            <button
              className={`toggle-switch ${emailNotifs ? 'on' : ''}`}
              onClick={() => setEmailNotifs(!emailNotifs)}
            >
              <span className="toggle-knob"></span>
            </button>
          </div>
          <div className="form-group">
            <label>Overdue Reminder (days before due)</label>
            <input
              type="number"
              value={overdueReminderDays}
              onChange={e => setOverdueReminderDays(e.target.value)}
              min="1"
              max="14"
            />
            <span className="form-hint">Send reminder email this many days before due date</span>
          </div>
          <div className="form-group">
            <label>Auto-suspend after (days overdue)</label>
            <input
              type="number"
              value={autoSuspendDays}
              onChange={e => setAutoSuspendDays(e.target.value)}
              min="7"
              max="90"
            />
            <span className="form-hint">Automatically suspend accounts exceeding this limit</span>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Icons.Shield />,
      children: (
        <div className="settings-form">
          <div className="form-toggle">
            <div className="toggle-info">
              <strong>Require Two-Factor Auth</strong>
              <p>Force all staff accounts to use 2FA for login</p>
            </div>
            <button
              className={`toggle-switch ${require2FA ? 'on' : ''}`}
              onClick={() => setRequire2FA(!require2FA)}
            >
              <span className="toggle-knob"></span>
            </button>
          </div>
          <div className="form-group">
            <label>Session Timeout (minutes)</label>
            <input
              type="number"
              value={sessionTimeout}
              onChange={e => setSessionTimeout(e.target.value)}
              min="15"
              max="120"
            />
            <span className="form-hint">Auto-logout after inactivity</span>
          </div>
        </div>
      )
    },
    {
      id: 'backup',
      title: 'Data & Backup',
      icon: <Icons.Database />,
      children: (
        <div className="settings-form">
          <div className="form-group">
            <label>Backup Frequency</label>
            <select
              value={backupFrequency}
              onChange={e => setBackupFrequency(e.target.value)}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <span className="form-hint">How often the system backs up to secure storage</span>
          </div>
          <div className="form-group">
            <label>Data Retention (years)</label>
            <input
              type="number"
              value={dataRetention}
              onChange={e => setDataRetention(e.target.value)}
              min="1"
              max="10"
            />
            <span className="form-hint">Keep transaction history for this many years</span>
          </div>
          <div className="form-action">
            <button className="act-btn warn" onClick={() => toast.info('Manual backup initiated...')}>
              <Icons.Database /> Run Manual Backup Now
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <Icons.Globe />,
      children: (
        <div className="settings-form">
          <div className="form-group">
            <label>Default Language</label>
            <select
              value={defaultLanguage}
              onChange={e => setDefaultLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
            >
              <option value="Africa/Nairobi">East Africa Time (EAT)</option>
              <option value="Africa/Johannesburg">South Africa Standard Time (SAST)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
            </select>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="admin-dashboard">
      {/* Top Navigation Bar */}
      <div className="page-nav">
        <a href="/dashboard/admin">
          <Icons.Dashboard /> Admin
        </a>
        <a href="#" className="current">
          <Icons.Settings /> Settings
        </a>
        <a href="/dashboard/librarian">
          <Icons.Catalogue /> Librarian
        </a>
        <a href="/dashboard">
          <Icons.Dashboard /> Public
        </a>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <Icons.LightMode /> : <Icons.DarkMode />}
        </button>
      </div>

      {/* Sidebar */}
      <nav className="admin-sidebar">
        <div className="sb-head">
          <div className="sb-logo">BIBLIOTHECA</div>
          <div className="sb-role">// System Settings</div>
        </div>

        <div className="sb-sec">
          <div className="sb-sec-lbl">Core</div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin')}>
            <Icons.Dashboard /> Dashboard
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/members')}>
            <Icons.Members /> Members
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/catalogue')}>
            <Icons.Catalogue /> Catalogue
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/transactions')}>
            <Icons.Transactions /> Transactions
          </div>
        </div>

        <div className="sb-sec">
          <div className="sb-sec-lbl">Operations</div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/overdue')}>
            <Icons.Overdue /> Overdue
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/fines')}>
            <Icons.Fines /> Fines
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/reservations')}>
            <Icons.Reservations /> Reservations
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/acquisitions')}>
            <Icons.Acquisitions /> Acquisitions
          </div>
        </div>

        <div className="sb-sec">
          <div className="sb-sec-lbl">System</div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/staff')}>
            <Icons.Staff /> Staff Mgmt
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/reports')}>
            <Icons.Reports /> Reports
          </div>
          <div className="sb-item" onClick={() => router.push('/dashboard/admin/ai-logs')}>
            <Icons.AILogs /> AI Logs
          </div>
          <div className="sb-item active">
            <Icons.Settings /> Settings
          </div>
        </div>

        <div className="sb-bottom">
          <div className="admin-tag">
            <div className="admin-dot"></div>
            <div className="admin-name">Admin · {user?.email?.split('@')[0] || 'Admin'}</div>
            <button className="logout-btn" onClick={handleLogout}>
              <Icons.Logout />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="admin-main">
        <div className="topbar">
          <div className="tb-title">System Settings</div>
          <div className="tb-time">{currentTime}</div>
          <button className="tb-btn" onClick={handleSave} disabled={saving}>
            <Icons.Save /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button className="tb-btn danger" onClick={() => toast.info('2 active alerts')}>
            <Icons.Alert /> 2 Alerts
          </button>
        </div>

        <div className="admin-content">
          {/* Settings Sections */}
          <div className="settings-container">
            {settingsSections.map(section => (
              <div key={section.id} className="panel">
                <div className="panel-head">
                  <div className="panel-title">
                    {section.icon} {section.title}
                  </div>
                </div>
                <div className="panel-body">
                  {section.children}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
