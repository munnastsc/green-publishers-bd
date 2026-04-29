'use client';
import { useState, useEffect } from 'react';
import { Headphones, Trash2, Music, ExternalLink, Pencil, X, Check } from 'lucide-react';

const BLANK = { titleEn: '', titleBn: '', audioUrl: '', duration: '', description: '', bookId: '', sortOrder: '0' };

export default function AdminAudioPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [formData, setFormData] = useState(BLANK);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchLessons(); fetchBooks(); }, []);

  const fetchLessons = async () => {
    const res = await fetch('/api/audio');
    if (res.ok) setLessons(await res.json());
  };

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    if (res.ok) setBooks(await res.json());
  };

  const showMsg = (t: string) => { setMsg(t); setTimeout(() => setMsg(''), 3000); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { id: editingId, ...formData } : formData;
    const res = await fetch('/api/audio', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.ok) {
      setFormData(BLANK);
      setEditingId(null);
      fetchLessons();
      showMsg(editingId ? 'Audio lesson updated!' : 'Audio lesson saved!');
    }
    setLoading(false);
  };

  const handleEdit = (l: any) => {
    setEditingId(l.id);
    setFormData({ titleEn: l.titleEn, titleBn: l.titleBn, audioUrl: l.audioUrl, duration: l.duration || '', description: l.description || '', bookId: l.bookId ? String(l.bookId) : '', sortOrder: String(l.sortOrder) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {msg && <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '6px', border: '1px solid #86efac' }}>{msg}</div>}

      <div style={{ background: 'white', border: `2px solid ${editingId ? 'var(--primary)' : 'var(--border-color)'}`, borderRadius: '10px', padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: editingId ? 'var(--primary)' : '#1e293b' }}>
          {editingId ? 'Edit Audio Lesson' : 'Add New Audio Lesson'}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Title (English) *</label>
            <input required type="text" className="form-control" value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} placeholder="Chapter 1: Introduction" />
          </div>
          <div className="input-group">
            <label className="input-label">Title (Bengali) *</label>
            <input required type="text" className="form-control" value={formData.titleBn} onChange={e => setFormData({ ...formData, titleBn: e.target.value })} placeholder="অধ্যায় ১: ভূমিকা" />
          </div>

          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">Audio File URL *</label>
            <input required type="url" className="form-control" value={formData.audioUrl} onChange={e => setFormData({ ...formData, audioUrl: e.target.value })} placeholder="https://example.com/audio/lesson1.mp3" />
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Direct MP3/OGG link. Use any hosted audio file URL.</p>
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

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="btn btn-blue" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={16} /> {loading ? 'Saving...' : (editingId ? 'Update Lesson' : 'Save Lesson')}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setFormData(BLANK); setEditingId(null); }} className="btn" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>All Audio Lessons ({lessons.length})</h3>
        {lessons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <Music size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p>No audio lessons yet. Add one above.</p>
          </div>
        ) : (
          Object.entries(byBook).map(([bookTitle, bookLessons]: [string, any]) => (
            <div key={bookTitle} style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', marginBottom: '0.75rem', padding: '0.5rem 0.75rem', background: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Music size={16} /> {bookTitle}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {bookLessons.map((l: any) => (
                  <div key={l.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1rem', border: `1px solid ${editingId === l.id ? 'var(--primary)' : '#e2e8f0'}`, borderRadius: '8px', background: editingId === l.id ? '#f0f9ff' : 'white', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '200px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Music size={16} color="white" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{l.titleEn}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{l.titleBn} {l.duration && `• ${l.duration}`}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <a href={l.audioUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ExternalLink size={14} /> Test
                      </a>
                      <button onClick={() => handleEdit(l)} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '6px', padding: '0.3rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Pencil size={13} /> Edit
                      </button>
                      <button onClick={() => handleDelete(l.id)} style={{ background: '#fff1f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: '6px', padding: '0.3rem 0.75rem', cursor: 'pointer', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Trash2 size={13} /> Delete
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
