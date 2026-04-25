'use client';

import Link from 'next/link';
import { BookOpen, ShoppingCart, User, Search, Menu, Phone, Globe, Heart, ShieldCheck } from 'lucide-react';
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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    fetch('/api/menus')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setMenus(data);
      })
      .catch(() => {});
  }, []);

  return (
    <header style={{ width: '100%' }}>
      {/* 1. Top Bar */}
      <div className="top-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b', fontWeight: 500 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Phone size={14} /> 16297
            </span>
            <span className="hidden-mobile">{t('Available from 9am - 11pm', 'সকাল ৯টা - রাত ১১টা পর্যন্ত')}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* Language Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
              <Globe size={14} color="var(--primary)" />
              <span onClick={() => setLang('en')} style={{ color: lang === 'en' ? 'var(--primary)' : '#94a3b8' }}>ENGLISH</span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span onClick={() => setLang('bn')} style={{ color: lang === 'bn' ? 'var(--primary)' : '#94a3b8' }}>বাংলা</span>
            </div>
            <Link href="/admin/login" style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
               <ShieldCheck size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="main-header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
          
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'var(--primary)', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={28} color="white" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#1e293b', lineHeight: 1 }}>Green<span style={{ color: 'var(--primary)' }}>Publishers</span></span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--secondary)', letterSpacing: '1px' }}>ONLINE BOOKSTORE</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form className="search-container" onSubmit={handleSearch}>
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
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', textDecoration: 'none', position: 'relative', fontWeight: 600 }}>
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
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0', color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem'
              }}>
                <User size={18} /> {user.name.split(' ')[0]}
              </Link>
            ) : (
              <Link href="/auth" style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0', color: '#334155', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
              }}>
                <User size={18} /> {t('Sign In', 'লগইন')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. Secondary Navigation */}
      <nav className="nav-bar">
        <div className="container">
          <ul>
            <li>
              <Link href="/categories" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', fontWeight: 700 }}>
                <Menu size={20} /> {t('allCategories')}
              </Link>
            </li>
            {menus.map(m => (
              <li key={m.id}>
                <Link href={m.url}>{lang === 'en' ? m.labelEn : m.labelBn}</Link>
              </li>
            ))}
            {!menus.length && (
               <>
                 <li><Link href="/books">{t('Books', 'বইসমূহ')}</Link></li>
                 <li><Link href="/authors">{t('Authors', 'লেখক')}</Link></li>
                 <li><Link href="/videos">{t('Videos', 'ভিডিও')}</Link></li>
               </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
