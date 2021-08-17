import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        // receber dados do req body
        const { name, description } = request.body;

        this.createCategoryUseCase.execute({ name, description });

        // retornar status e objeto json
        return response.status(201).send();
    }
}

export { CreateCategoryController };
