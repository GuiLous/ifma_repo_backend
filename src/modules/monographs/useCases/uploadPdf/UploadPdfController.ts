import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadPdfUseCase } from './UploadPdfUseCase';

class UploadPdfController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const { monograph_id } = request.body;
    const monograph_id = '79d1ced3-08a2-4cbf-bd6a-394f6fd3e512';

    const pdf_file = request.file.filename;
    const uploadPdfUseCase = container.resolve(UploadPdfUseCase);

    await uploadPdfUseCase.execute({
      pdf_file,
      monograph_id,
    });

    return response.status(204).send();
  }
}

export { UploadPdfController };
