// Extensões
import 'reflect-metadata';
import express, { NextFunction, Request } from 'express';
import swaggerUI from 'swagger-ui-express';
import 'express-async-errors';

// Rotas/ documentação
import { router } from './routes';
import swaggerFile from './swagger.json';

// Banco de dados
import './database';

import './shared/container';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());

// documentação
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
// Rotas
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${err.message}`,
        });
    },
);

app.listen(3333, () => console.log('Server is running!'));
