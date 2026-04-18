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
  Delete: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Export: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
}

interface Book {
  id: number
  title: string
  author: string
  isbn: string
  genre: string
  copies: number
  available: number
  price: number
  year: number
  dewey: string
  coverColor: string
}

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGenre, setFilterGenre] = useState('all')
  const [filterAvailability, setFilterAvailability] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const [books] = useState<Book[]>([
    { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '978-0385474542', genre: 'African Literature', copies: 8, available: 4, price: 1200, year: 1958, dewey: 'PR9387', coverColor: '#4a2c0a' },
    { id: 2, title: 'Americanah', author: 'Chimamanda Ngozi Adichie', isbn: '978-0307455925', genre: 'African Literature', copies: 5, available: 2, price: 1500, year: 2013, dewey: 'PS3601', coverColor: '#1a2c4a' },
    { id: 3, title: 'Petals of Blood', author: 'Ngũgĩ wa Thiong\'o', isbn: '978-0142007020', genre: 'African Literature', copies: 5, available: 5, price: 1100, year: 1977, dewey: 'PR9381', coverColor: '#2a4a1a' },
    { id: 4, title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', isbn: '978-1400095209', genre: 'Fiction', copies: 4, available: 0, price: 1400, year: 2006, dewey: 'PS3601', coverColor: '#4a2a0a' },
    { id: 5, title: 'Born a Crime', author: 'Trevor Noah', isbn: '978-0399588174', genre: 'Memoir', copies: 3, available: 1, price: 1600, year: 2016, dewey: 'CT1788', coverColor: '#2a1a1a' },
    { id: 6, title: 'The Famished Road', author: 'Ben Okri', isbn: '978-0385425131', genre: 'Fiction', copies: 3, available: 2, price: 1300, year: 1991, dewey: 'PR9387', coverColor: '#1a2a1a' },
    { id: 7, title: 'Homegoing', author: 'Yaa Gyasi', isbn: '978-1101971062', genre: 'African Literature', copies: 4, available: 3, price: 1350, year: 2016, dewey: 'PS3607', coverColor: '#2a1a3a' },
    { id: 8, title: 'Weep Not, Child', author: 'Ngũgĩ wa Thiong\'o', isbn: '978-0143106692', genre: 'African Literature', copies: 4, available: 3, price: 900, year: 1964, dewey: 'PR9381', coverColor: '#1a1a4a' },
    { id: 9, title: 'The River and the Source', author: 'Margaret Ogola', isbn: '978-9966888976', genre: 'African Literature', copies: 3, available: 2, price: 950, year: 1994, dewey: 'PR9381', coverColor: '#3a2a0a' },
    { id: 10, title: 'A Grain of Wheat', author: 'Ngũgĩ wa Thiong\'o', isbn: '978-0143106694', genre: 'Fiction', copies: 3, available: 2, price: 1050, year: 1967, dewey: 'PR9381', coverColor: '#3a2a1a' },
    { id: 11, title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', isbn: '978-1616953751', genre: 'Fiction', copies: 5, available: 3, price: 1200, year: 2003, dewey: 'PS3601', coverColor: '#3a1a4a' },
    { id: 12, title: 'Anansi Boys', author: 'Neil Gaiman', isbn: '978-0060515195', genre: 'Fiction', copies: 5, available: 4, price: 1400, year: 2005, dewey: 'PR6057', coverColor: '#1a3a2a' },
  ])

  const stats = {
    total: 84210,
    available: 80789,
    borrowed: 3421,
    newThisMonth: 234,
  }

  const genres = [
    { name: 'All', count: stats.total },
    { name: 'African Literature', count: 18420 },
    { name: 'Fiction', count: 10800 },
    { name: 'History', count: 14300 },
    { name: 'Science', count: 12100 },
    { name: 'Children', count: 9200 },
    { name: 'Business', count: 6800 },
  ]

  const getAvailabilityStatus = (available: number, copies: number) => {
    if (available === 0) return { text: 'Reserved', class: 'pill pr', color: 'var(--red)' }
    if (available <= 2) return { text: 'Limited', class: 'pill pa', color: 'var(--amber)' }
    return { text: 'Available', class: 'pill pg', color: 'var(--green)' }
  }

  const getAvailabilityText = (available: number, copies: number) => {
    if (available === 0) return '0 available'
    if (available <= 2) return `${available} left`
    return `${available}/${copies} available`
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.isbn.includes(searchTerm)
    const matchesGenre = filterGenre === 'all' || book.genre === filterGenre
    const matchesAvailability = filterAvailability === 'all' || 
      (filterAvailability === 'available' && book.available > 0) ||
      (filterAvailability === 'limited' && book.available > 0 && book.available <= 2) ||
      (filterAvailability === 'unavailable' && book.available === 0)
    return matchesSearch && matchesGenre && matchesAvailability
  })

  const handleEditBook = (book: Book) => {
    setSelectedBook(book)
    setShowEditModal(true)
  }

  const handleDeleteBook = (id: number, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      toast.success(`"${title}" deleted`)
    }
  }

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Book added to catalogue!')
    setShowAddModal(false)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`${selectedBook?.title} updated`)
    setShowEditModal(false)
  }

  const handleExport = () => {
    toast.success('Catalogue exported to CSV')
  }

  return (
    <div className="catalogue-page">
      {/* Stats Strip */}
      <div className="stat-strip">
        <div className="stat-box g">
          <div className="stat-lbl">Total Titles</div>
          <div className="stat-num gold">{stats.total.toLocaleString()}</div>
          <div className="stat-change">across all genres</div>
        </div>
        <div className="stat-box gr">
          <div className="stat-lbl">Available</div>
          <div className="stat-num green">{stats.available.toLocaleString()}</div>
          <div className="stat-change">95.9% on shelf</div>
        </div>
        <div className="stat-box b">
          <div className="stat-lbl">Borrowed Out</div>
          <div className="stat-num blue">{stats.borrowed.toLocaleString()}</div>
          <div className="stat-change">4.1% in circulation</div>
        </div>
        <div className="stat-box a">
          <div className="stat-lbl">New This Month</div>
          <div className="stat-num amber">{stats.newThisMonth}</div>
          <div className="stat-change">pending classification</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="catalogue-grid">
        {/* Left Panel - Book Catalogue */}
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Book Catalogue</div>
            <div className="panel-actions">
              <button className="panel-action" onClick={() => setShowAddModal(true)}>+ Add Book</button>
              <button className="panel-action" onClick={handleExport}>↓ Export</button>
            </div>
          </div>
          <div className="panel-body">
            {/* Search and Filters */}
            <div className="search-bar">
              <div className="search-input">
                <Icons.Search />
                <input 
                  type="text" 
                  placeholder="Search title, author, ISBN…" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
                <option value="all">All Genres</option>
                <option value="African Literature">African Literature</option>
                <option value="Fiction">Fiction</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Children">Children</option>
                <option value="Business">Business</option>
              </select>
              <select value={filterAvailability} onChange={(e) => setFilterAvailability(e.target.value)}>
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="limited">Limited (≤2 left)</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Book List */}
            <div className="book-list">
              {filteredBooks.map(book => {
                const status = getAvailabilityStatus(book.available, book.copies)
                const availText = getAvailabilityText(book.available, book.copies)
                return (
                  <div key={book.id} className="book-item">
                    <div className="book-spine" style={{ background: `linear-gradient(160deg, ${book.coverColor}, ${book.coverColor}cc)` }}></div>
                    <div className="book-info">
                      <div className="book-title">{book.title}</div>
                      <div className="book-author">{book.author}</div>
                      <div className="book-meta">
                        <span className="book-dewey">{book.dewey}</span>
                        <span className="book-genre">{book.genre}</span>
                        <span className="book-year">{book.year}</span>
                      </div>
                      <div className="book-availability">
                        <span className={status.class}>{status.text}</span>
                        <span className="book-copies">{availText}</span>
                      </div>
                    </div>
                    <div className="book-actions">
                      <button className="action-btn" onClick={() => handleEditBook(book)} title="Edit">
                        <Icons.Edit />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteBook(book.id, book.title)} title="Delete">
                        <Icons.Delete />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button className="page-btn" disabled>‹ Prev</button>
              <button className="page-btn active">1</button>
              <button className="page-btn" onClick={() => toast.info('Page 2')}>2</button>
              <button className="page-btn" onClick={() => toast.info('Page 3')}>3</button>
              <span className="page-dots">… 8,421 pages</span>
              <button className="page-btn" onClick={() => toast.info('Next page')}>Next ›</button>
            </div>
          </div>
        </div>

        {/* Right Panel - Genre Distribution */}
        <div className="right-panels">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Genre Distribution</div>
            </div>
            <div className="panel-body">
              {genres.filter(g => g.name !== 'All').map(genre => (
                <div key={genre.name} className="genre-bar">
                  <div className="genre-bar-top">
                    <span>{genre.name}</span>
                    <span>{genre.count.toLocaleString()}</span>
                  </div>
                  <div className="genre-bar-track">
                    <div 
                      className="genre-bar-fill" 
                      style={{ width: `${(genre.count / stats.total) * 100}%`, background: 'var(--gold)' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Borrowed Books */}
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Most Borrowed Books</div>
            </div>
            <div className="panel-body feed-list">
              <div className="feed-item">
                <div className="feed-dot" style={{ background: 'var(--gold)' }}></div>
                <div className="feed-text"><strong>Things Fall Apart</strong> — 284 borrows/yr</div>
              </div>
              <div className="feed-item">
                <div className="feed-dot" style={{ background: 'var(--gold)' }}></div>
                <div className="feed-text"><strong>Americanah</strong> — 241 borrows/yr</div>
              </div>
              <div className="feed-item">
                <div className="feed-dot" style={{ background: 'var(--gold)' }}></div>
                <div className="feed-text"><strong>Petals of Blood</strong> — 198 borrows/yr</div>
              </div>
              <div className="feed-item">
                <div className="feed-dot" style={{ background: 'var(--green)' }}></div>
                <div className="feed-text"><strong>Born a Crime</strong> — 176 borrows/yr</div>
              </div>
              <div className="feed-item">
                <div className="feed-dot" style={{ background: 'var(--green)' }}></div>
                <div className="feed-text"><strong>Homegoing</strong> — 154 borrows/yr</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Book</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleAddBook}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" placeholder="Book title" required />
                  </div>
                  <div className="form-group">
                    <label>Author *</label>
                    <input type="text" placeholder="Author name" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>ISBN</label>
                    <input type="text" placeholder="978-..." />
                  </div>
                  <div className="form-group">
                    <label>Year Published</label>
                    <input type="number" placeholder="2024" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Genre</label>
                    <select>
                      <option>African Literature</option>
                      <option>Fiction</option>
                      <option>History</option>
                      <option>Science</option>
                      <option>Children</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Dewey Code</label>
                    <input type="text" placeholder="PR9387" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Total Copies</label>
                    <input type="number" defaultValue="5" min="1" />
                  </div>
                  <div className="form-group">
                    <label>Price (Ksh)</label>
                    <input type="number" defaultValue="0" min="0" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows={3} placeholder="Brief description of the book…"></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add to Catalogue</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && selectedBook && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit — {selectedBook.title}</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <Icons.Close />
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" defaultValue={selectedBook.title} required />
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input type="text" defaultValue={selectedBook.author} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>ISBN</label>
                    <input type="text" defaultValue={selectedBook.isbn} />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input type="number" defaultValue={selectedBook.year} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Genre</label>
                    <select defaultValue={selectedBook.genre}>
                      <option>African Literature</option>
                      <option>Fiction</option>
                      <option>History</option>
                      <option>Science</option>
                      <option>Children</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Dewey Code</label>
                    <input type="text" defaultValue={selectedBook.dewey} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Total Copies</label>
                    <input type="number" defaultValue={selectedBook.copies} />
                  </div>
                  <div className="form-group">
                    <label>Available Copies</label>
                    <input type="number" defaultValue={selectedBook.available} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (Ksh)</label>
                    <input type="number" defaultValue={selectedBook.price} />
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
        .catalogue-page {
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
        .g::after { background: var(--gold); }
        .gr::after { background: var(--green); }
        .b::after { background: var(--blue); }
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
        .stat-num.gold { color: var(--gold); }
        .stat-num.green { color: var(--green); }
        .stat-num.blue { color: var(--blue); }
        .stat-num.amber { color: var(--amber); }
        .stat-change {
          font-size: 0.66rem;
          color: var(--text3);
          margin-top: 0.3rem;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Grid Layout */
        .catalogue-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
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
        }
        .panel-action:hover {
          background: rgba(201,168,76,0.1);
        }
        .panel-body {
          padding: 1rem 1.2rem;
        }

        /* Search Bar */
        .search-bar {
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
        .search-bar select {
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

        /* Book List */
        .book-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 500px;
          overflow-y: auto;
          margin-bottom: 1rem;
        }
        .book-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.65rem;
          border-radius: 4px;
          background: var(--bg3);
          transition: background 0.14s;
        }
        .book-item:hover {
          background: var(--surface2);
        }
        .book-spine {
          width: 32px;
          height: 44px;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .book-info {
          flex: 1;
          min-width: 0;
        }
        .book-title {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text);
        }
        .book-author {
          font-size: 0.7rem;
          color: var(--text3);
          font-style: italic;
        }
        .book-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.6rem;
          color: var(--text3);
          margin-top: 0.2rem;
          font-family: 'JetBrains Mono', monospace;
        }
        .book-availability {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-top: 0.3rem;
        }
        .pill {
          display: inline-block;
          font-size: 0.55rem;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .pg { background: rgba(82,194,120,0.12); color: var(--green); }
        .pr { background: rgba(224,82,82,0.12); color: var(--red); }
        .pa { background: rgba(224,160,82,0.12); color: var(--amber); }
        .book-copies {
          font-size: 0.6rem;
          color: var(--text3);
        }
        .book-actions {
          display: flex;
          gap: 0.3rem;
          flex-shrink: 0;
        }
        .action-btn {
          background: none;
          border: 1px solid var(--border2);
          border-radius: 3px;
          padding: 0.3rem;
          cursor: pointer;
          color: var(--text2);
          transition: all 0.14s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .action-btn:hover {
          background: var(--surface2);
          color: var(--text);
        }
        .action-btn.delete:hover {
          border-color: rgba(224,82,82,0.4);
          color: var(--red);
        }

        /* Right Panels */
        .right-panels {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        /* Genre Bars */
        .genre-bar {
          margin-bottom: 0.8rem;
        }
        .genre-bar-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          margin-bottom: 0.25rem;
        }
        .genre-bar-top span:first-child { color: var(--text2); }
        .genre-bar-top span:last-child { color: var(--text); font-family: 'JetBrains Mono', monospace; }
        .genre-bar-track {
          height: 4px;
          background: var(--bg3);
          border-radius: 2px;
          overflow: hidden;
        }
        .genre-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        /* Feed List */
        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .feed-item {
          display: flex;
          gap: 0.65rem;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border);
        }
        .feed-item:last-child { border-bottom: none; }
        .feed-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .feed-text {
          font-size: 0.73rem;
          color: var(--text2);
          flex: 1;
        }
        .feed-text strong { color: var(--text); }

        /* Pagination */
        .pagination {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          justify-content: flex-end;
          padding-top: 1rem;
          margin-top: 0.5rem;
          border-top: 1px solid var(--border);
        }
        .page-btn {
          min-width: 28px;
          height: 28px;
          border-radius: 3px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text2);
          font-size: 0.72rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          transition: all 0.13s;
        }
        .page-btn:hover {
          background: var(--surface2);
          color: var(--text);
        }
        .page-btn.active {
          background: var(--gold);
          color: #0e0e0f;
          border-color: var(--gold);
          font-weight: 700;
        }
        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .page-dots {
          font-size: 0.68rem;
          color: var(--text3);
          padding: 0 0.4rem;
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
          max-width: 600px;
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
        .form-group select,
        .form-group textarea {
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
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: rgba(201,168,76,0.4);
        }
        .form-group textarea {
          resize: vertical;
          min-height: 70px;
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
          .catalogue-grid {
            grid-template-columns: 1fr;
          }
          .stat-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}