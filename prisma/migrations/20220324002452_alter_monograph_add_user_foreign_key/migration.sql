/*
  Warnings:

  - Added the required column `user_id` to the `monograph` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monograph" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "monograph" ADD CONSTRAINT "monograph_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE SET NULL;
