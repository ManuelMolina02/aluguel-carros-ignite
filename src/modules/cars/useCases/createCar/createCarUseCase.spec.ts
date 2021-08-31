import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './createCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name test',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'string',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'name test',
        description: 'description test',
        daily_rate: 100,
        license_plate: 'string',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'name test',
        description: 'description test',
        daily_rate: 100,
        license_plate: 'string',
        fine_amount: 60,
        brand: 'brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'description test',
      daily_rate: 100,
      license_plate: 'ASDQ-1234',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'category',
    });

    console.log(car);

    expect(car.available).toBe(true);
  });
});
