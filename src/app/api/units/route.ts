import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const bookId = req.nextUrl.searchParams.get('bookId');
  const units = await prisma.unit.findMany({
    where: bookId ? { bookId: parseInt(bookId) } : undefined,
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(units);
}

export async function POST(req: NextRequest) {
  const { titleEn, titleBn, order, bookId } = await req.json();
  const unit = await prisma.unit.create({
    data: { titleEn, titleBn: titleBn || null, order: order ? parseInt(order) : 0, bookId: parseInt(bookId) },
  });
  return NextResponse.json(unit, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, titleEn, titleBn, order } = await req.json();
  const unit = await prisma.unit.update({
    where: { id: parseInt(id) },
    data: { titleEn, titleBn: titleBn || null, order: order ? parseInt(order) : 0 },
  });
  return NextResponse.json(unit);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.unit.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
