import prisma from '@/lib/prisma';
import HomeContent from './HomeContent';

export default async function Home() {
  if (!prisma) {
    return <div style={{ padding: '5rem', textAlign: 'center' }}>Database connection not ready. Please restart the server.</div>;
  }

  // Safe fetch for banners
  let banners: any[] = [];
  try {
    const p = prisma as any;
    if (p.banner && typeof p.banner.findMany === 'function') {
      banners = await p.banner.findMany({
        where: { active: true },
        orderBy: { createdAt: 'desc' }
      });
    }
  } catch (e) {
    console.error("Banners fetch failed:", e);
  }

  // Safe fetch for dynamic sections
  let sections: any[] = [];
  try {
    const p = prisma as any;
    if (p.homeSection && typeof p.homeSection.findMany === 'function') {
      sections = await p.homeSection.findMany({
        orderBy: { order: 'asc' }
      });
    }
  } catch (e) {
    console.error("Sections fetch failed:", e);
  }

  // Fetch data for each section
  const sectionData = await Promise.all(sections.map(async (section) => {
    let books: any[] = [];
    try {
      const p = prisma as any;
      if (p.book && typeof p.book.findMany === 'function') {
        if (section.type === 'LATEST') {
          books = await p.book.findMany({
            take: 12,
            orderBy: { createdAt: 'desc' },
            include: { author: true, category: true, publisher: true }
          });
        } else if (section.type === 'CATEGORY' && section.targetId) {
          books = await p.book.findMany({
            where: { categoryId: section.targetId },
            take: 12,
            orderBy: { createdAt: 'desc' },
            include: { author: true, category: true, publisher: true }
          });
        }
      }
    } catch (e) {
      console.error(`Section ${section.id} fetch failed:`, e);
    }
    return { ...section, books };
  }));

  let categories: any[] = [];
  try {
    const p = prisma as any;
    if (p.category && typeof p.category.findMany === 'function') {
      categories = await p.category.findMany();
    }
  } catch (e) {
    console.error("Categories fetch failed:", e);
  }

  return <HomeContent sectionData={sectionData} categories={categories} banners={banners} />;
}
