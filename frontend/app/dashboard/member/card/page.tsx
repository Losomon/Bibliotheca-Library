'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const Icons = {
  Download: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
  Share: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>),
}

export default function CardPage() {
  const member = {
    name: 'Jane Austen',
    cardNo: 'LIB-004821',
    type: 'Standard Member',
    joined: 'January 2024',
    expires: 'January 2025',
  }

  const handleDownload = () => {
    toast.success('Digital card downloaded')
  }

  const handleShare = () => {
    toast.info('Share card feature coming soon')
  }

  return (
    <div className="card-page">
      <div className="page-header">
        <h2>My Library Card</h2>
        <p>Your digital library card</p>
      </div>

      <div className="card-container">
        <div className="digital-card">
          <div className="card-header">
            <div className="logo">𝔅</div>
            <div className="card-type">{member.type}</div>
          </div>
          <div className="card-body">
            <div className="member-name">{member.name}</div>
            <div className="member-id">{member.cardNo}</div>
          </div>
          <div className="card-footer">
            <div>Valid until: {member.expires}</div>
            <div>Member since: {member.joined}</div>
          </div>
          <div className="card-barcode">
            <div className="barcode"></div>
            <div className="barcode-number">{member.cardNo}</div>
          </div>
        </div>

        <div className="card-actions">
          <button className="action-btn" onClick={handleDownload}>
            <Icons.Download /> Download Card
          </button>
          <button className="action-btn" onClick={handleShare}>
            <Icons.Share /> Share
          </button>
        </div>

        <div className="card-info">
          <h4>How to use your digital card</h4>
          <ul>
            <li>Show this card at the library checkout desk</li>
            <li>Scan the barcode at self-checkout kiosks</li>
            <li>Use your card number to log into the digital library</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .card-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .page-header h2 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .page-header p {
          font-size: 0.8rem;
          color: var(--muted);
        }
        .card-container {
          max-width: 500px;
          margin: 0 auto;
        }
        .digital-card {
          background: linear-gradient(135deg, #1a1208, #2c2010);
          border-radius: 16px;
          padding: 1.5rem;
          color: white;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .logo {
          font-size: 2rem;
          font-family: var(--font-display);
          color: var(--gold);
        }
        .card-type {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
        }
        .member-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
        .member-id {
          font-size: 0.8rem;
          font-family: monospace;
          opacity: 0.7;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          font-size: 0.65rem;
          opacity: 0.6;
        }
        .card-barcode {
          margin-top: 1rem;
          text-align: center;
        }
        .barcode {
          height: 40px;
          background: repeating-linear-gradient(90deg, white, white 2px, transparent 2px, transparent 4px);
          margin-bottom: 0.3rem;
        }
        .barcode-number {
          font-size: 0.7rem;
          font-family: monospace;
          letter-spacing: 2px;
        }
        .card-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .action-btn {
          flex: 1;
          padding: 0.6rem;
          background: var(--gold);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }
        .card-info {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--surface);
          border-radius: 12px;
        }
        .card-info h4 {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .card-info ul {
          padding-left: 1.2rem;
          font-size: 0.75rem;
          color: var(--muted);
        }
        .card-info li {
          margin: 0.3rem 0;
        }
      `}</style>
    </div>
  )
}