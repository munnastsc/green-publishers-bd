import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  try {
    if (code) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: code.toUpperCase(), active: true }
      });
      if (!coupon) return NextResponse.json({ error: 'Invalid coupon' }, { status: 404 });
      return NextResponse.json(coupon);
    }
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { code, discountType, value, active } = await request.json();
    const coupon = await prisma.coupon.create({
      data: { code: code.toUpperCase(), discountType, value: parseFloat(value), active }
    });
    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.coupon.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
