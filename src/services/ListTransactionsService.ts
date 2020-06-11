import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ResponseDTO {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionService {
  public async execute(): Promise<ResponseDTO> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionsRepository.find({
      select: ['id', 'title', 'type', 'value', 'created_at', 'updated_at'],
      relations: ['category'],
    });
    const balance = await transactionsRepository.getBalance();

    return { transactions, balance };
  }
}

export default ListTransactionService;
