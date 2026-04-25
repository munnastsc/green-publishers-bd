'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, User, Lock, Mail, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('user', JSON.stringify(data));
          router.push('/profile');
        } else {
          setIsLogin(true);
          setForm({ ...form, password: '' });
          alert('Account created! Please login.');
        }
      } else {
        setError(data.error || 'Operation failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '2rem' }}>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2.5rem', width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '1rem' }}>
            {isLogin ? <User size={32} /> : <UserPlus size={32} />}
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b' }}>
            {isLogin ? (lang === 'en' ? 'Customer Login' : 'কাস্টমার লগইন') : (lang === 'en' ? 'Create Account' : 'নতুন অ্যাকাউন্ট')}
          </h1>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
            {isLogin ? (lang === 'en' ? 'Welcome back! Please login' : 'স্বাগতম! লগইন করুন') : (lang === 'en' ? 'Join us for a better experience' : 'আমাদের সাথে যোগ দিন')}
          </p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">{lang === 'en' ? 'Full Name' : 'পূর্ণ নাম'}</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input required type="text" className="form-control" style={{ paddingLeft: '40px' }} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
              </div>
            </div>
          )}
          <div className="input-group">
            <label className="input-label">{lang === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা'}</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input required type="email" className="form-control" style={{ paddingLeft: '40px' }} value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">{lang === 'en' ? 'Password' : 'পাসওয়ার্ড'}</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input required type="password" className="form-control" style={{ paddingLeft: '40px' }} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="btn btn-blue" style={{ padding: '0.8rem', fontSize: '1rem', marginTop: '0.5rem', borderRadius: '8px' }} disabled={loading}>
            {loading ? (lang === 'en' ? 'Please wait...' : 'অপেক্ষা করুন...') : (isLogin ? (lang === 'en' ? 'Login' : 'লগইন') : (lang === 'en' ? 'Sign Up' : 'সাইন আপ'))}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: '#64748b' }}>
           {isLogin ? (lang === 'en' ? "Don't have an account?" : "অ্যাকাউন্ট নেই?") : (lang === 'en' ? "Already have an account?" : "আগেই অ্যাকাউন্ট আছে?")}{' '}
           <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
              {isLogin ? (lang === 'en' ? 'Sign Up' : 'সাইন আপ করুন') : (lang === 'en' ? 'Login' : 'লগইন করুন')}
           </button>
        </div>
      </div>
    </div>
  );
}
