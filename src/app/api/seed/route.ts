import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Seed Categories
    const categories = [
      { nameEn: 'Academic', nameBn: 'একাডেমিক' },
      { nameEn: 'Fiction', nameBn: 'ফিকশন' },
      { nameEn: 'Islamic', nameBn: 'ইসলামিক' },
      { nameEn: 'Programming', nameBn: 'প্রোগ্রামিং' },
    ];

    for (const cat of categories) {
      const exists = await prisma.category.findFirst({ where: { nameEn: cat.nameEn } });
      if (!exists) {
        await prisma.category.create({ data: cat });
      }
    }

    // Seed Initial Home Sections
    const homeSections = [
      { titleEn: 'Latest Arrivals', titleBn: 'নতুন সংযোজন', type: 'LATEST', order: 1 },
      { titleEn: 'Best Sellers', titleBn: 'সেরা বিক্রিত', type: 'LATEST', order: 2 },
    ];

    for (const section of homeSections) {
      const existing = await prisma.homeSection.findFirst({ where: { titleEn: section.titleEn } });
      if (!existing) {
        await prisma.homeSection.create({ data: section });
      }
    }

    // Seed a few books to make sure sections aren't empty
    const bookExists = await prisma.book.findFirst();
    if (!bookExists) {
        await prisma.book.create({
            data: {
                titleEn: 'Sample Book',
                titleBn: 'নমুনা বই',
                price: 250,
                description: 'Demo description',
                type: 'LATEST'
            }
        });
    }

    return NextResponse.json({ message: 'Seeding complete' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
