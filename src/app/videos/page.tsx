import prisma from '@/lib/prisma';
import VideosClient from './VideosClient';

export const metadata = { title: 'Video Lessons - Green Publishers BD' };

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    include: { book: { select: { id: true, titleEn: true, titleBn: true, imageUrl: true } } },
    orderBy: { createdAt: 'desc' }
  });
  return <VideosClient videos={videos} />;
}
