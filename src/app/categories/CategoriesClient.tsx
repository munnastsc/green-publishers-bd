'use client';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function CategoriesClient({ categories }: { categories: any[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {categories.map((cat: any) => (
        <Link key={cat.id} href={`/books?category=${cat.id}`} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: 'var(--radius-md)', 
          border: '1px solid #e2e8f0',
          textDecoration: 'none',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ color: 'var(--primary)' }}><BookOpen size={24} /></div>
            <div>
              <div style={{ fontWeight: 700, color: '#334155' }}>{cat.nameBn}</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{cat.nameEn} ({cat._count?.books || 0} books)</div>
            </div>
          </div>
          <ChevronRight size={20} color="#cbd5e1" />
        </Link>
      ))}
    </div>
  );
}
