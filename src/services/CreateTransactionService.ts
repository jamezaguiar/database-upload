import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_title: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_title,
  }: RequestDTO): Promise<Transaction> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Transaction type must be income or outcome');
    }

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('Insufficient funds');
    }

    const category = await categoriesRepository.verifyIfCategoryExists(
      category_title,
    );

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: category.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
