import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

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
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // user exists?

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('Email incorrect');
        }

        const passwordMath = await compare(password, user.password);

        if (!passwordMath) {
            throw new Error('Password incorrect');
        }

        const token = sign({}, '8f44d5607a212c657178658ed9d5373b', {
            subject: user.id,
            expiresIn: '1d',
        });
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };