import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true, category: true, publisher: true }
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleEn, titleBn, description, price, originalPrice, imageUrl, rokomariLink, categoryId, authorId, publisherId } = body;

    const book = await prisma.book.create({
      data: {
        titleEn,
        titleBn,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        imageUrl,
        rokomariLink: rokomariLink || null,
        categoryId: categoryId || null,
        authorId: authorId || null,
        publisherId: publisherId || null,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, titleEn, titleBn, description, price, originalPrice, imageUrl, rokomariLink, categoryId, authorId, publisherId } = body;

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        titleEn,
        titleBn,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        imageUrl,
        rokomariLink: rokomariLink || null,
        categoryId: categoryId || null,
        authorId: authorId || null,
        publisherId: publisherId || null,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.book.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
