/* --------------------> TESTE UNITARIO <-------------------- */

import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

// descrição de um conjunto de testes
describe('Create category', () => {
  // antes de iniciar execute:
  // instanciar criação de categoria e respositório
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  // deve ser capaz de criar uma nova categoria
  it('Should be able to create a new category', async () => {
    // objeto de categoria teste
    const category = {
      name: 'Category Test',
      description: 'Category descriprion test',
    };

    // execute o objeto em createCategorUseCase para criar uma categoria
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    // validar se categoria foi criada
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    // espere que a categoria criada tenha a propriedade 'id'
    expect(categoryCreated).toHaveProperty('id');
    // espere que a categoria criada tenha o nome igual ao definido
    expect(categoryCreated.name).toBe(category.name);
    // espere que a categoria criada tenha a descrição igual a definido
    expect(categoryCreated.description).toBe(category.description);
  });

  // NÃO deve ser capaz de criar uma nova categoria com o mesmo nome
  it('Should NOT be able to create a new category with name exists', async () => {
    // espere que esta instancia seja rejeitada com um retorno do tipo AppError
    expect(async () => {
      // objeto de categoria teste
      const category = {
        name: 'Category Test',
        description: 'Category descriprion test',
      };

      // execute o objeto em createCategorUseCase para criar uma categoria
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      // criar de novo a mesma categoria
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
