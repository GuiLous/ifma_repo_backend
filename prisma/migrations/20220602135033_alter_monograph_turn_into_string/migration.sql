-- AlterTable
ALTER TABLE "monograph" ALTER COLUMN "authors" SET NOT NULL,
ALTER COLUMN "authors" SET DATA TYPE TEXT,
ALTER COLUMN "palavras_chave" SET NOT NULL,
ALTER COLUMN "palavras_chave" SET DATA TYPE TEXT,
ALTER COLUMN "authors_emails" SET NOT NULL,
ALTER COLUMN "authors_emails" SET DATA TYPE TEXT;
