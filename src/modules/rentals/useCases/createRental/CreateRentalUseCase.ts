import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimunHour = 24;

    const rentalOpenToCar = await this.rentalRepository.findOpenRentalByCar(
      car_id,
    );

    if (rentalOpenToCar) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const dateCompare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (dateCompare < minimunHour) {
      throw new AppError(
        'Invalid return time! Difference between hours must be greater than 24 hours ',
      );
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
