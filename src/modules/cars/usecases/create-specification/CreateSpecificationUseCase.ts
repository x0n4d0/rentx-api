import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const hasSpecificationWithThisName =
      await this.specificationsRepository.findByName(name);

    if (hasSpecificationWithThisName) {
      throw new AppError('Specification Already Exists!');
    }

    await this.specificationsRepository.create({ name, description });
  }
}
