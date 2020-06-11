import { Router } from 'express';
// import { getCustomRepository } from 'typeorm';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
import ListTransactionsService from '../services/ListTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const listTransactions = new ListTransactionsService();

  const transactions = await listTransactions.execute();

  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category_title: category,
  });

  const { id, created_at, updated_at } = transaction;

  return response.json({
    id,
    title,
    type,
    value,
    category,
    created_at,
    updated_at,
  });
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute({ id });

  return response.json();
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
