import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  try {
    const items = await prisma.wishlistItem.findMany({
      where: { userId: parseInt(userId) },
      include: { book: { include: { author: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, bookId } = await request.json();
    
    // Toggle wishlist
    const existing = await prisma.wishlistItem.findUnique({
      where: { userId_bookId: { userId: parseInt(userId), bookId: parseInt(bookId) } }
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return NextResponse.json({ message: 'Removed from wishlist' });
    } else {
      const item = await prisma.wishlistItem.create({
        data: { userId: parseInt(userId), bookId: parseInt(bookId) }
      });
      return NextResponse.json(item, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
