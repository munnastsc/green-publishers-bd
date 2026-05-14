'use client';
import { useState, useEffect } from 'react';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [formData, setFormData] = useState({ titleEn: '', titleBn: '', youtubeId: '', description: '', bookId: '', unitId: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchVideos();
    fetch('/api/books').then(r => r.json()).then(setBooks);
  }, []);

  useEffect(() => {
    if (formData.bookId) {
      fetch(`/api/units?bookId=${formData.bookId}`).then(r => r.json()).then(setUnits);
    } else {
      setUnits([]);
      setFormData(f => ({ ...f, unitId: '' }));
    }
  }, [formData.bookId]);

  const fetchVideos = async () => {
    const res = await fetch('/api/videos');
    if (res.ok) setVideos(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setFormData({ titleEn: '', titleBn: '', youtubeId: '', description: '', bookId: '', unitId: '' });
      fetchVideos();
      setMsg('Video saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    await fetch('/api/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchVideos();
  };

  const handleYoutubeChange = (val: string) => {
    let id = val;
    const match = val.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) id = match[1];
    setFormData({ ...formData, youtubeId: id });
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Manage Video Lessons</h2>

      {msg && (
        <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: 'var(--radius-sm)', border: '1px solid #86efac' }}>
          {msg}
        </div>
      )}

      <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="section-title">Add New Lesson Video</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Lesson Title (English) *</label>
            <input required type="text" className="form-control" value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Lesson Title (Bengali) — Optional</label>
            <input type="text" className="form-control" value={formData.titleBn} onChange={e => setFormData({ ...formData, titleBn: e.target.value })} />
          </div>

          <div className="input-group">
            <label className="input-label">Related Book (Optional)</label>
            <select className="form-control" value={formData.bookId} onChange={e => setFormData({ ...formData, bookId: e.target.value, unitId: '' })}>
              <option value="">General Video (Not linked to a book)</option>
              {books.map(b => <option key={b.id} value={b.id}>{b.titleEn} / {b.titleBn}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Unit (Optional){!formData.bookId && <span style={{ color: '#94a3b8', fontWeight: 400 }}> — বই সিলেক্ট করুন আগে</span>}</label>
            <select className="form-control" value={formData.unitId} onChange={e => setFormData({ ...formData, unitId: e.target.value })} disabled={!formData.bookId || units.length === 0}>
              <option value="">No Unit</option>
              {units.map(u => <option key={u.id} value={u.id}>{u.titleEn}{u.titleBn ? ` / ${u.titleBn}` : ''}</option>)}
            </select>
            {formData.bookId && units.length === 0 && (
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>এই বইতে কোনো unit নেই। <a href="/admin/units" style={{ color: 'var(--primary)' }}>Unit তৈরি করুন</a></p>
            )}
          </div>

          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">YouTube URL or Video ID *</label>
            <input required type="text" className="form-control" placeholder="e.g. https://youtube.com/watch?v=dQw4w9WgXcQ" value={formData.youtubeId} onChange={e => handleYoutubeChange(e.target.value)} />
          </div>

          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <label className="input-label">Description</label>
            <textarea className="form-control" rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="btn btn-blue" disabled={loading}>{loading ? 'Saving...' : 'Save Video'}</button>
          </div>
        </form>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '2rem' }}>
        <h3 className="section-title">All Videos ({videos.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {videos.map((v: any) => (
            <div key={v.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe src={`https://www.youtube.com/embed/${v.youtubeId}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allowFullScreen />
              </div>
              <div style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{v.titleEn}</h4>
                {v.titleBn && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{v.titleBn}</p>}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {v.book && (
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', color: 'var(--primary)', fontWeight: 700 }}>
                      📚 {v.book.titleEn}
                    </span>
                  )}
                  {v.unit && (
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '4px', color: '#92400e', fontWeight: 700 }}>
                      📂 {v.unit.titleEn}
                    </span>
                  )}
                </div>
                <button onClick={() => handleDelete(v.id)} className="btn" style={{ color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', width: '100%', marginTop: '1rem' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
