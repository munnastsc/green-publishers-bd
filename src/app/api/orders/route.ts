import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  try {
    const where = userId ? { userId: parseInt(userId) } : {};
    const orders = await prisma.order.findMany({ 
      where,
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, address, totalAmount, items, userId, paymentMethod } = body;
    
    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        address,
        totalAmount: parseFloat(totalAmount),
        items,
        paymentMethod: paymentMethod || 'COD',
        userId: userId ? parseInt(userId) : null,
      }
    });

    // MOCK EMAIL NOTIFICATION
    console.log('--- EMAIL SIMULATION ---');
    console.log(`To: ${customerName} (User ID: ${userId || 'Guest'})`);
    console.log(`Subject: Order Confirmation #${order.id}`);
    console.log(`Message: Thank you for your order of TK. ${totalAmount}. We are processing it.`);
    console.log('------------------------');

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const order = await prisma.order.update({ where: { id: parseInt(id) }, data: { status } });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
