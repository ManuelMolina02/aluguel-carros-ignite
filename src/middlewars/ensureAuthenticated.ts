import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // Bearer 123uh6523u3423u2h4u1h412345uhu6uh

  const authHeader = request.headers.authorization;
  // validando se o dado existe
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  // desestruturar objeto authHeader
  // split quebra o texto e para cada 'espaço' irá gerar um novo objeto
  // const armazena token = posição 1 do array
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '8f44d5607a212c657178658ed9d5373b',
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
