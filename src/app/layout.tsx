import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Green Publishers BD',
  description: 'Your trusted partner for books and video lessons in Bangladesh.',
};

const DEFAULT_MENUS = [
  { id: 1, labelEn: 'Books', labelBn: 'বইসমূহ', url: '/books', order: 1 },
  { id: 2, labelEn: 'Authors', labelBn: 'লেখক', url: '/authors', order: 2 },
  { id: 3, labelEn: 'Videos', labelBn: 'ভিডিও', url: '/videos', order: 3 },
  { id: 4, labelEn: 'Audio', labelBn: 'অডিও', url: '/audio', order: 4 },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let menus: any[] = [];
  try {
    menus = await prisma.menuItem.findMany({ orderBy: { order: 'asc' } });
  } catch {}

  const navMenus = menus.length > 0 ? menus : DEFAULT_MENUS;

  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Navbar initialMenus={navMenus} />
            <main style={{ minHeight: 'calc(100vh - 80px - 300px)' }}>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
