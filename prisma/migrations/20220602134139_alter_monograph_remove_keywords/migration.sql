/*
  Warnings:

  - You are about to drop the column `keyWords` on the `monograph` table. All the data in the column will be lost.
  - The `authors` column on the `monograph` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `palavras_chave` column on the `monograph` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `authors_emails` column on the `monograph` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "monograph" DROP COLUMN "keyWords",
DROP COLUMN "authors",
ADD COLUMN     "authors" TEXT[],
DROP COLUMN "palavras_chave",
ADD COLUMN     "palavras_chave" TEXT[],
DROP COLUMN "authors_emails",
ADD COLUMN     "authors_emails" TEXT[];
