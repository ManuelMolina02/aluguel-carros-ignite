// Importando funcionalidade do express
import { Router } from 'express';
import multer from 'multer';

// importando modelo de Array[categorias]
import { createCategoryController } from '../modules/cars/useCases/createCategory/index';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
// ativando express
const categoriesRoutes = Router();
const upload = multer({
    dest: './tmp',
});

// criando rota de categoria
categoriesRoutes.post('/', (request, response) => {
    return createCategoryController.handle(request, response);
});

// listando categorias
categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
