import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const knowledges_areas_list = [
  'Ciências Exatas e da Terra ',
  'Ciências Biológicas',
  'Engenharias',
  'Ciências da Saúde',
  'Ciências Agrárias',
  'Ciências Sociais Aplicadas',
  'Ciências Humanas',
  'Linguística, Letras e Artes',
];

async function main() {
  console.log(`Start Knowledges Areas seed...`);

  knowledges_areas_list.forEach(async knowledge_areaItem => {
    const knowledge_area = await prisma.knowledge_Area.create({
      data: {
        name: knowledge_areaItem,
      },
    });

    console.log(`Knowledge Area course with name:${knowledge_area.name}!`);
  });

  console.log(`Knowledges Areas Seed finished.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
