'use client';
import { useState } from 'react';
import { Search, PlayCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function VideoCard({ v, lang }: { v: any, lang: string }) {
  const [loaded, setLoaded] = useState(false);
  const thumb = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;

  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s, transform 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
    >
      {loaded ? (
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
            title={v.titleEn}
          />
        </div>
      ) : (
        <div
          onClick={() => setLoaded(true)}
          style={{ position: 'relative', paddingTop: '56.25%', cursor: 'pointer', overflow: 'hidden' }}
        >
          <img
            src={thumb}
            alt={v.titleEn}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
          />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'rgba(220,38,38,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(220,38,38,0.4)',
              transition: 'transform 0.2s'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '3px' }}>
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '8px', right: '10px', background: 'rgba(0,0,0,0.75)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '3px' }}>
            YouTube
          </div>
        </div>
      )}
      <div style={{ padding: '1rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.3rem', color: '#1e293b', lineHeight: 1.4 }}>
          {lang === 'en' ? v.titleEn : v.titleBn}
        </h3>
        {v.description && (
          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {v.description}
          </p>
        )}
        {v.book && (
          <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#f0f9ff', color: 'var(--primary)', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', fontWeight: 600 }}>
            {lang === 'en' ? v.book?.titleEn : v.book?.titleBn}
          </div>
        )}
      </div>
    </div>
  );
}

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
            {lang === 'en' ? `${filtered.length} videos — click to play` : `${filtered.length}টি ভিডিও — ক্লিক করে দেখুন`}
          </p>
        </div>
        <div className="search-container" style={{ margin: 0, minWidth: '260px' }}>
          <input type="text" placeholder={lang === 'en' ? 'Search videos...' : 'ভিডিও খুঁজুন...'} className="search-input" value={search} onChange={e => setSearch(e.target.value)} />
          <button className="search-btn"><Search size={18} /></button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <PlayCircle size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
          <h3>{lang === 'en' ? 'No videos found.' : 'কোনো ভিডিও পাওয়া যায়নি।'}</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((v: any) => <VideoCard key={v.id} v={v} lang={lang} />)}
        </div>
      )}
    </div>
  );
}
