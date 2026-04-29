import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.author.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nameEn, nameBn } = await request.json();
    const result = await prisma.author.create({ data: { nameEn, nameBn } });
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, nameEn, nameBn } = await request.json();
    const result = await prisma.author.update({ where: { id: parseInt(id) }, data: { nameEn, nameBn } });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.author.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
