import prisma from '@/lib/prisma';
import BooksClient from './BooksClient';

export const metadata = {
  title: 'Books - Green Publishers BD',
};

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true, category: true, publisher: true }
  });

  const categories = await prisma.category.findMany();
  const authors = await prisma.author.findMany();

  return <BooksClient books={books} categories={categories} authors={authors} />;
}
