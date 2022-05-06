interface ICreateMonographDTO {
  title: string;
  authors: string;
  advisor: string;
  coAdvisors?: string;
  published_date: Date;
  published_local: string;
  resumo: string;
  abstract: string;
  palavras_chave: string;
  keyWords: string;
  number_pages: number;
  references: string;
  pdf_url?: string;
  knowledge_id: string;
  course_id: string;
  user_id: string;
}

export { ICreateMonographDTO };
