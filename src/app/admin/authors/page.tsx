'use client';
import { useState, useEffect } from 'react';

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({ nameEn: '', nameBn: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch('/api/authors');
      if (res.ok) setAuthors(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      setFormData({ nameEn: '', nameBn: '' });
      fetchAuthors();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    const res = await fetch('/api/authors', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) fetchAuthors();
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Manage Authors</h2>
      
      <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
        <h3 className="section-title" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Add New Author</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Author Name (English)</label>
            <input required type="text" className="form-control" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} placeholder="e.g. Humayun Ahmed" />
          </div>
          <div className="input-group">
            <label className="input-label">Author Name (Bengali)</label>
            <input required type="text" className="form-control" value={formData.nameBn} onChange={e => setFormData({...formData, nameBn: e.target.value})} placeholder="উদা: হুমায়ূন আহমেদ" />
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-blue">Add Author</button>
          </div>
        </form>
      </div>

      <div className="book-card" style={{ padding: '2rem', textAlign: 'left' }}>
        <h3 className="section-title" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Authors List</h3>
        {loading ? (
          <p>Loading authors...</p>
        ) : authors.length === 0 ? (
          <p>No authors found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 0' }}>English Name</th>
                <th>Bengali Name</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author: any) => (
                <tr key={author.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0', fontWeight: 500 }}>{author.nameEn}</td>
                  <td>{author.nameBn}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => handleDelete(author.id)} className="btn" style={{ color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
