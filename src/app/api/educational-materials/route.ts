import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const items = await (prisma as any).educationalMaterial.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const { titleEn, titleBn, descriptionEn, descriptionBn, imageUrl, fileUrl, sortOrder } = await req.json();
  const item = await (prisma as any).educationalMaterial.create({
    data: {
      titleEn,
      titleBn,
      descriptionEn: descriptionEn || null,
      descriptionBn: descriptionBn || null,
      imageUrl: imageUrl || null,
      fileUrl: fileUrl || null,
      sortOrder: sortOrder ? parseInt(sortOrder) : 0
    }
  });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  const { id, titleEn, titleBn, descriptionEn, descriptionBn, imageUrl, fileUrl, sortOrder } = await req.json();
  const item = await (prisma as any).educationalMaterial.update({
    where: { id: parseInt(id) },
    data: {
      titleEn,
      titleBn,
      descriptionEn: descriptionEn || null,
      descriptionBn: descriptionBn || null,
      imageUrl: imageUrl || null,
      fileUrl: fileUrl || null,
      sortOrder: sortOrder ? parseInt(sortOrder) : 0
    }
  });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await (prisma as any).educationalMaterial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
