'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParams } from 'next/navigation';
import { FileText } from 'lucide-react';

export default function CustomPageView() {
  const { lang } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string;
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch('/api/custom-pages')
      .then(r => r.json())
      .then((pages: any[]) => {
        const found = pages.find(p => p.slug === slug && p.active);
        if (found) setPage(found);
        else setNotFound(true);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
      Loading...
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: '1rem' }}>
      <FileText size={56} style={{ opacity: 0.3 }} />
      <h2 style={{ margin: 0, color: '#1e293b' }}>{lang === 'bn' ? 'পাতাটি পাওয়া যায়নি' : 'Page Not Found'}</h2>
      <p>{lang === 'bn' ? 'এই পাতাটি বিদ্যমান নেই বা নিষ্ক্রিয় করা হয়েছে।' : 'This page does not exist or has been deactivated.'}</p>
    </div>
  );

  const title = lang === 'bn' ? page.titleBn : page.titleEn;
  const content = lang === 'bn' ? page.contentBn : page.contentEn;

  return (
    <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 1rem 4rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        borderRadius: '14px',
        padding: '2.5rem 2rem',
        color: 'white',
        marginBottom: '2.5rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, lineHeight: 1.3 }}>{title}</h1>
      </div>

      {/* Content */}
      <div style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2.5rem',
        lineHeight: 1.9,
        fontSize: '1rem',
        color: '#334155',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        {content || (lang === 'bn' ? 'কোনো বিষয়বস্তু নেই।' : 'No content yet.')}
      </div>
    </div>
  );
}
