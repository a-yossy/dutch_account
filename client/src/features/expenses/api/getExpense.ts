import { ExpenseApi, Expense } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';
import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';

export const useGetExpense = (
  management_group_id: string,
  payment_group_id: string,
  expense_id: string
) => {
  const fetcher = () =>
    new ExpenseApi()
      .getExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseId(
        management_group_id,
        payment_group_id,
        expense_id,
        {
          headers: getAuthCookies(),
        }
      )
      .then((res) => res.data);

  const { data, error } = useSWR<Expense, AxiosResponseError>(
    `api/v1/management_groups/${management_group_id}/payment_groups/${payment_group_id}/expenses/${expense_id}`,
    fetcher
  );

  return { expense: data, error };
};
