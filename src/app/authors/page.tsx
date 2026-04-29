import prisma from '@/lib/prisma';
import AuthorsClient from './AuthorsClient';

export default async function AuthorsPage() {
  let authors: any[] = [];
  try {
    authors = await prisma.author.findMany({
      include: { _count: { select: { books: true } } },
      orderBy: { nameEn: 'asc' }
    });
  } catch (e) {
    console.error(e);
  }
  return <AuthorsClient authors={authors} />;
}
