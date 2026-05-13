'use client';

import { useState, useEffect } from 'react';
import { Headphones, Music, Search, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioPlayer from '@/components/AudioPlayer';
import Link from 'next/link';

export default function AudioClient({ lessons }: { lessons: any[] }) {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [showLockPopup, setShowLockPopup] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      setHasAccess(user.isActive === true);
    }
    setAccessChecked(true);
  }, []);

  const filtered = lessons.filter((l: any) => {
    const title = lang === 'en' ? l.titleEn : l.titleBn;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  const activeSrc = activeIdx !== null && filtered[activeIdx] ? filtered[activeIdx].audioUrl : null;
  const activeLesson = activeIdx !== null ? filtered[activeIdx] : null;

  const handleLessonClick = (idx: number) => {
    if (!hasAccess) { setShowLockPopup(true); return; }
    setActiveIdx(idx);
  };

  if (!accessChecked) return null;

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {/* Lock Popup */}
      {showLockPopup && (
        <div
          onClick={() => setShowLockPopup(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'white', borderRadius: '16px', padding: '2.5rem 2rem', maxWidth: '380px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Lock size={28} color="#dc2626" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem', color: '#1e293b' }}>
              {lang === 'en' ? 'Members Only' : 'শুধু সদস্যদের জন্য'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {lang === 'en'
                ? 'Audio lessons are for active members only. Log in or contact admin to activate your account.'
                : 'অডিও লেসন শুধুমাত্র অ্যাক্টিভ সদস্যদের জন্য। লগইন করুন অথবা অ্যাডমিনকে অ্যাকাউন্ট অ্যাক্টিভ করতে বলুন।'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <Link href="/auth" className="btn btn-blue" style={{ padding: '0.6rem 1.5rem', borderRadius: '30px', fontSize: '0.9rem' }}>
                {lang === 'en' ? 'Login' : 'লগইন'}
              </Link>
              <button onClick={() => setShowLockPopup(false)} style={{ padding: '0.6rem 1.5rem', borderRadius: '30px', fontSize: '0.9rem', background: '#f1f5f9', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                {lang === 'en' ? 'Close' : 'বন্ধ করুন'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Headphones size={32} /> {lang === 'en' ? 'Audio Lessons' : 'অডিও লেসন'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {filtered.length} {lang === 'en' ? 'lessons available' : 'টি লেসন পাওয়া যাচ্ছে'}
            {!hasAccess && (
              <span style={{ marginLeft: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#fef2f2', color: '#dc2626', padding: '2px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                <Lock size={12} /> {lang === 'en' ? 'Login to listen' : 'শুনতে লগইন করুন'}
              </span>
            )}
          </p>
        </div>
        <div className="search-container" style={{ margin: 0, minWidth: '260px' }}>
          <input
            type="text"
            placeholder={lang === 'en' ? 'Search lessons...' : 'লেসন খুঁজুন...'}
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="search-btn"><Search size={18} /></button>
        </div>
      </div>

      {/* Sticky Player — only for active users */}
      {hasAccess && activeSrc && activeLesson && (
        <div style={{ position: 'sticky', top: '10px', zIndex: 50, marginBottom: '2rem' }}>
          <AudioPlayer
            src={activeSrc}
            title={lang === 'en' ? activeLesson.titleEn : activeLesson.titleBn}
            subtitle={activeLesson.book ? (lang === 'en' ? activeLesson.book.titleEn : activeLesson.book.titleBn) : undefined}
            hasPrev={activeIdx! > 0}
            hasNext={activeIdx! < filtered.length - 1}
            onPrev={() => setActiveIdx(i => Math.max(0, (i ?? 0) - 1))}
            onNext={() => setActiveIdx(i => Math.min(filtered.length - 1, (i ?? 0) + 1))}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
          <Headphones size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
          <h3>{lang === 'en' ? 'No audio lessons found.' : 'কোনো অডিও লেসন পাওয়া যায়নি।'}</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((l: any, idx: number) => {
            const isPlaying = hasAccess && activeIdx === idx;
            return (
              <div
                key={l.id}
                onClick={() => handleLessonClick(idx)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: isPlaying ? 'linear-gradient(135deg, #1e293b, #0f172a)' : 'white',
                  color: isPlaying ? 'white' : 'inherit',
                  border: `1px solid ${isPlaying ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isPlaying ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
                  opacity: !hasAccess ? 0.75 : 1,
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                  background: isPlaying
                    ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                    : !hasAccess ? '#f1f5f9' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isPlaying ? '0 2px 8px rgba(245,158,11,0.4)' : 'none'
                }}>
                  {!hasAccess
                    ? <Lock size={16} color="#94a3b8" />
                    : <Music size={18} color={isPlaying ? 'white' : '#64748b'} />
                  }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lang === 'en' ? l.titleEn : l.titleBn}
                  </div>
                  {l.book && (
                    <div style={{ fontSize: '0.78rem', opacity: isPlaying ? 0.6 : 0.7, marginTop: '2px' }}>
                      {lang === 'en' ? l.book.titleEn : l.book.titleBn}
                    </div>
                  )}
                  {l.description && (
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.description}</div>
                  )}
                </div>

                {l.duration && (
                  <div style={{ fontSize: '0.8rem', opacity: 0.65, flexShrink: 0 }}>{l.duration}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
