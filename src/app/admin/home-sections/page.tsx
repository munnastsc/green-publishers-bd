'use client';
import { useState, useEffect } from 'react';

export default function AdminHomeSectionsPage() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ titleEn: '', titleBn: '', type: 'LATEST', targetId: '', order: '0' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [secRes, catRes] = await Promise.all([
        fetch('/api/home-sections'),
        fetch('/api/categories')
      ]);
      if (secRes.ok) setSections(await secRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/home-sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...formData, 
        order: parseInt(formData.order),
        targetId: formData.targetId ? parseInt(formData.targetId) : null 
      })
    });
    
    if (res.ok) {
      setFormData({ titleEn: '', titleBn: '', type: 'LATEST', targetId: '', order: '0' });
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const res = await fetch('/api/home-sections', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) fetchData();
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Manage Home Sections</h2>
      
      <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
        <h3 className="section-title">Add Home Section</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Title (English)</label>
            <input required type="text" className="form-control" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} placeholder="e.g. Latest Books" />
          </div>
          <div className="input-group">
            <label className="input-label">Title (Bengali)</label>
            <input required type="text" className="form-control" value={formData.titleBn} onChange={e => setFormData({...formData, titleBn: e.target.value})} placeholder="উদা: নতুন আসা বই" />
          </div>
          <div className="input-group">
            <label className="input-label">Type</label>
            <select className="form-control" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="LATEST">Latest Added</option>
              <option value="CATEGORY">Category Specific</option>
            </select>
          </div>
          {formData.type === 'CATEGORY' && (
            <div className="input-group">
              <label className="input-label">Select Category</label>
              <select required className="form-control" value={formData.targetId} onChange={e => setFormData({...formData, targetId: e.target.value})}>
                <option value="">Choose...</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.nameEn}</option>)}
              </select>
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Order</label>
            <input required type="number" className="form-control" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-blue">Save Section</button>
          </div>
        </form>
      </div>

      <div className="book-card" style={{ padding: '2rem', textAlign: 'left' }}>
        <h3 className="section-title">Homepage Layout</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 0' }}>Title</th>
                <th>Type</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((s: any) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0' }}>
                    {s.titleEn} / {s.titleBn}
                  </td>
                  <td>{s.type}</td>
                  <td>{s.order}</td>
                  <td>
                    <button onClick={() => handleDelete(s.id)} className="btn" style={{ color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
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
