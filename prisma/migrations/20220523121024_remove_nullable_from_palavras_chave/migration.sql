/*
  Warnings:

  - Made the column `palavras_chave` on table `monograph` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "monograph" ALTER COLUMN "palavras_chave" SET NOT NULL;
