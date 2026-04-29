import prisma from '@/lib/prisma';
import BookDetailsClient from './BookDetailsClient';
import { notFound } from 'next/navigation';

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bookId = parseInt(id);

  // Fetch basic book info
  let book: any = null;
  try {
    book = await prisma.book.findUnique({
      where: { id: bookId },
      include: { 
        author: true, 
        category: true, 
        publisher: true
      }
    });
  } catch (e) {
    console.error("Book fetch failed:", e);
  }

  if (!book) notFound();

  // Hyper-safe video fetching to avoid Prisma Validation Error if client is stale
  let videos: any[] = [];
  try {
    const p = prisma as any;
    if (p.video) {
      const allVideos = await p.video.findMany({ orderBy: { createdAt: 'asc' } });
      videos = allVideos.filter((v: any) => v.bookId === bookId);
    }
  } catch (e) {
    console.error("Failed to fetch videos safely:", e);
  }

  let audioLessons: any[] = [];
  try {
    const p = prisma as any;
    if (p.audioLesson) {
      const allAudio = await p.audioLesson.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
      audioLessons = allAudio.filter((a: any) => a.bookId === bookId);
    }
  } catch (e) {
    console.error("Failed to fetch audio lessons:", e);
  }

  // Fetch related books
  let relatedBooks: any[] = [];
  try {
    relatedBooks = await prisma.book.findMany({
      where: { 
        categoryId: book.categoryId,
        NOT: { id: book.id }
      },
      take: 4,
      include: { author: true }
    });
  } catch (e) {
    console.error("Failed to fetch related books:", e);
  }

  return <BookDetailsClient book={book} relatedBooks={relatedBooks} videos={videos} audioLessons={audioLessons} />;
}
