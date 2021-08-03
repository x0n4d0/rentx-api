import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

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
      throw new Error('Category Already Exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}
