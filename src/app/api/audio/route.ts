import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const lessons = await (prisma as any).audioLesson.findMany({
    include: { book: { select: { id: true, titleEn: true, titleBn: true } } },
    orderBy: [{ bookId: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }]
  });
  return NextResponse.json(lessons);
}

export async function POST(req: NextRequest) {
  const { titleEn, titleBn, audioUrl, duration, description, bookId, sortOrder } = await req.json();
  const lesson = await (prisma as any).audioLesson.create({
    data: {
      titleEn,
      titleBn,
      audioUrl,
      duration: duration || null,
      description: description || null,
      sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      bookId: bookId ? parseInt(bookId) : null
    }
  });
  return NextResponse.json(lesson);
}

export async function PUT(req: NextRequest) {
  const { id, titleEn, titleBn, audioUrl, duration, description, bookId, sortOrder } = await req.json();
  const lesson = await (prisma as any).audioLesson.update({
    where: { id: parseInt(id) },
    data: {
      titleEn,
      titleBn,
      audioUrl,
      duration: duration || null,
      description: description || null,
      sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      bookId: bookId ? parseInt(bookId) : null
    }
  });
  return NextResponse.json(lesson);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await (prisma as any).audioLesson.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
