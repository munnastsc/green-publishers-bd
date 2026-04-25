import prisma from '@/lib/prisma';
import AdminDashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  const [bookCount, videoCount, categoryCount, authorCount, orderCount] = await Promise.all([
    prisma.book.count(),
    prisma.video.count(),
    prisma.category.count(),
    prisma.author.count(),
    prisma.order.count(),
  ]);

  return (
    <AdminDashboardClient
      bookCount={bookCount}
      videoCount={videoCount}
      categoryCount={categoryCount}
      authorCount={authorCount}
      orderCount={orderCount}
    />
  );
}
