import { hash } from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start admin seed...`);

  const passwordHash = await hash('biblioteca@ifma', 8);
  const user = await prisma.user.create({
    data: {
      email: 'biblioteca@ifma.edu.br',
      password: passwordHash,
      fullName: 'Biblioteca admin user',
      email_confirmed: true,
      isAdmin: true,
    },
  });

  console.log('Created user admin!');

  console.log(`Admin Seed finished.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
