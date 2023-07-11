import { Expense } from 'src/openapi-generator';

export const bulkInsertExpensesResponse: Expense[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: '太郎',
    },
    payment_group: {
      id: '1',
      name: 'group1',
    },
    amount_of_money: 1000,
    description: '食費',
    paid_on: '2021-01-01',
    is_paid: false,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: '次郎',
    },
    payment_group: {
      id: '1',
      name: 'group1',
    },
    amount_of_money: 2000,
    description: '水道代',
    paid_on: '2021-01-01',
    is_paid: false,
  },
];

export const getExpenseResponse: Expense = {
  id: '1',
  user: {
    id: '1',
    name: '太郎',
  },
  payment_group: {
    id: '1',
    name: 'group1',
  },
  amount_of_money: 1000,
  description: '食費',
  paid_on: '2021-01-01',
  is_paid: false,
};
