import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.video.findMany({ 
      include: { book: true },
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { titleEn, titleBn, youtubeId, description, categoryId, bookId } = await request.json();
    const result = await prisma.video.create({ 
      data: { 
        titleEn, 
        titleBn, 
        youtubeId, 
        description, 
        categoryId: categoryId ? parseInt(categoryId) : null,
        bookId: bookId ? parseInt(bookId) : null
      } 
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.video.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
