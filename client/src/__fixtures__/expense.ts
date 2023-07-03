import { Expense } from 'src/openapi-generator';

export const bulkInsertExpenseWithDebtRecordsResponse: Expense[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: '太郎',
    },
    payment_group_id: '1',
    amount_of_money: 1000,
    description: '食費',
    paid_on: '2021-01-01',
  },
  {
    id: '2',
    user: {
      id: '2',
      name: '次郎',
    },
    payment_group_id: '1',
    amount_of_money: 2000,
    description: '水道代',
    paid_on: '2021-01-01',
  },
];
