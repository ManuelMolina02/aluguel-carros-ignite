// Importando funcionalidade do express
import { Router } from 'express';

// importando modelo de Array[categorias]
import { CategoriesRepository } from '../repositories/CategoriesRepository';

// ativando express
const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// criando rota de categoria
categoriesRoutes.post('/', (request, response) => {
    // receber dados do req body
    const { name, description } = request.body;

    categoriesRepository.create({ name, description });
    // retornar status e objeto json
    return response.status(201).send();
});

// listando categorias
categoriesRoutes.get('/', (request, response) => {
    const all = categoriesRepository.list();
    return response.json(all);
});

export { categoriesRoutes };
