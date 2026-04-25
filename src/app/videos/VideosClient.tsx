'use client';
import { useState } from 'react';
import { Search, PlayCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function VideosClient({ videos }: { videos: any[] }) {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = videos.filter((v: any) => {
    const title = lang === 'en' ? v.titleEn : v.titleBn;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
            {lang === 'en' ? 'Video Lessons' : 'ভিডিও ক্লাস'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {lang === 'en' ? 'Watch and learn from our educational video library.' : 'আমাদের শিক্ষামূলক ভিডিও থেকে শিখুন।'}
          </p>
        </div>
        <div className="search-container" style={{ margin: 0, minWidth: '260px' }}>
          <input type="text" placeholder={lang === 'en' ? 'Search videos...' : 'ভিডিও খুঁজুন...'} className="search-input" value={search} onChange={e => setSearch(e.target.value)} />
          <button className="search-btn"><Search size={18} /></button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <PlayCircle size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <h3>{lang === 'en' ? 'No videos found.' : 'কোনো ভিডিও পাওয়া যায়নি।'}</h3>
          <p>{lang === 'en' ? 'Admin can add videos from the admin panel.' : 'অ্যাডমিন প্যানেল থেকে ভিডিও যোগ করুন।'}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filtered.map((v: any) => (
            <div key={v.id} style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allowFullScreen
                  title={v.titleEn}
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {lang === 'en' ? v.titleEn : v.titleBn}
                </h3>
                {v.description && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{v.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
