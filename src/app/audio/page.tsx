import AudioClient from './AudioClient';

async function getAudioLessons() {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const lessons = await (prisma as any).audioLesson.findMany({
      include: { book: { select: { id: true, titleEn: true, titleBn: true, imageUrl: true } } },
      orderBy: [{ bookId: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }]
    });
    await prisma.$disconnect();
    return lessons;
  } catch {
    return [];
  }
}

export default async function AudioPage() {
  const lessons = await getAudioLessons();
  return <AudioClient lessons={lessons} />;
}
