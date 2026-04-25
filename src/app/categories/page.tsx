import prisma from '@/lib/prisma';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { books: true }
      }
    }
  });

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem', color: '#1e293b' }}>সকল বিষয় (All Subjects)</h1>
      <CategoriesClient categories={categories} />
    </div>
  );
}
