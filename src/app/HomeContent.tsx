'use client';

import Link from 'next/link';
import { BookOpen, Star, ChevronRight, ShoppingCart, ArrowRight, Library, GraduationCap, Moon, Calculator, Globe2, BookMarked } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function HomeContent({ sectionData, categories, banners }: { sectionData: any[], categories: any[], banners?: any[] }) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();

  // Helper icons for categories
  const categoryIcons = [
    <Library size={24} />,
    <GraduationCap size={24} />,
    <Moon size={24} />,
    <Calculator size={24} />,
    <Globe2 size={24} />,
    <BookMarked size={24} />
  ];

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Dynamic Banner Section */}
      <div className="container" style={{ margin: '1rem auto' }}>
        {banners && banners.length > 0 ? (
          banners.map((banner) => (
            <Link key={banner.id} href={banner.link || '#'} style={{ textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
              <div style={{ 
                width: '100%', 
                height: '350px', 
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${banner.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 'var(--radius-sm)', 
                position: 'relative', 
                overflow: 'hidden', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '2.5rem 4rem', 
                color: 'white',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ zIndex: 1, maxWidth: '65%' }}>
                  <h1 style={{ fontSize: '2.8rem', marginBottom: '0.8rem', color: 'white', lineHeight: 1.1, fontWeight: 900 }}>
                    {lang === 'en' ? banner.titleEn : banner.titleBn}
                  </h1>
                  <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9, fontWeight: 400, maxWidth: '500px' }}>
                    {lang === 'en' ? banner.subtitleEn : banner.subtitleBn}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="btn btn-orange" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem', borderRadius: '30px' }}>
                      {lang === 'en' ? 'Explore More' : 'আরও দেখুন'}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          /* Default Banner if none exists */
          <div style={{ 
            width: '100%', 
            height: '300px', 
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
            borderRadius: 'var(--radius-sm)', 
            position: 'relative', 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '2.5rem 4rem', 
            color: 'white',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ zIndex: 1, maxWidth: '65%' }}>
              <span style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1rem', display: 'inline-block' }}>
                {lang === 'en' ? 'WELCOME' : 'স্বাগতম'}
              </span>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.8rem', color: 'white', lineHeight: 1.1, fontWeight: 900 }}>
                {lang === 'en' ? 'Welcome to Green Publishers BD' : 'গ্রিন পাবলিশার্স বিডিতে আপনাকে স্বাগতম'}
              </h1>
              <p style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.9, fontWeight: 400 }}>
                {lang === 'en' ? 'Find your next favorite book here.' : 'আপনার পরবর্তী পছন্দের বইটি এখানে খুঁজে নিন।'}
              </p>
            </div>
            <div style={{ position: 'absolute', right: '5%', bottom: '-20px', width: '280px', height: '350px', opacity: 0.15 }}>
               <BookOpen size={260} color="white" />
            </div>
          </div>
        )}
      </div>

      {/* Shop by Subject Section */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div className="home-section-header" style={{ marginBottom: '15px' }}>
           <h2 className="section-title" style={{ fontSize: '1.2rem' }}>{lang === 'en' ? 'Shop by Subject' : 'বিষয় ভিত্তিক বই'}</h2>
           <Link href="/categories" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
             {lang === 'en' ? 'All Subjects' : 'সব বিষয়'} ›
           </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {categories.slice(0, 6).map((cat, idx) => (
            <Link key={cat.id} href={`/books?category=${cat.id}`} className="subject-card" style={{ padding: '1rem' }}>
              <div className="subject-icon" style={{ width: '45px', height: '45px' }}>
                {categoryIcons[idx % categoryIcons.length]}
              </div>
              <span className="subject-name" style={{ fontSize: '0.9rem' }}>{lang === 'en' ? cat.nameEn : cat.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {sectionData.map((section) => (
            <section key={section.id}>
              <div className="home-section-header" style={{ marginBottom: '15px' }}>
                <h2 className="section-title" style={{ fontSize: '1.2rem' }}>
                  {lang === 'en' ? section.titleEn : section.titleBn}
                </h2>
                <Link href={section.type === 'CATEGORY' ? `/books?category=${section.targetId}` : '/books'} style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  {lang === 'en' ? 'View All' : 'সবগুলো দেখুন'} <ChevronRight size={16} />
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem' }}>
                {section.books.map((book: any) => (
                  <div key={book.id} className="book-card" style={{ padding: '10px' }}>
                    <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ 
                        height: '180px', 
                        backgroundColor: '#f8fafc', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginBottom: '0.5rem', 
                        borderRadius: 'var(--radius-sm)',
                        padding: '8px'
                      }}>
                        {book.imageUrl ? (
                          <img src={book.imageUrl} alt={book.titleEn} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <BookOpen size={40} color="#cbd5e1" />
                        )}
                      </div>
                      <h3 className="book-title" style={{ fontSize: '0.85rem', marginBottom: '2px', height: '2.4rem' }}>{lang === 'en' ? book.titleEn : book.titleBn}</h3>
                    </Link>
                    <p className="book-author" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>{lang === 'en' ? book.author?.nameEn : book.author?.nameBn}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', marginBottom: '0.5rem' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: '4px' }}>({(book.id % 50) + 15})</span>
                    </div>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="book-price" style={{ fontSize: '1rem' }}>TK. {book.price}</span>
                        {book.originalPrice && (
                          <span className="book-price-old" style={{ fontSize: '0.8rem' }}>TK. {book.originalPrice}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(book)} 
                        style={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e2e8f0', 
                          color: 'var(--primary)',
                          borderRadius: '4px',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                         <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderTop: '1px solid #e2e8f0', marginTop: '4rem', padding: '2rem 0' }}>
         <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
               <div style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}><Library size={30} /></div>
               <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{lang === 'en' ? 'Original Books' : '১০০% অরিজিনাল বই'}</h4>
               <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{lang === 'en' ? 'Directly from publishers' : 'সরাসরি প্রকাশনী থেকে'}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
               <div style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}><ArrowRight size={30} /></div>
               <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{lang === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি'}</h4>
               <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{lang === 'en' ? 'Nationwide Shipping' : 'সারাদেশে ডেলিভারি'}</p>
            </div>
         </div>
      </div>
    </div>
  );
}
