'use client'

import { useState } from 'react'
import { toast } from 'sonner'

// SVG Icons
const Icons = {
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Users: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  AI: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 0 1 10 10c0 4.5-3 8-7 9v-4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  Book: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Trending: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
}

interface ReportCard {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

interface MonthlyData {
  month: string
  borrowings: number
  members: number
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isGenerating, setIsGenerating] = useState(false)

  const [borrowingData] = useState<MonthlyData[]>([
    {
        month: 'May 2025', borrowings: 2841,
        members: 0
    },
    {
        month: 'Aug 2025', borrowings: 3102,
        members: 0
    },
    {
        month: 'Nov 2025', borrowings: 3541,
        members: 0
    },
    {
        month: 'Feb 2026', borrowings: 3890,
        members: 0
    },
    {
        month: 'Apr 2026', borrowings: 4210,
        members: 0
    },
  ])

  const [membershipData] = useState<MonthlyData[]>([
    {
        month: 'January', members: 12324,
        borrowings: 0
    },
    {
        month: 'February', members: 12491,
        borrowings: 0
    },
    {
        month: 'March', members: 12682,
        borrowings: 0
    },
    {
        month: 'April (now)', members: 12847,
        borrowings: 0
    },
  ])

  const reportCards: ReportCard[] = [
    { id: '1', title: 'Monthly Summary', description: 'Borrowings, returns, fines, and membership stats for April 2026', icon: '📊', color: 'var(--blue)' },
    { id: '2', title: 'Overdue Report', description: 'Full list of overdue items with member details and fine totals', icon: '⚠️', color: 'var(--red)' },
    { id: '3', title: 'Financial Report', description: 'Revenue from fines, purchases, and membership fees — YTD', icon: '💰', color: 'var(--green)' },
    { id: '4', title: 'AI Usage Report', description: 'Query volume, response times, topics, and user satisfaction', icon: '🤖', color: 'var(--purple)' },
    { id: '5', title: 'Catalogue Analysis', description: 'Most borrowed, least popular, genre trends, and acquisition gaps', icon: '📚', color: 'var(--gold)' },
    { id: '6', title: 'Membership Growth', description: 'Registration trends, churn, upgrade patterns, and demographics', icon: '👥', color: 'var(--amber)' },
  ]

  const maxBorrowing = Math.max(...borrowingData.map(d => d.borrowings))
  const maxMembership = Math.max(...membershipData.map(d => d.members))

  const handleGenerateReport = (reportTitle: string) => {
    setIsGenerating(true)
    setTimeout(() => {
      toast.success(`${reportTitle} generated and downloaded`)
      setIsGenerating(false)
    }, 1500)
  }

  const handleExportAll = () => {
    toast.success('All reports exported to ZIP archive')
  }

  return (
    <div className="reports-page">
      {/* Header with Export */}
      <div className="reports-header">
        <div className="header-info">
          <h2>Reports Dashboard</h2>
          <p>Generate and download library analytics reports</p>
        </div>
        <div className="period-selector">
          <button className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`} onClick={() => setSelectedPeriod('month')}>
            <Icons.Calendar /> This Month
          </button>
          <button className={`period-btn ${selectedPeriod === 'quarter' ? 'active' : ''}`} onClick={() => setSelectedPeriod('quarter')}>
            <Icons.Calendar /> This Quarter
          </button>
          <button className={`period-btn ${selectedPeriod === 'year' ? 'active' : ''}`} onClick={() => setSelectedPeriod('year')}>
            <Icons.Calendar /> This Year
          </button>
          <button className="export-all-btn" onClick={handleExportAll}>
            <Icons.Download /> Export All
          </button>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="reports-grid">
        {reportCards.map(report => (
          <div key={report.id} className="report-card" onClick={() => handleGenerateReport(report.title)}>
            <div className="report-icon" style={{ background: `${report.color}15`, color: report.color }}>
              {report.icon}
            </div>
            <div className="report-info">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
            </div>
            <button className="report-btn">
              <Icons.Download /> Generate
            </button>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Borrowing Trend Chart */}
        <div className="chart-panel">
          <div className="chart-header">
            <h3>Borrowing Trend — 12 Months</h3>
            <Icons.Trending />
          </div>
          <div className="chart-body">
            {borrowingData.map((item, idx) => {
              const percentage = (item.borrowings / maxBorrowing) * 100
              const barColor = item.month.includes('Nov') || item.month.includes('Feb') || item.month.includes('Apr') ? 'var(--gold)' : 'var(--blue)'
              return (
                <div key={idx} className="chart-bar">
                  <div className="bar-label">
                    <span>{item.month}</span>
                    <span className="bar-value">{item.borrowings.toLocaleString()}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${percentage}%`, background: barColor }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Membership Growth Chart */}
        <div className="chart-panel">
          <div className="chart-header">
            <h3>Membership Growth — 2026</h3>
            <Icons.Users />
          </div>
          <div className="chart-body">
            {membershipData.map((item, idx) => {
              const percentage = (item.members / maxMembership) * 100
              const barColor = item.month === 'April (now)' ? 'var(--gold)' : 'var(--purple)'
              return (
                <div key={idx} className="chart-bar">
                  <div className="bar-label">
                    <span>{item.month}</span>
                    <span className="bar-value">{item.members.toLocaleString()}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${percentage}%`, background: barColor }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Generating report...</p>
        </div>
      )}

      <style jsx>{`
        .reports-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Header */
        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .header-info h2 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .header-info p {
          font-size: 0.7rem;
          color: var(--text3);
        }
        .period-selector {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .period-btn {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text2);
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.14s;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .period-btn:hover {
          background: var(--surface2);
          color: var(--text);
        }
        .period-btn.active {
          background: var(--gold);
          color: #0e0e0f;
          border-color: var(--gold);
        }
        .export-all-btn {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--gold);
          background: transparent;
          color: var(--gold);
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.14s;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .export-all-btn:hover {
          background: var(--gold);
          color: #0e0e0f;
        }

        /* Reports Grid */
        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
        }
        .report-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .report-card:hover {
          transform: translateY(-2px);
          border-color: var(--gold);
          box-shadow: var(--shadow);
        }
        .report-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .report-info {
          flex: 1;
        }
        .report-info h3 {
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .report-info p {
          font-size: 0.68rem;
          color: var(--text3);
          line-height: 1.4;
        }
        .report-btn {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text2);
          font-size: 0.65rem;
          cursor: pointer;
          transition: all 0.14s;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          white-space: nowrap;
        }
        .report-btn:hover {
          background: var(--surface2);
          color: var(--text);
          border-color: var(--gold);
        }

        /* Charts Grid */
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .chart-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .chart-header {
          padding: 1rem 1.2rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .chart-header h3 {
          font-size: 0.8rem;
          font-weight: 600;
        }
        .chart-body {
          padding: 1rem 1.2rem;
        }
        .chart-bar {
          margin-bottom: 1rem;
        }
        .chart-bar:last-child {
          margin-bottom: 0;
        }
        .bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          margin-bottom: 0.3rem;
        }
        .bar-label span:first-child {
          color: var(--text2);
        }
        .bar-value {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text);
        }
        .bar-track {
          height: 6px;
          background: var(--bg3);
          border-radius: 3px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s ease;
        }

        /* Loading Overlay */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid var(--border);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-overlay p {
          color: var(--text);
          font-size: 0.85rem;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .reports-grid {
            grid-template-columns: 1fr;
          }
          .charts-grid {
            grid-template-columns: 1fr;
          }
          .reports-header {
            flex-direction: column;
          }
          .period-selector {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  )
}