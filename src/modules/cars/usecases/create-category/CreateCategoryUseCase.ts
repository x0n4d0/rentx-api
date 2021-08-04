import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const hasOneCategoryWithThisName =
      await this.categoriesRepository.findByName(name);

    if (hasOneCategoryWithThisName) {
      throw new AppError('Category Already Exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}
