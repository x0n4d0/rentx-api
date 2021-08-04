import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or passord is incorrect!');
    }

    const isTheSamePassword = await compare(password, user.password);

    if (!isTheSamePassword) {
      throw new AppError('Email or passord is incorrect!');
    }

    const token = sign({}, '110eff7d40a3779f4513c1be6f8fffcf', {
      subject: user.id,
      expiresIn: '1d',
    });

    const responseWithUserInfoAndToken: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return responseWithUserInfoAndToken;
  }
}
