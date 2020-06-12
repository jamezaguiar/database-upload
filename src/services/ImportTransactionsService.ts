/* eslint-disable no-restricted-syntax */
import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

import csvParse from '../utils/csvParse';

export type transactionType = 'income' | 'outcome';

class ImportTransactionsService {
  async execute(fileName: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const data = await csvParse(fileName);

    const transactions: Transaction[] = [];

    for await (const transactionData of data) {
      const title = transactionData[0];
      const type: transactionType = transactionData[1] as transactionType;
      const value = Number(transactionData[2]);
      const category = transactionData[3];

      const transaction = await createTransaction.execute({
        title,
        type,
        value,
        category_title: category,
      });

      transactions.push(transaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
