import { inject, injectable } from 'tsyringe';

import { IMonographsRepository } from '@modules/monographs/repositories/IMonographsRepository';
import { Monograph } from '@prisma/client';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  monograph_id: string;
  pdf_file: string;
}

@injectable()
class UploadPdfUseCase {
  constructor(
    @inject('MonographsRepository')
    private monographsRepository: IMonographsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ pdf_file, monograph_id }: IRequest): Promise<void> {
    const monograph = await this.monographsRepository.findById(monograph_id);

    if (!monograph) {
      throw new AppError('Monograph does not exists!');
    }

    if (monograph.pdf_url) {
      await this.storageProvider.delete(monograph.pdf_url, 'pdf');
    }

    await this.storageProvider.save(pdf_file, 'pdf');

    monograph.pdf_url = pdf_file;

    await this.monographsRepository.update(monograph);
  }
}

export { UploadPdfUseCase };
