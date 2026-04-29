'use client';

import { useState } from 'react';
import { Headphones, Music, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AudioPlayer from '@/components/AudioPlayer';
import Link from 'next/link';

export default function AudioClient({ lessons }: { lessons: any[] }) {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const filtered = lessons.filter((l: any) => {
    const title = lang === 'en' ? l.titleEn : l.titleBn;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  const activeSrc = activeIdx !== null && filtered[activeIdx] ? filtered[activeIdx].audioUrl : null;
  const activeLesson = activeIdx !== null ? filtered[activeIdx] : null;

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Headphones size={32} /> {lang === 'en' ? 'Audio Lessons' : 'অডিও লেসন'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {filtered.length} {lang === 'en' ? 'lessons available' : 'টি লেসন পাওয়া যাচ্ছে'}
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

      {/* Sticky Player */}
      {activeSrc && activeLesson && (
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
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{lang === 'en' ? 'Admin can add audio lessons from the admin panel.' : 'অ্যাডমিন প্যানেল থেকে অডিও লেসন যোগ করুন।'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((l: any, idx: number) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={l.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: isActive ? 'linear-gradient(135deg, #1e293b, #0f172a)' : 'white',
                  color: isActive ? 'white' : 'inherit',
                  border: `1px solid ${isActive ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                {/* Track number / play icon */}
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                  background: isActive ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? '0 2px 8px rgba(245,158,11,0.4)' : 'none'
                }}>
                  <Music size={18} color={isActive ? 'white' : '#64748b'} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lang === 'en' ? l.titleEn : l.titleBn}
                  </div>
                  {l.book && (
                    <div style={{ fontSize: '0.78rem', opacity: isActive ? 0.6 : 0.7, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span>{lang === 'en' ? l.book.titleEn : l.book.titleBn}</span>
                    </div>
                  )}
                  {l.description && (
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.description}</div>
                  )}
                </div>

                {/* Duration */}
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
