-- CreateTable
CREATE TABLE "monography" (
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
    "number_pages" TEXT NOT NULL,
    "knowledge_id" TEXT NOT NULL,
    "references" TEXT NOT NULL,
    "pdf_url" TEXT NOT NULL,

    CONSTRAINT "monography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knowledge_area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_area_name_key" ON "knowledge_area"("name");

-- AddForeignKey
ALTER TABLE "monography" ADD CONSTRAINT "monography_knowledge_id_fkey" FOREIGN KEY ("knowledge_id") REFERENCES "knowledge_area"("id") ON DELETE SET NULL ON UPDATE SET NULL;
