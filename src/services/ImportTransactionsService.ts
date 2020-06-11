import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

import csvParse from '../utils/csvParse';

class ImportTransactionsService {
  async execute(fileName: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const data = await csvParse(fileName);

    /* const newTransactions = data.map(async transactionData => {
      const transactions: Transaction[] = [];
      const [title, type, value, category] = transactionData;

      const transaction = await createTransaction.execute({
        title,
        type,
        value,
        category_title: category,
      });

      transactions.push(transaction);
      return transactions;
    });

    return newTransactions; */
  }
}

export default ImportTransactionsService;
