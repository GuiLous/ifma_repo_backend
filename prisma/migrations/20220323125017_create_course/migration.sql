/*
  Warnings:

  - Added the required column `course_id` to the `monography` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monography" ADD COLUMN     "course_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "monography" ADD CONSTRAINT "monography_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE SET NULL;
