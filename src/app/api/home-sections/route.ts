import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.homeSection.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { titleEn, titleBn, type, targetId, order } = await request.json();
    const section = await prisma.homeSection.create({
      data: {
        titleEn,
        titleBn,
        type,
        targetId: targetId ? parseInt(targetId) : null,
        order: parseInt(order || '0')
      }
    });
    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.homeSection.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
