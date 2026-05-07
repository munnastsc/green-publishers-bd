'use client';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, Download } from 'lucide-react';

export default function ManualClient({ items }: { items: any[] }) {
  const { lang } = useLanguage();

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f766e, #0d9488)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '1rem', display: 'flex' }}>
          <FileText size={36} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
            {lang === 'bn' ? 'প্রশিক্ষণ ম্যানুয়াল' : 'Training Manuals'}
          </h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.85, fontSize: '1rem' }}>
            {lang === 'bn'
              ? 'প্রশিক্ষণের জন্য প্রয়োজনীয় ম্যানুয়াল ও গাইড সমূহ'
              : 'Essential manuals and guides for training purposes'}
          </p>
        </div>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#94a3b8' }}>
          <FileText size={56} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <p style={{ fontSize: '1.1rem' }}>
            {lang === 'bn' ? 'এখনো কোনো ম্যানুয়াল যোগ করা হয়নি।' : 'No manuals added yet.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item: any, index: number) => (
            <div key={item.id} style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'box-shadow 0.2s'
            }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'}
            >
              {/* Number / Image */}
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={lang === 'bn' ? item.titleBn : item.titleEn}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                />
              ) : (
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0f766e, #0d9488)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  {index + 1}
                </div>
              )}

              {/* Content */}
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.4rem' }}>
                  {lang === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                {(lang === 'bn' ? item.descriptionBn : item.descriptionEn) && (
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
                    {lang === 'bn' ? item.descriptionBn : item.descriptionEn}
                  </p>
                )}
                {item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1rem',
                      background: '#f0fdfa',
                      color: '#0f766e',
                      border: '1px solid #99f6e4',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.825rem',
                      transition: 'background 0.2s'
                    }}
                  >
                    <Download size={14} />
                    {lang === 'bn' ? 'ডাউনলোড করুন' : 'Download'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
