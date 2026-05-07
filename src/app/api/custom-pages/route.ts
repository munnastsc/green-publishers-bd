import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const pages = await (prisma as any).customPage.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
  });
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  const { slug, titleEn, titleBn, contentEn, contentBn, active, sortOrder } = await req.json();
  try {
    const page = await (prisma as any).customPage.create({
      data: {
        slug: slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        titleEn, titleBn,
        contentEn: contentEn || '',
        contentBn: contentBn || '',
        active: active !== false,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0
      }
    });
    return NextResponse.json(page);
  } catch (e: any) {
    if (e.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { id, slug, titleEn, titleBn, contentEn, contentBn, active, sortOrder } = await req.json();
  try {
    const page = await (prisma as any).customPage.update({
      where: { id: parseInt(id) },
      data: {
        slug: slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        titleEn, titleBn,
        contentEn: contentEn || '',
        contentBn: contentBn || '',
        active: active !== false,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0
      }
    });
    return NextResponse.json(page);
  } catch (e: any) {
    if (e.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await (prisma as any).customPage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
