'use client';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { lang, t } = useLanguage();
  const { cart, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', opacity: 0.2 }}>
           <ShoppingBag size={100} />
        </div>
        <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '1rem' }}>
          {lang === 'en' ? 'Your cart is empty' : 'আপনার কার্ট খালি'}
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>
          {lang === 'en' ? 'Looks like you haven\'t added any books to your cart yet.' : 'মনে হচ্ছে আপনি এখনো কোনো বই কার্টে যোগ করেননি।'}
        </p>
        <Link href="/books" className="btn btn-blue" style={{ borderRadius: '30px', padding: '0.8rem 2.5rem' }}>
          {lang === 'en' ? 'Explore Books' : 'বই দেখুন'}
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1rem', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <ShoppingBag size={32} color="var(--primary)" />
        <h1 style={{ fontSize: '2.2rem', color: '#1e293b', margin: 0, fontWeight: 800 }}>
          {lang === 'en' ? 'Shopping Cart' : 'শপিং কার্ট'}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Cart Items List */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', color: '#64748b', display: 'grid', gridTemplateColumns: '1fr 120px 100px 50px', gap: '1rem' }}>
             <span>{lang === 'en' ? 'Product' : 'পণ্য'}</span>
             <span style={{ textAlign: 'center' }}>{lang === 'en' ? 'Price' : 'মূল্য'}</span>
             <span style={{ textAlign: 'center' }}>{lang === 'en' ? 'Quantity' : 'পরিমাণ'}</span>
             <span></span>
          </div>
          
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 50px', gap: '1rem', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '70px', backgroundColor: '#f1f5f9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   {item.imageUrl ? <img src={item.imageUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <ShoppingBag size={20} color="#cbd5e1" />}
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0, color: '#1e293b' }}>{lang === 'en' ? item.titleEn : item.titleBn}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0' }}>{lang === 'en' ? item.author?.nameEn : item.author?.nameBn}</p>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#334155' }}>TK. {item.price}</div>
              
              <div style={{ textAlign: 'center', fontWeight: 600 }}>{item.quantity}</div>
              
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>{lang === 'en' ? 'Order Summary' : 'অর্ডার সামারি'}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
              <span>{lang === 'en' ? 'Subtotal' : 'সাবটোটাল'}</span>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>TK. {totalPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
              <span>{lang === 'en' ? 'Shipping' : 'ডেলিভারি চার্জ'}</span>
              <span style={{ fontSize: '0.85rem' }}>{lang === 'en' ? 'Calculated at checkout' : 'চেকআউটে হিসেব করা হবে'}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.3rem', marginBottom: '2rem', color: 'var(--primary)' }}>
             <span>{lang === 'en' ? 'Estimated Total' : 'সম্ভাব্য মোট'}</span>
             <span>TK. {totalPrice}</span>
          </div>

          <Link href="/checkout" className="btn btn-orange" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', borderRadius: '8px', display: 'flex', gap: '0.75rem', textDecoration: 'none' }}>
            {lang === 'en' ? 'Proceed to Checkout' : 'চেকআউট করুন'} <ArrowRight size={20} />
          </Link>
          
          <Link href="/books" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
             {lang === 'en' ? 'Continue Shopping' : 'আরও কেনাকাটা করুন'}
          </Link>
        </div>

      </div>
    </div>
  );
}
