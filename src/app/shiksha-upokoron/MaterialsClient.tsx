'use client';
import { useLanguage } from '@/context/LanguageContext';
import { BookMarked, Download, ExternalLink } from 'lucide-react';

export default function MaterialsClient({ items }: { items: any[] }) {
  const { lang, t } = useLanguage();

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        marginBottom: '2.5rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '1rem', display: 'flex' }}>
          <BookMarked size={36} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
            {lang === 'bn' ? 'শিক্ষা উপকরণ' : 'Educational Materials'}
          </h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.85, fontSize: '1rem' }}>
            {lang === 'bn'
              ? 'শিক্ষার্থীদের জন্য প্রয়োজনীয় শিক্ষামূলক উপকরণ সমূহ'
              : 'Essential learning resources for students'}
          </p>
        </div>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#94a3b8' }}>
          <BookMarked size={56} style={{ marginBottom: '1rem', opacity: 0.3 }} />
          <p style={{ fontSize: '1.1rem' }}>
            {lang === 'bn' ? 'এখনো কোনো উপকরণ যোগ করা হয়নি।' : 'No materials added yet.'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {items.map((item: any) => (
            <div key={item.id} style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.2s, transform 0.2s',
              display: 'flex',
              flexDirection: 'column'
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Cover Image */}
              {item.imageUrl ? (
                <div style={{ height: '180px', overflow: 'hidden', background: '#f1f5f9' }}>
                  <img
                    src={item.imageUrl}
                    alt={lang === 'bn' ? item.titleBn : item.titleEn}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div style={{
                  height: '120px',
                  background: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookMarked size={40} color="var(--primary)" style={{ opacity: 0.4 }} />
                </div>
              )}

              {/* Card Body */}
              <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                  {lang === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                {(lang === 'bn' ? item.descriptionBn : item.descriptionEn) && (
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 1rem', lineHeight: 1.6, flexGrow: 1 }}>
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
                      gap: '0.5rem',
                      padding: '0.6rem 1.25rem',
                      background: 'var(--primary)',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      marginTop: 'auto',
                      transition: 'background 0.2s'
                    }}
                  >
                    <Download size={16} />
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
