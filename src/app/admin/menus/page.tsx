'use client';
import { useState, useEffect } from 'react';

export default function AdminMenusPage() {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({ labelEn: '', labelBn: '', url: '', order: '0' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/menus');
      if (res.ok) setMenus(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, order: parseInt(formData.order) })
    });
    
    if (res.ok) {
      setFormData({ labelEn: '', labelBn: '', url: '', order: '0' });
      fetchMenus();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const res = await fetch('/api/menus', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) fetchMenus();
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>Manage Navigation Menus</h2>
      
      <div className="book-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
        <h3 className="section-title">Add Menu Item</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Label (English)</label>
            <input required type="text" className="form-control" value={formData.labelEn} onChange={e => setFormData({...formData, labelEn: e.target.value})} placeholder="e.g. Writers" />
          </div>
          <div className="input-group">
            <label className="input-label">Label (Bengali)</label>
            <input required type="text" className="form-control" value={formData.labelBn} onChange={e => setFormData({...formData, labelBn: e.target.value})} placeholder="উদা: লেখক" />
          </div>
          <div className="input-group">
            <label className="input-label">URL</label>
            <input required type="text" className="form-control" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="e.g. /authors" />
          </div>
          <div className="input-group">
            <label className="input-label">Order</label>
            <input required type="number" className="form-control" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-blue">Save Menu Item</button>
          </div>
        </form>
      </div>

      <div className="book-card" style={{ padding: '2rem', textAlign: 'left' }}>
        <h3 className="section-title">Active Menus</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 0' }}>Label</th>
                <th>URL</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((m: any) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 0' }}>
                    {m.labelEn} / {m.labelBn}
                  </td>
                  <td>{m.url}</td>
                  <td>{m.order}</td>
                  <td>
                    <button onClick={() => handleDelete(m.id)} className="btn" style={{ color: '#dc2626', border: '1px solid #fca5a5', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
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
