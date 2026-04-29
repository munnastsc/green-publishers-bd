'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AuthorsClient({ authors }: { authors: any[] }) {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = authors.filter((a: any) => {
    const name = lang === 'en' ? a.nameEn : a.nameBn;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={32} /> {lang === 'en' ? 'Authors' : 'লেখকগণ'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {filtered.length} {lang === 'en' ? 'authors' : 'জন লেখক'}
          </p>
        </div>
        <div className="search-container" style={{ margin: 0, minWidth: '260px' }}>
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search authors...' : 'লেখক খুঁজুন...'}
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="search-btn"><Search size={18} /></button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <Users size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
          <h3>{lang === 'en' ? 'No authors found.' : 'কোনো লেখক পাওয়া যায়নি।'}</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((author: any) => (
            <Link
              key={author.id}
              href={`/books?author=${author.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem', fontWeight: 800, color: 'white'
                }}>
                  {(lang === 'en' ? author.nameEn : author.nameBn).charAt(0).toUpperCase()}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
                  {lang === 'en' ? author.nameEn : author.nameBn}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {lang === 'en' ? author.nameBn : author.nameEn}
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <BookOpen size={14} />
                  {author._count?.books || 0} {lang === 'en' ? 'books' : 'টি বই'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
