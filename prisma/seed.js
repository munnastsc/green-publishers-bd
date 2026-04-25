const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting extensive seed...');

  // 1. Clear existing data
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.category.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.homeSection.deleteMany();

  // 2. Create Categories
  const cats = [
    { nameEn: 'Islamic Books', nameBn: 'ইসলামী বই' },
    { nameEn: 'Novels', nameBn: 'উপন্যাস' },
    { nameEn: 'Science Fiction', nameBn: 'সায়েন্স ফিকশন' },
    { nameEn: 'Technology', nameBn: 'বিজ্ঞান ও প্রযুক্তি' },
    { nameEn: 'History & Traditions', nameBn: 'ইতিহাস ও ঐতিহ্য' },
    { nameEn: 'Self Development', nameBn: 'আত্মউন্নয়ন' },
    { nameEn: 'Kids & Teens', nameBn: 'শিশু-কিশোর' },
    { nameEn: 'Poetry', nameBn: 'কবিতা' }
  ];
  const createdCats = await Promise.all(cats.map(c => prisma.category.create({ data: c })));

  // 3. Create Authors
  const auths = [
    { nameEn: 'Humayun Ahmed', nameBn: 'হুমায়ূন আহমেদ' },
    { nameEn: 'Arif Azad', nameBn: 'আরিফ আজাদ' },
    { nameEn: 'Anisul Hoque', nameBn: 'আনিসুল হক' },
    { nameEn: 'Zafar Iqbal', nameBn: 'মুহম্মদ জাফর ইকবাল' },
    { nameEn: 'Rakib Hasan', nameBn: 'রকিব হাসান' },
    { nameEn: 'Muntasir Mamun', nameBn: 'মুনতাসীর মামুন' }
  ];
  const createdAuths = await Promise.all(auths.map(a => prisma.author.create({ data: a })));

  // 4. Create Publishers
  const pubs = [
    { nameEn: 'Guardian Publications', nameBn: 'গার্ডিয়ান পাবলিকেশনস' },
    { nameEn: 'Anyaprokash', nameBn: 'অন্যপ্রকাশ' },
    { nameEn: 'Somoy Prokashon', nameBn: 'সময় প্রকাশন' },
    { nameEn: 'Prothoma Prokashon', nameBn: 'প্রথমা প্রকাশন' }
  ];
  const createdPubs = await Promise.all(pubs.map(p => prisma.publisher.create({ data: p })));

  // 5. Create 20+ Books
  const books = [
    { titleEn: 'Paradoxical Sajid', titleBn: 'প্যারাডক্সিক্যাল সাজিদ', price: 250, aid: 1, cid: 0, pid: 0, img: 'https://www.rokomari.com/static/200/products/p6/85141.jpg' },
    { titleEn: 'Paradoxical Sajid 2', titleBn: 'প্যারাডক্সিক্যাল সাজিদ ২', price: 280, aid: 1, cid: 0, pid: 0, img: 'https://www.rokomari.com/static/200/products/p4/85144.jpg' },
    { titleEn: 'Bela Furabar Age', titleBn: 'বেলা ফুরাবার আগে', price: 320, aid: 1, cid: 0, pid: 0, img: 'https://www.rokomari.com/static/200/products/p6/186596.jpg' },
    { titleEn: 'Nandito Naroke', titleBn: 'নন্দিত নরকে', price: 150, aid: 0, cid: 1, pid: 1 },
    { titleEn: 'Shonkhonil Karagore', titleBn: 'শঙ্খনীল কারাগার', price: 180, aid: 0, cid: 1, pid: 1 },
    { titleEn: 'Misir Ali Somogro', titleBn: 'মিসির আলি সমগ্র', price: 550, aid: 0, cid: 1, pid: 1 },
    { titleEn: 'Himu Somogro', titleBn: 'হিমু সমগ্র', price: 500, aid: 0, cid: 1, pid: 1 },
    { titleEn: 'Tukunjil', titleBn: 'টুকুঞ্জিল', price: 220, aid: 3, cid: 2, pid: 2 },
    { titleEn: 'Copotron', titleBn: 'কপোট্রন', price: 200, aid: 3, cid: 2, pid: 2 },
    { titleEn: 'Tin Goyenda', titleBn: 'তিন গোয়েন্দা', price: 120, aid: 4, cid: 6, pid: 3 },
    { titleEn: 'Seva Shanti', titleBn: 'সেবা শান্তি', price: 140, aid: 4, cid: 6, pid: 3 },
    { titleEn: 'Maa', titleBn: 'মা', price: 350, aid: 2, cid: 1, pid: 3 },
    { titleEn: 'Alo Andharer Jatri', titleBn: 'আলো আঁধারের যাত্রী', price: 280, aid: 2, cid: 1, pid: 3 },
    { titleEn: 'History of Bengal', titleBn: 'বাংলার ইতিহাস', price: 450, aid: 5, cid: 4, pid: 3 },
    { titleEn: 'Dhaka 1971', titleBn: 'ঢাকা ১৯৭১', price: 400, aid: 5, cid: 4, pid: 2 },
    { titleEn: 'The Alchemist', titleBn: 'দ্য অ্যালকেমিস্ট', price: 300, aid: 0, cid: 5, pid: 1 },
    { titleEn: 'Atomic Habits', titleBn: 'অ্যাটোমিক হ্যাবিটস', price: 350, aid: 1, cid: 5, pid: 0 },
    { titleEn: 'Python Programming', titleBn: 'পাইথন প্রোগ্রামিং', price: 420, aid: 3, cid: 3, pid: 0 },
    { titleEn: 'Web Development with Next.js', titleBn: 'নেক্সট জেএস দিয়ে ওয়েব ডেভেলপমেন্ট', price: 600, aid: 3, cid: 3, pid: 1 },
    { titleEn: 'Islamic Law', titleBn: 'ইসলামী আইন', price: 380, aid: 1, cid: 0, pid: 0 },
    { titleEn: 'Kobi', titleBn: 'কবি', price: 220, aid: 0, cid: 7, pid: 1 }
  ];

  for (const b of books) {
    await prisma.book.create({
      data: {
        titleEn: b.titleEn,
        titleBn: b.titleBn,
        price: b.price,
        authorId: createdAuths[b.aid].id,
        categoryId: createdCats[b.cid].id,
        publisherId: createdPubs[b.pid].id,
        imageUrl: b.img || null,
        description: `This is a great book titled ${b.titleEn}. ${b.titleBn} একটি চমৎকার বই।`
      }
    });
  }

  // 6. Create Menu Items
  await prisma.menuItem.create({ data: { labelEn: 'Home', labelBn: 'হোম', url: '/', order: 1 } });
  await prisma.menuItem.create({ data: { labelEn: 'Books', labelBn: 'বইসমূহ', url: '/books', order: 2 } });
  await prisma.menuItem.create({ data: { labelEn: 'Videos', labelBn: 'ভিডিও', url: '/videos', order: 3 } });
  await prisma.menuItem.create({ data: { labelEn: 'Authors', labelBn: 'লেখক', url: '/authors', order: 4 } });
  await prisma.menuItem.create({ data: { labelEn: 'Categories', labelBn: 'বিষয়', url: '/categories', order: 5 } });

  // 7. Create Home Sections
  await prisma.homeSection.create({ data: { titleEn: 'Newly Released', titleBn: 'সদ্য প্রকাশিত বই', type: 'LATEST', order: 1 } });
  await prisma.homeSection.create({ data: { titleEn: 'Islamic Books', titleBn: 'ইসলামী বই', type: 'CATEGORY', targetId: createdCats[0].id, order: 2 } });
  await prisma.homeSection.create({ data: { titleEn: 'Fiction & Novels', titleBn: 'উপন্যাস ও ফিকশন', type: 'CATEGORY', targetId: createdCats[1].id, order: 3 } });
  await prisma.homeSection.create({ data: { titleEn: 'Science Fiction', titleBn: 'সায়েন্স ফিকশন', type: 'CATEGORY', targetId: createdCats[2].id, order: 4 } });

  console.log('Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
