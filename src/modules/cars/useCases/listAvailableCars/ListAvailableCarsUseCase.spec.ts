import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi TT',
      description: 'Carro tentado de lazarentiado',
      license_plate: 'AAS-2121',
      fine_amount: 100.0,
      category_id: '9145eab7-f262-4532-b130-c307fcb4fb3f',
      brand: 'Audi',
      daily_rate: 115.0,
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi TT',
      description: 'Carro tentado de lazarentiado',
      license_plate: 'AAS-8578',
      fine_amount: 100.0,
      category_id: '9145eab7-f262-4532-b130-c307fcb4fb3f',
      brand: 'Audi',
      daily_rate: 115.0,
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Audi',
    });

    console.log('filter car by brand: ', cars);
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi TST',
      description: 'Carro tentado de lazarentiado',
      license_plate: 'AAS-9865',
      fine_amount: 100.0,
      category_id: '9145eab7-f262-4532-b130-c307fcb4fb3f',
      brand: 'Audi',
      daily_rate: 115.0,
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Audi TST',
    });

    console.log('filter car by name: ', cars);
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi TST',
      description: 'Carro tentado de lazarentiado',
      license_plate: 'AAS-9865',
      fine_amount: 100.0,
      category_id: '123456',
      brand: 'Audi',
      daily_rate: 115.0,
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '123456',
    });

    console.log('filter car by category_id: ', cars);
    expect(cars).toEqual([car]);
  });
});
