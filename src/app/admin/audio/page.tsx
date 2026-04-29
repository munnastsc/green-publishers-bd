'use client';
import { useState, useEffect } from 'react';
import { Headphones, Trash2, Music, ExternalLink } from 'lucide-react';

export default function AdminAudioPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [formData, setFormData] = useState({ titleEn: '', titleBn: '', audioUrl: '', duration: '', description: '', bookId: '', sortOrder: '0' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchLessons();
    fetchBooks();
  }, []);

  const fetchLessons = async () => {
    const res = await fetch('/api/audio');
    if (res.ok) setLessons(await res.json());
  };

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    if (res.ok) setBooks(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setFormData({ titleEn: '', titleBn: '', audioUrl: '', duration: '', description: '', bookId: '', sortOrder: '0' });
      fetchLessons();
      setMsg('Audio lesson saved!');
      setTimeout(() => setMsg(''), 3000);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this audio lesson?')) return;
    await fetch('/api/audio', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchLessons();
  };

  const byBook = lessons.reduce((acc: any, l: any) => {
    const key = l.book ? `${l.book.titleEn}` : 'General (No Book)';
    if (!acc[key]) acc[key] = [];
    acc[key].push(l);
    return acc;
  }, {});

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Headphones size={28} /> Manage Audio Lessons
      </h2>

      {msg && (
        <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: 'var(--radius-sm)', border: '1px solid #86efac' }}>
          {msg}
        </div>
      )}

      <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>Add New Audio Lesson</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Lesson Title (English) *</label>
            <input required type="text" className="form-control" value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} placeholder="Chapter 1: Introduction" />
          </div>
          <div className="input-group">
            <label className="input-label">Lesson Title (Bengali) *</label>
            <input required type="text" className="form-control" value={formData.titleBn} onChange={e => setFormData({ ...formData, titleBn: e.target.value })} placeholder="অধ্যায় ১: ভূমিকা" />
          </div>

          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">Audio File URL *</label>
            <input required type="url" className="form-control" value={formData.audioUrl} onChange={e => setFormData({ ...formData, audioUrl: e.target.value })} placeholder="https://example.com/audio/lesson1.mp3" />
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
              Direct MP3/OGG link. Google Drive: open file → Share → copy link, then change /view to /preview. Best: use direct CDN or hosting link.
            </p>
          </div>

          <div className="input-group">
            <label className="input-label">Related Book (Optional)</label>
            <select className="form-control" value={formData.bookId} onChange={e => setFormData({ ...formData, bookId: e.target.value })}>
              <option value="">General (Not linked to a book)</option>
              {books.map(b => <option key={b.id} value={b.id}>{b.titleEn} / {b.titleBn}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Duration (Optional)</label>
            <input type="text" className="form-control" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 12:35" />
          </div>

          <div className="input-group">
            <label className="input-label">Sort Order</label>
            <input type="number" className="form-control" value={formData.sortOrder} onChange={e => setFormData({ ...formData, sortOrder: e.target.value })} min="0" />
          </div>

          <div className="input-group">
            <label className="input-label">Description (Optional)</label>
            <input type="text" className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="btn btn-blue" disabled={loading}>{loading ? 'Saving...' : 'Save Audio Lesson'}</button>
          </div>
        </form>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '2rem' }}>
        <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>All Audio Lessons ({lessons.length})</h3>
        {lessons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <Music size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p>No audio lessons yet. Add one above.</p>
          </div>
        ) : (
          Object.entries(byBook).map(([bookTitle, bookLessons]: [string, any]) => (
            <div key={bookTitle} style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '0.75rem', padding: '0.5rem 0.75rem', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Music size={16} /> {bookTitle}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {bookLessons.map((l: any) => (
                  <div key={l.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', border: '1px solid #e2e8f0', borderRadius: '8px', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '200px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Music size={18} color="white" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{l.titleEn}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{l.titleBn} {l.duration && `• ${l.duration}`}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <a href={l.audioUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ExternalLink size={14} /> Test
                      </a>
                      <button onClick={() => handleDelete(l.id)} style={{ background: 'none', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: '6px', padding: '0.3rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
