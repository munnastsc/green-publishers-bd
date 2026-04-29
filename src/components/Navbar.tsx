'use client';

import Link from 'next/link';
import { BookOpen, ShoppingCart, User, Search, Menu, Phone, Globe, Heart, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { cart } = useCart();
  const [menus, setMenus] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
    }
  };

  useEffect(() => {
    fetch('/api/menus')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setMenus(data); })
      .catch(() => {});
  }, []);

  const navLinks = menus.length > 0 ? menus : [
    { id: 1, labelEn: 'Books', labelBn: 'বইসমূহ', url: '/books' },
    { id: 2, labelEn: 'Authors', labelBn: 'লেখক', url: '/authors' },
    { id: 3, labelEn: 'Videos', labelBn: 'ভিডিও', url: '/videos' },
    { id: 4, labelEn: 'Audio', labelBn: 'অডিও', url: '/audio' },
  ];

  return (
    <header style={{ width: '100%' }}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b', fontWeight: 500 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={14} /> 16297
            </span>
            <span className="hidden-mobile">{t('Available from 9am - 11pm', 'সকাল ৯টা - রাত ১১টা পর্যন্ত')}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
              <Globe size={14} color="var(--primary)" />
              <span onClick={() => setLang('en')} style={{ color: lang === 'en' ? 'var(--primary)' : '#94a3b8' }}>EN</span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span onClick={() => setLang('bn')} style={{ color: lang === 'bn' ? 'var(--primary)' : '#94a3b8' }}>বাং</span>
            </div>
            <Link href="/admin/login" style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ShieldCheck size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

          {/* Hamburger (mobile only) */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ backgroundColor: 'var(--primary)', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={26} color="white" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 900, fontSize: '1.3rem', color: '#1e293b', lineHeight: 1 }}>Green<span style={{ color: 'var(--primary)' }}>Publishers</span></span>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--secondary)', letterSpacing: '1px' }}>ONLINE BOOKSTORE</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <form className="search-container desktop-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn" type="submit">
              <Search size={20} />
            </button>
          </form>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Mobile Search Toggle */}
            <button
              className="mobile-search-btn"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <Search size={22} />
            </button>

            <Link href="/cart" style={{ display: 'flex', alignItems: 'center', color: '#334155', textDecoration: 'none', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'var(--secondary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            <Link href="/wishlist" className="hidden-mobile">
              <Heart size={24} color="#334155" />
            </Link>

            {user ? (
              <Link href="/profile" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '7px 14px',
                borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0',
                color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem'
              }}>
                <User size={18} /> <span className="hidden-mobile">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link href="/auth" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '7px 14px',
                borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0',
                color: '#334155', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
              }}>
                <User size={18} /> <span className="hidden-mobile">{t('Sign In', 'লগইন')}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="mobile-search-bar" style={{ padding: '0.75rem 1rem', borderTop: '1px solid #e2e8f0', background: 'white' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="form-control"
                value={searchQuery}
                autoFocus
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-blue" style={{ padding: '0 1rem', flexShrink: 0 }}>
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Desktop Nav Bar */}
      <nav className="nav-bar desktop-nav">
        <div className="container">
          <ul>
            <li>
              <Link href="/categories" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', fontWeight: 700 }}>
                <Menu size={20} /> {t('allCategories')}
              </Link>
            </li>
            {navLinks.map((m: any) => (
              <li key={m.id}>
                <Link href={m.url}>{lang === 'en' ? m.labelEn : m.labelBn}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" style={{
          position: 'fixed', top: 0, left: 0, width: '75%', maxWidth: '300px',
          height: '100vh', background: 'white', zIndex: 1000, boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
          overflowY: 'auto', padding: '0'
        }}>
          <div style={{ background: 'var(--primary)', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>মেনু</span>
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
          <nav style={{ padding: '1rem 0' }}>
            <Link href="/categories" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.5rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
              <Menu size={18} /> {t('allCategories')}
            </Link>
            {navLinks.map((m: any) => (
              <Link key={m.id} href={m.url} onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', padding: '0.85rem 1.5rem', color: '#334155', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem' }}>
                {lang === 'en' ? m.labelEn : m.labelBn}
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.5rem', color: '#334155', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
              <Heart size={18} /> {lang === 'en' ? 'Wishlist' : 'উইশলিস্ট'}
            </Link>
            {!user && (
              <Link href="/auth" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.5rem', color: 'white', fontWeight: 700, textDecoration: 'none', background: 'var(--primary)', margin: '1rem', borderRadius: '8px' }}>
                <User size={18} /> {lang === 'en' ? 'Sign In / Register' : 'লগইন / রেজিস্টার'}
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999 }}
        />
      )}
    </header>
  );
}
