'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Star, Search, ShoppingCart, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';

export default function BooksClient({ books, categories, authors }: { books: any[], categories: any[], authors: any[] }) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState('');
  const [selCat, setSelCat] = useState('');
  const [selAuthor, setSelAuthor] = useState('');
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) setSearch(query);
    const cat = searchParams.get('category');
    if (cat) setSelCat(cat);
    const auth = searchParams.get('author');
    if (auth) setSelAuthor(auth);
  }, [searchParams]);

  const filtered = books
    .filter((b: any) => {
      const title = lang === 'en' ? b.titleEn : b.titleBn;
      const matchSearch = title.toLowerCase().includes(search.toLowerCase());
      const matchCat = selCat ? b.categoryId === parseInt(selCat) : true;
      const matchAuthor = selAuthor ? b.authorId === parseInt(selAuthor) : true;
      const matchPrice = b.price <= priceRange;
      return matchSearch && matchCat && matchAuthor && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '0.5rem', fontWeight: 800 }}>
          {lang === 'en' ? 'Books Collection' : 'বইয়ের সংগ্রহ'}
        </h1>
        <p style={{ color: '#64748b' }}>{filtered.length} {lang === 'en' ? 'books found' : 'টি বই পাওয়া গেছে'}</p>
      </div>

      {/* Modern Top Filter Bar */}
      <div style={{ 
        background: 'white', 
        padding: '1rem 1.5rem', 
        borderRadius: '12px', 
        border: '1px solid #e2e8f0', 
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Search Field */}
          <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="form-control" 
              style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid #cbd5e1' }} 
              placeholder={t('searchPlaceholder')} 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>

          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '8px', 
                background: showFilters ? 'var(--primary)' : 'white', 
                color: showFilters ? 'white' : '#475569',
                border: '1px solid #cbd5e1', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
              }}>
              <Filter size={18} /> {lang === 'en' ? 'Filters' : 'ফিল্টার'} <ChevronDown size={14} style={{ transform: showFilters ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 1rem', background: 'white' }}>
               <ArrowUpDown size={16} color="#64748b" />
               <select 
                 className="form-control" 
                 style={{ width: 'auto', border: 'none', background: 'transparent', padding: '0.6rem 0', fontWeight: 600, color: '#475569', outline: 'none' }} 
                 value={sortBy} 
                 onChange={e => setSortBy(e.target.value)}
               >
                  <option value="newest">{lang === 'en' ? 'Newest' : 'নতুন বই'}</option>
                  <option value="priceLow">{lang === 'en' ? 'Price: Low' : 'দাম: কম'}</option>
                  <option value="priceHigh">{lang === 'en' ? 'Price: High' : 'দাম: বেশি'}</option>
               </select>
            </div>
          </div>
        </div>

        {/* Expandable Advanced Filters */}
        {showFilters && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem', 
            paddingTop: '1rem', 
            borderTop: '1px solid #f1f5f9',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div className="input-group">
               <label className="input-label" style={{ marginBottom: '8px' }}>{lang === 'en' ? 'Price Range' : 'মূল্য পরিসীমা'}</label>
               <input type="range" min="0" max="2000" step="50" value={priceRange} onChange={e => setPriceRange(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                  <span>0 TK</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Up to {priceRange} TK</span>
               </div>
            </div>

            <div className="input-group">
               <label className="input-label" style={{ marginBottom: '8px' }}>{lang === 'en' ? 'Category' : 'ক্যাটাগরি'}</label>
               <select className="form-control" value={selCat} onChange={e => setSelCat(e.target.value)}>
                  <option value="">{lang === 'en' ? 'All Categories' : 'সব ক্যাটাগরি'}</option>
                  {categories.map((c:any) => <option key={c.id} value={c.id}>{lang === 'en' ? c.nameEn : c.nameBn}</option>)}
               </select>
            </div>

            <div className="input-group">
               <label className="input-label" style={{ marginBottom: '8px' }}>{lang === 'en' ? 'Author' : 'লেখক'}</label>
               <select className="form-control" value={selAuthor} onChange={e => setSelAuthor(e.target.value)}>
                  <option value="">{lang === 'en' ? 'All Authors' : 'সব লেখক'}</option>
                  {authors.map((a:any) => <option key={a.id} value={a.id}>{lang === 'en' ? a.nameEn : a.nameBn}</option>)}
               </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
               <button 
                 onClick={() => { setSelCat(''); setSelAuthor(''); setPriceRange(2000); setSearch(''); }}
                 style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #fee2e2', background: '#fff', color: '#ef4444', fontWeight: 600, cursor: 'pointer' }}
               >
                 {lang === 'en' ? 'Reset All' : 'সব মুছুন'}
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Product Grid */}
      <div className="books-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem' }}>
             <BookOpen size={64} style={{ opacity: 0.1, marginBottom: '1rem' }} />
             <p style={{ color: '#64748b' }}>{lang === 'en' ? 'No books found matching your criteria.' : 'আপনার শর্তানুসারে কোনো বই পাওয়া যায়নি।'}</p>
          </div>
        ) : (
          filtered.map((book: any) => (
            <div key={book.id} className="book-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
              <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ height: '240px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  {book.imageUrl ? <img src={book.imageUrl} alt={book.titleEn} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}/> : <BookOpen size={48} color="#cbd5e1" />}
                </div>
                <h3 className="book-title" style={{ fontSize: '0.95rem', height: '2.8rem', color: '#1e293b' }}>{lang === 'en' ? book.titleEn : book.titleBn}</h3>
              </Link>
              <p className="book-author" style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{lang === 'en' ? book.author?.nameEn : book.author?.nameBn}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', marginBottom: '0.75rem' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="book-price" style={{ fontSize: '1.1rem', fontWeight: 800 }}>TK. {book.price}</span>
                  {book.originalPrice && <span className="book-price-old" style={{ fontSize: '0.85rem' }}>TK. {book.originalPrice}</span>}
                </div>
                <button onClick={() => addToCart(book)} style={{ backgroundColor: 'white', border: '1px solid var(--primary)', color: 'var(--primary)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.2s' }}>
                   <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
