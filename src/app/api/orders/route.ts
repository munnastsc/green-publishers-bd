import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin } from '@/lib/email';

async function getSmtpConfig() {
  const keys = ['smtpHost', 'smtpPort', 'smtpUser', 'smtpPass', 'adminEmail'];
  const rows = await prisma.siteSetting.findMany({ where: { key: { in: keys } } });
  const map: Record<string, string> = {};
  rows.forEach(r => { map[r.key] = r.value; });
  return {
    host: map.smtpHost || process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(map.smtpPort || process.env.SMTP_PORT || '587'),
    user: map.smtpUser || process.env.SMTP_USER || '',
    pass: map.smtpPass || process.env.SMTP_PASS || '',
    adminEmail: map.adminEmail || process.env.SMTP_USER || '',
  };
}

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
    const { customerName, customerPhone, address, totalAmount, items, userId, paymentMethod, customerEmail } = body;

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

    const smtp = await getSmtpConfig();

    if (smtp.user && smtp.pass) {
      // Notify admin
      if (smtp.adminEmail) {
        sendOrderNotificationToAdmin({
          smtp,
          adminEmail: smtp.adminEmail,
          customerName,
          customerPhone,
          orderId: order.id,
          items,
          totalAmount: parseFloat(totalAmount),
          address,
          paymentMethod: paymentMethod || 'COD',
        }).catch(console.error);
      }

      // Confirm to customer
      const emailToSend = customerEmail || (userId
        ? (await prisma.user.findUnique({ where: { id: parseInt(userId) }, select: { email: true } }))?.email
        : null);
      if (emailToSend) {
        sendOrderConfirmationToCustomer({
          smtp,
          customerEmail: emailToSend,
          customerName,
          orderId: order.id,
          items,
          totalAmount: parseFloat(totalAmount),
          address,
        }).catch(console.error);
      }
    }

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
