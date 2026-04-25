'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Tag } from 'lucide-react';

export default function OffersPage() {
  const { lang } = useLanguage();

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1.5rem', textAlign: 'center' }}>
        {lang === 'en' ? 'Special Offers' : 'বিশেষ অফার'}
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[
          { 
            titleEn: 'Boi Mela 2024 Special', 
            titleBn: 'বইমেলা ২০২৪ বিশেষ', 
            descEn: 'Get up to 40% discount on all books.', 
            descBn: 'সব বইয়ের ওপর ৪০% পর্যন্ত ছাড় পান।',
            code: 'BOIMELA40'
          },
          { 
            titleEn: 'Student Discount', 
            titleBn: 'ছাত্রছাত্রীদের জন্য ছাড়', 
            descEn: 'Extra 10% off on all academic books.', 
            descBn: 'সব একাডেমিক বইয়ের ওপর অতিরিক্ত ১০% ছাড়।',
            code: 'STUDENT10'
          }
        ].map((offer, i) => (
          <div key={i} style={{ background: 'white', border: '2px dashed var(--secondary)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
            <Tag size={40} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {lang === 'en' ? offer.titleEn : offer.titleBn}
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {lang === 'en' ? offer.descEn : offer.descBn}
            </p>
            <div style={{ background: '#fef3c7', padding: '0.5rem', border: '1px solid #f59e0b', borderRadius: 'var(--radius-sm)', fontWeight: 800, fontSize: '1.2rem', color: '#b45309' }}>
              {offer.code}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
