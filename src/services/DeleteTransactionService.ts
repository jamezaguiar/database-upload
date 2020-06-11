import { getCustomRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    await transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
