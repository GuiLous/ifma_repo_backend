import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadPdfUseCase } from './UploadPdfUseCase';

class UploadPdfController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    // const monograph_id = '9808de17-b8d7-4f14-b582-99ed819779ad';

    const pdf_file = request.file.filename;
    const uploadPdfUseCase = container.resolve(UploadPdfUseCase);

    await uploadPdfUseCase.execute({
      pdf_file,
      monograph_id: id,
    });

    return response.status(204).send();
  }
}

export { UploadPdfController };
