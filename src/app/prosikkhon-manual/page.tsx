import ManualClient from './ManualClient';

async function getManuals() {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const items = await (prisma as any).trainingManual.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
    });
    await prisma.$disconnect();
    return items;
  } catch {
    return [];
  }
}

export default async function ProsikkhonManualPage() {
  const items = await getManuals();
  return <ManualClient items={items} />;
}
