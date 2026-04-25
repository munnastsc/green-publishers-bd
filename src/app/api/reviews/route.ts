import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId');
  
  if (!bookId) return NextResponse.json({ error: 'Missing bookId' }, { status: 400 });

  try {
    const reviews = await prisma.review.findMany({
      where: { bookId: parseInt(bookId) },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, bookId, rating, comment } = await request.json();
    
    if (!userId || !bookId || !rating) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: parseInt(userId),
        bookId: parseInt(bookId),
        rating: parseInt(rating),
        comment
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
