/*
  Warnings:

  - You are about to drop the `monography` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "monography" DROP CONSTRAINT "monography_course_id_fkey";

-- DropForeignKey
ALTER TABLE "monography" DROP CONSTRAINT "monography_knowledge_id_fkey";

-- DropTable
DROP TABLE "monography";

-- CreateTable
CREATE TABLE "monograph" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "advisor" TEXT NOT NULL,
    "coAdvisors" TEXT,
    "published_date" TIMESTAMP(3) NOT NULL,
    "published_local" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "keyWords" TEXT NOT NULL,
    "number_pages" INTEGER NOT NULL,
    "references" TEXT NOT NULL,
    "pdf_url" TEXT,
    "knowledge_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "monograph_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "monograph" ADD CONSTRAINT "monograph_knowledge_id_fkey" FOREIGN KEY ("knowledge_id") REFERENCES "knowledge_area"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "monograph" ADD CONSTRAINT "monograph_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE SET NULL;
