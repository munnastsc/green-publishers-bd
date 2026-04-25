import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const menus = await prisma.menuItem.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(menus);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { labelEn, labelBn, url, order } = await request.json();
    const result = await prisma.menuItem.create({ data: { labelEn, labelBn, url, order: order ? parseInt(order) : 0 } });
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.menuItem.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
