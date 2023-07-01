import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { Expense, ExpenseApi } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';
import useSWR from 'swr';

export const useGetPaymentGroupExpenses = (
  managementGroupId: string,
  paymentGroupId: string
) => {
  const fetcher = () =>
    new ExpenseApi()
      .getExpensesByManagementGroupIdAndPaymentGroupId(
        managementGroupId,
        paymentGroupId,
        { headers: getAuthCookies() }
      )
      .then((res) => res.data);
  const { data, error } = useSWR<Expense[], AxiosResponseError>(
    `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}/expenses`,
    fetcher
  );

  return { paymentGroupExpenses: data, error };
};
