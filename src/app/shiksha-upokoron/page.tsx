import MaterialsClient from './MaterialsClient';

async function getMaterials() {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const items = await (prisma as any).educationalMaterial.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }]
    });
    await prisma.$disconnect();
    return items;
  } catch {
    return [];
  }
}

export default async function ShikshaUpokoronPage() {
  const items = await getMaterials();
  return <MaterialsClient items={items} />;
}
