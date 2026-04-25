'use client';
import { useState } from 'react';
import { BookOpen, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'admin@greenpublishersbd.com' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      window.location.href = '/admin';
    } else {
      setError('Invalid credentials. Use: admin@greenpublishersbd.com / admin123');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', padding: '2rem' }}>
      <div style={{ background: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', padding: '3rem', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <BookOpen size={32} color="var(--primary)" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
              GreenPublishers<span style={{ color: 'var(--secondary)' }}>BD</span>
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Admin Control Panel Login</p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: 'var(--radius-sm)', border: '1px solid #fca5a5', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@greenpublishersbd.com" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-blue" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} disabled={loading}>
            <Lock size={18} />
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <strong>Default credentials:</strong><br />
          Email: admin@greenpublishersbd.com<br />
          Password: admin123
        </div>
      </div>
    </div>
  );
}
