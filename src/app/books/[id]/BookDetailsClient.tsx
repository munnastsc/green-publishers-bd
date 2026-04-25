'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { BookOpen, ShoppingCart, Star, Share2, Check, ShieldCheck, Truck, RefreshCcw, Heart, PlayCircle, MessageSquare, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookDetailsClient({ book, relatedBooks, videos }: { book: any, relatedBooks: any[], videos: any[] }) {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      checkWishlist(u.id);
    }
    fetchReviews();
  }, [book.id]);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?bookId=${book.id}`);
    if (res.ok) setReviews(await res.json());
  };

  const checkWishlist = async (userId: number) => {
    const res = await fetch(`/api/wishlist?userId=${userId}`);
    if (res.ok) {
      const items = await res.json();
      setInWishlist(items.some((i: any) => i.bookId === book.id));
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      alert(lang === 'en' ? 'Please login to add to wishlist' : 'উইশলিস্টে যোগ করতে লগইন করুন');
      return;
    }
    const res = await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, bookId: book.id })
    });
    if (res.ok) setInWishlist(!inWishlist);
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmittingReview(true);
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reviewForm, userId: user.id, bookId: book.id })
    });
    if (res.ok) {
      setReviewForm({ rating: 5, comment: '' });
      fetchReviews();
    }
    setSubmittingReview(false);
  };

  const handleAdd = () => {
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div className="product-grid">
        
        {/* Column 1: Image & Basic Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="product-image-box" style={{ position: 'relative' }}>
             {book.imageUrl ? (
                <img src={book.imageUrl} alt={book.titleEn} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)' }} />
              ) : (
                <div style={{ width: '100%', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <BookOpen size={100} color="#cbd5e1" />
                </div>
              )}
              <button 
                onClick={toggleWishlist}
                style={{ 
                  position: 'absolute', top: '15px', right: '15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                  color: inWishlist ? '#dc2626' : '#64748b'
                }}>
                <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
              </button>
          </div>
          
          <button className="btn btn-outline" style={{ width: '100%', fontWeight: 700, padding: '0.8rem' }}>
            {lang === 'en' ? 'Look Inside' : 'একটু পড়ে দেখুন'}
          </button>
        </div>

        {/* Column 2: Detailed Info */}
        <div className="product-info-box">
          <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#111827', lineHeight: 1.2 }}>
              {lang === 'en' ? book.titleEn : book.titleBn}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
              <span style={{ color: '#6b7280' }}>{lang === 'en' ? 'by' : 'লেখক:'}</span>
              <Link href={`/books?author=${book.authorId}`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                {lang === 'en' ? book.author?.nameEn : book.author?.nameBn}
              </Link>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b' }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill={i <= (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 5) ? "currentColor" : "none"} />)}
              </div>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {reviews.length > 0 
                  ? (lang === 'en' ? `${(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} Rating (${reviews.length} Reviews)` : `${(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} রেটিং (${reviews.length}টি রিভিউ)`)
                  : (lang === 'en' ? 'No reviews yet' : 'কোনো রিভিউ নেই')}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
               <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#111827' }}>TK. {book.price}</span>
               {book.originalPrice && (
                 <>
                   <span style={{ fontSize: '1.25rem', color: '#9ca3af', textDecoration: 'line-through' }}>TK. {book.originalPrice}</span>
                   <span style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '1rem' }}>
                     {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% {lang === 'en' ? 'OFF' : 'ছাড়'}
                   </span>
                 </>
               )}
            </div>
            <p style={{ color: '#10b981', fontWeight: 600, marginTop: '0.5rem', fontSize: '0.95rem' }}>
               {lang === 'en' ? 'In Stock (Available)' : 'স্টকে আছে'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            <button onClick={handleAdd} className="btn btn-blue" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', backgroundColor: added ? '#10b981' : 'var(--primary)', display: 'flex', gap: '0.75rem' }}>
               {added ? <Check size={22} /> : <ShoppingCart size={22} />}
               {added ? (lang === 'en' ? 'Added to Cart' : 'কার্টে যোগ করা হয়েছে') : (lang === 'en' ? 'Add to Cart' : 'কার্টে যোগ করুন')}
            </button>
            <button onClick={() => { handleAdd(); router.push('/cart'); }} className="btn btn-orange" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}>
               {lang === 'en' ? 'Buy Now' : 'এখনই কিনুন'}
            </button>
          </div>

          {/* Video Lessons */}
          {videos && videos.length > 0 && (
            <div style={{ marginTop: '2rem', background: '#f0f9ff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #bae6fd' }}>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369a1' }}>
                 <PlayCircle size={24} /> {lang === 'en' ? 'Lesson Videos' : 'বইয়ের ভিডিও লেসনসমূহ'}
               </h3>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {videos.map(v => (
                    <div key={v.id} style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e0f2fe' }}>
                       <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                         <iframe src={`https://www.youtube.com/embed/${v.youtubeId}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allowFullScreen />
                       </div>
                       <div style={{ padding: '0.75rem' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0c4a6e' }}>{lang === 'en' ? v.titleEn : v.titleBn}</div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Specifications */}
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #eee', paddingBottom: '0.5rem', display: 'inline-block' }}>
              {lang === 'en' ? 'Specifications' : 'বইয়ের বিবরণ'}
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { labelEn: 'Title', labelBn: 'বইয়ের নাম', valEn: book.titleEn, valBn: book.titleBn },
                  { labelEn: 'Author', labelBn: 'লেখক', valEn: book.author?.nameEn, valBn: book.author?.nameBn },
                  { labelEn: 'Category', labelBn: 'বিষয়', valEn: book.category?.nameEn, valBn: book.category?.nameBn },
                  { labelEn: 'Publisher', labelBn: 'প্রকাশনী', valEn: book.publisher?.nameEn, valBn: book.publisher?.nameBn },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.8rem 0', color: '#6b7280', width: '30%', fontWeight: 500 }}>{lang === 'en' ? row.labelEn : row.labelBn}</td>
                    <td style={{ padding: '0.8rem 0', color: '#111827', fontWeight: 600 }}>{lang === 'en' ? row.valEn : row.valBn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reviews Section */}
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={24} color="var(--primary)" /> {lang === 'en' ? 'Customer Reviews' : 'গ্রাহক রিভিউসমূহ'}
            </h3>
            
            {user ? (
              <form onSubmit={submitReview} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                <h4 style={{ marginBottom: '1rem' }}>{lang === 'en' ? 'Write a Review' : 'একটি রিভিউ লিখুন'}</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', color: '#f59e0b' }}>
                  {[1,2,3,4,5].map(i => (
                    <button key={i} type="button" onClick={() => setReviewForm({...reviewForm, rating: i})} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}>
                      <Star size={24} fill={i <= reviewForm.rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                <textarea 
                  required 
                  className="form-control" 
                  rows={3} 
                  placeholder={lang === 'en' ? 'Share your thoughts about this book...' : 'এই বইটি সম্পর্কে আপনার মতামত লিখুন...'}
                  value={reviewForm.comment}
                  onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                  style={{ marginBottom: '1rem' }}
                />
                <button type="submit" className="btn btn-blue" disabled={submittingReview} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Send size={18} /> {submittingReview ? '...' : (lang === 'en' ? 'Post Review' : 'রিভিউ দিন')}
                </button>
              </form>
            ) : (
              <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <Link href="/auth" style={{ color: 'var(--primary)', fontWeight: 700 }}>{lang === 'en' ? 'Login' : 'লগইন'}</Link> {lang === 'en' ? 'to write a review' : 'করে রিভিউ দিন'}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {reviews.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center' }}>{lang === 'en' ? 'No reviews yet. Be the first to review!' : 'এখনো কোনো রিভিউ নেই। প্রথম রিভিউটি আপনিই দিন!'}</p>
              ) : (
                reviews.map(r => (
                  <div key={r.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                       <span style={{ fontWeight: 700 }}>{r.user.name}</span>
                       <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.2rem', color: '#f59e0b', marginBottom: '0.5rem' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= r.rating ? "currentColor" : "none"} />)}
                    </div>
                    <p style={{ color: '#4b5563', margin: 0, fontSize: '0.95rem' }}>{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Sidebar */}
        <aside className="product-sidebar">
          <div className="sidebar-card">
             <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>{lang === 'en' ? 'Green Publishers Promise' : 'আমাদের প্রতিশ্রুতি'}</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.85rem' }}>
                   <div style={{ backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '50%' }}><Truck size={18} color="var(--primary)" /></div>
                   <span>{lang === 'en' ? 'Fast Home Delivery' : 'সারা দেশে হোম ডেলিভারি'}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.85rem' }}>
                   <div style={{ backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '50%' }}><ShieldCheck size={18} color="var(--primary)" /></div>
                   <span>{lang === 'en' ? '100% Original Books' : '১০০% অরিজিনাল বই'}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.85rem' }}>
                   <div style={{ backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '50%' }}><RefreshCcw size={18} color="var(--primary)" /></div>
                   <span>{lang === 'en' ? 'Easy Return Policy' : 'সহজ রিটার্ন পলিসি'}</span>
                </div>
             </div>
          </div>

          {relatedBooks.length > 0 && (
            <div className="sidebar-card" style={{ padding: '1rem' }}>
               <h4 style={{ marginBottom: '1rem', fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                 {lang === 'en' ? 'Related Books' : 'সম্পর্কিত বই'}
               </h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedBooks.map((rb: any) => (
                    <Link key={rb.id} href={`/books/${rb.id}`} style={{ display: 'flex', gap: '0.75rem', textDecoration: 'none' }}>
                       <div style={{ width: '60px', height: '80px', backgroundColor: '#f3f4f6', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px' }}>
                          <BookOpen size={24} color="#cbd5e1" />
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#333', lineHeight: 1.3 }}>{lang === 'en' ? rb.titleEn : rb.titleBn}</span>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{lang === 'en' ? rb.author?.nameEn : rb.author?.nameBn}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, marginTop: '2px' }}>TK. {rb.price}</span>
                       </div>
                    </Link>
                  ))}
               </div>
            </div>
          )}
          
          <button className="btn" style={{ background: '#1e293b', color: 'white', width: '100%', fontSize: '0.9rem' }}>
             <Share2 size={16} /> {lang === 'en' ? 'Share this book' : 'বন্ধুদের সাথে শেয়ার করুন'}
          </button>
        </aside>

      </div>
    </div>
  );
}
