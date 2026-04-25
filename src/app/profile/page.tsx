'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, User, LogOut, Package, Clock, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth');
    } else {
      const u = JSON.parse(storedUser);
      setUser(u);
      fetchOrders(u.id);
    }
  }, [router]);

  const fetchOrders = async (userId: number) => {
    try {
      const res = await fetch(`/api/orders?userId=${userId}`);
      if (res.ok) setOrders(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth');
  };

  if (loading) return <div className="container" style={{ padding: '4rem' }}>Loading profile...</div>;

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
        
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--primary)' }}>
               <User size={40} />
            </div>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{user?.name}</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{user?.email}</p>
            <button onClick={handleLogout} className="btn" style={{ color: '#dc2626', border: '1px solid #fca5a5', width: '100%', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
               <LogOut size={18} /> {lang === 'en' ? 'Logout' : 'লগআউট'}
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Package size={28} color="var(--primary)" /> {lang === 'en' ? 'My Orders' : 'আমার অর্ডারসমূহ'}
          </h1>

          {orders.length === 0 ? (
            <div style={{ background: 'white', padding: '4rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#94a3b8' }}>
               <ShoppingBag size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
               <p>{lang === 'en' ? "You haven't placed any orders yet." : "আপনি এখনো কোনো অর্ডার করেননি।"}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {orders.map((order) => (
                 <div key={order.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 800 }}>Order #{order.id}</span>
                        <span style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '2px 8px', borderRadius: '20px', color: '#475569' }}>
                           {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                     </div>
                     <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>{order.items}</p>
                     <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700 }}>
                        {order.status === 'COMPLETED' ? <CheckCircle size={14} color="#16a34a" /> : <Clock size={14} color="#f59e0b" />}
                        <span style={{ color: order.status === 'COMPLETED' ? '#16a34a' : '#f59e0b' }}>{order.status}</span>
                     </div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>TK. {order.totalAmount}</div>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
