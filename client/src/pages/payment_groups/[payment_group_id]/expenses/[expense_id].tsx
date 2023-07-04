import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import { Expense } from 'src/features/expenses';

const ExpensePage: NextPage = () => {
  const router = useRouter();
  const { payment_group_id: paymentGroupId, expense_id: expenseId } =
    router.query;

  if (typeof paymentGroupId !== 'string' || typeof expenseId !== 'string')
    return <Spinner />;

  return <Expense paymentGroupId={paymentGroupId} expenseId={expenseId} />;
};

export default ExpensePage;
