'use client';
import Link from 'next/link';
import { BookOpen, Video, Tag, Users, ShoppingCart } from 'lucide-react';

interface Props {
  bookCount: number;
  videoCount: number;
  categoryCount: number;
  authorCount: number;
  orderCount: number;
}

export default function AdminDashboardClient({ bookCount, videoCount, categoryCount, authorCount, orderCount }: Props) {
  const stats = [
    { label: 'Total Books', value: bookCount, icon: BookOpen, color: '#dcfce7', iconColor: '#16a34a', link: '/admin/books' },
    { label: 'Video Lessons', value: videoCount, icon: Video, color: '#dbeafe', iconColor: '#1d4ed8', link: '/admin/videos' },
    { label: 'Categories', value: categoryCount, icon: Tag, color: '#fef3c7', iconColor: '#b45309', link: '/admin/categories' },
    { label: 'Authors', value: authorCount, icon: Users, color: '#f3e8ff', iconColor: '#7c3aed', link: '/admin/authors' },
    { label: 'Orders', value: orderCount, icon: ShoppingCart, color: '#ffe4e6', iconColor: '#be123c', link: '/admin/orders' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome to Admin Panel</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Here's an overview of your Green Publishers BD store.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((s) => (
          <Link href={s.link} key={s.label} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div style={{ padding: '0.75rem', backgroundColor: s.color, borderRadius: '50%' }}>
                <s.icon size={24} color={s.iconColor} />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{s.label}</p>
                <h3 style={{ fontSize: '2rem', margin: 0, fontWeight: 800 }}>{s.value}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/admin/books" className="btn btn-blue">+ Add Book</Link>
          <Link href="/admin/videos" className="btn btn-blue">+ Add Video</Link>
          <Link href="/admin/categories" className="btn btn-blue">+ Add Category</Link>
          <Link href="/admin/authors" className="btn btn-blue">+ Add Author</Link>
          <Link href="/admin/publishers" className="btn btn-blue">+ Add Publisher</Link>
          <Link href="/admin/menus" className="btn btn-blue">+ Edit Menu</Link>
        </div>
      </div>
    </div>
  );
}
