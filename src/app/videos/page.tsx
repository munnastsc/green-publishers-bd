import prisma from '@/lib/prisma';
import VideosClient from './VideosClient';

export const metadata = { title: 'Video Lessons - Green Publishers BD' };

export default async function VideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: 'desc' } });
  return <VideosClient videos={videos} />;
}
