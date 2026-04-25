'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { BookOpen, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const { lang } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth');
    } else {
      const u = JSON.parse(storedUser);
      setUser(u);
      fetchWishlist(u.id);
    }
  }, [router]);

  const fetchWishlist = async (userId: number) => {
    try {
      const res = await fetch(`/api/wishlist?userId=${userId}`);
      if (res.ok) setItems(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (bookId: number) => {
    const res = await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, bookId })
    });
    if (res.ok) fetchWishlist(user.id);
  };

  if (loading) return <div className="container" style={{ padding: '5rem' }}>Loading wishlist...</div>;

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Heart size={32} fill="var(--primary)" color="var(--primary)" /> {lang === 'en' ? 'My Wishlist' : 'আমার প্রিয় তালিকা'}
      </h1>

      {items.length === 0 ? (
        <div style={{ background: 'white', padding: '5rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
           <Heart size={64} style={{ opacity: 0.1, marginBottom: '1.5rem' }} />
           <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>{lang === 'en' ? 'Your wishlist is empty.' : 'আপনার প্রিয় তালিকা খালি।'}</p>
           <Link href="/books" className="btn btn-blue" style={{ padding: '0.8rem 2.5rem', borderRadius: '30px' }}>
              {lang === 'en' ? 'Explore Books' : 'বইগুলো দেখুন'}
           </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
          {items.map((item) => (
            <div key={item.id} className="book-card" style={{ padding: '15px' }}>
              <Link href={`/books/${item.book.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ height: '240px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  {item.book.imageUrl ? <img src={item.book.imageUrl} alt={item.book.titleEn} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}/> : <BookOpen size={48} color="#cbd5e1" />}
                </div>
                <h3 className="book-title" style={{ fontSize: '1rem', height: '2.8rem' }}>{lang === 'en' ? item.book.titleEn : item.book.titleBn}</h3>
              </Link>
              <p className="book-author" style={{ fontSize: '0.85rem' }}>{lang === 'en' ? item.book.author?.nameEn : item.book.author?.nameBn}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem' }}>
                <span className="book-price" style={{ fontSize: '1.1rem' }}>TK. {item.book.price}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => removeItem(item.book.id)} style={{ padding: '8px', borderRadius: '50%', border: '1px solid #fee2e2', color: '#ef4444', background: 'white', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => addToCart(item.book)} style={{ padding: '8px', borderRadius: '50%', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'white', cursor: 'pointer' }}>
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
