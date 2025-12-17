import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const batches = await prisma.batch.findMany();
  console.log('Batches:', batches);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
