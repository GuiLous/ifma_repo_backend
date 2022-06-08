interface ICreateMonographDTO {
  title: string;
  authors: string;
  authors_emails: string;
  advisor: string;
  advisor_lattes?: string;
  published_date: Date;
  published_local: string;
  resumo: string;
  palavras_chave: string;
  number_pages: number;
  pdf_url?: string;
  knowledge_id: string;
  course_id: string;
  user_id: string;
}

export { ICreateMonographDTO };
