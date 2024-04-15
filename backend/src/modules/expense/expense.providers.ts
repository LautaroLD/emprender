import { Expense } from './expense.entity';

export const expenseProviders = [
  {
    provide: 'EXPENSE_REPOSITORY',
    useValue: Expense,
  },
];
