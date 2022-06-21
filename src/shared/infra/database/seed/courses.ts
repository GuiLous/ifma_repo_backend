import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const coursesList = [
  'Ciência de Computação',
  'Zootecnia',
  'Ciências Biológicas',
  'Ciências Biológicas (Parfor)',
  'Formação Pedagógica',
  'Formação Pedagógica (UAB)',
  'Pedagogia (UAB)',
  'Matemática',
  'Química',
];

async function main() {
  console.log(`Start Courses seed...`);

  coursesList.forEach(async courseItem => {
    const course = await prisma.course.create({
      data: {
        name: courseItem,
      },
    });

    console.log(`Created course with name:${course.name}!`);
  });

  console.log(`Courses Seed finished.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
