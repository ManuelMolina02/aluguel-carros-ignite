import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  // antes de testar execute
  beforeEach(() => {
    // fazer repositório de usuário
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    // criar um usuario
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    // autenticar usuário
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      name: 'User Test',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    console.log(result);

    expect(result).toHaveProperty('token');
  });

  it('Should NOT be able to authenticate an none existent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@gmail.com',
        password: 'kakakaka',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should NOT be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '9999',
        email: 'user@gmail.com',
        password: '12345',
        name: 'User Test Error',
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'kakaka',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
