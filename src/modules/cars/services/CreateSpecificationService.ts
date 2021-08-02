import { ISpecificationsRepository } from '../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const hasSpecificationWithThisName =
      this.specificationsRepository.findByName(name);

    if (hasSpecificationWithThisName) {
      throw new Error('Specification Already Exists!');
    }

    this.specificationsRepository.create({ name, description });
  }
}
