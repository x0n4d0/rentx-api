import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const hasOneUserWithThisSameEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (hasOneUserWithThisSameEmail) {
      throw new AppError('This Email Already Existis!');
    }

    const hashedPassword = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
      driver_license,
    });
  }
}
