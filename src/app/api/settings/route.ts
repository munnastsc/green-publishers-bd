import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DEFAULT_SETTINGS: Record<string, string> = {
  siteName: 'Green Publishers BD',
  siteTagline: 'Your Trusted Online Bookstore',
  phone: '16297',
  email: 'info@greenpublishersbd.com',
  address: 'Dhaka, Bangladesh',
  rokomariButtonLabel: 'রকমারিতে কিনুন',
  facebookUrl: '#',
  youtubeUrl: '#',
  deliveryChargeDhaka: '70',
  deliveryChargeOutside: '150',
  cashOnDelivery: 'true',
  onlinePayment: 'true',
};

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const result: Record<string, string> = { ...DEFAULT_SETTINGS };
    settings.forEach(s => { result[s.key] = s.value; });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updates = Object.entries(body) as [string, string][];

    for (const [key, value] of updates) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
