/*
  Warnings:

  - You are about to drop the column `abstract` on the `monograph` table. All the data in the column will be lost.
  - You are about to drop the column `coAdvisors` on the `monograph` table. All the data in the column will be lost.
  - You are about to drop the column `references` on the `monograph` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "monograph" DROP COLUMN "abstract",
DROP COLUMN "coAdvisors",
DROP COLUMN "references",
ADD COLUMN     "advisor_lattes" TEXT,
ADD COLUMN     "authors_emails" TEXT,
ADD COLUMN     "comments_if_not_accept" TEXT;
