import prisma from '@/lib/prisma';
import BooksClient from './BooksClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Books - Green Publishers BD',
};

export const dynamic = 'force-dynamic';

export default async function BooksPage() {
  const [books, categories, authors, publishers, settingsRaw] = await Promise.all([
    prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true, category: true, publisher: true }
    }),
    prisma.category.findMany(),
    prisma.author.findMany(),
    prisma.publisher.findMany({ orderBy: { nameEn: 'asc' } }),
    prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            'featuredPublisherId',
            'featuredPublisherSectionEn',
            'featuredPublisherSectionBn',
            'otherPublishersSectionEn',
            'otherPublishersSectionBn',
          ]
        }
      }
    })
  ]);

  const settings: Record<string, string> = {};
  settingsRaw.forEach(s => { settings[s.key] = s.value; });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BooksClient
        books={books}
        categories={categories}
        authors={authors}
        publishers={publishers}
        featuredPublisherId={settings.featuredPublisherId ? parseInt(settings.featuredPublisherId) : null}
        featuredSectionEn={settings.featuredPublisherSectionEn || 'Green Publishers Books'}
        featuredSectionBn={settings.featuredPublisherSectionBn || 'গ্রিন পাবলিশার্স বই'}
        otherSectionEn={settings.otherPublishersSectionEn || 'Other Publishers Books'}
        otherSectionBn={settings.otherPublishersSectionBn || 'অন্যান্য প্রকাশনীর বই'}
      />
    </Suspense>
  );
}
