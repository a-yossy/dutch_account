import { useCallback } from 'react';
import { useToast } from 'src/hooks/useToast';
import {
  UpdateExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseIdRequest,
  ExpenseApi,
} from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { mutate } from 'swr';
import { isResponseError } from 'src/libs/isResponseError';

export const useUpdateExpense = (
  managementGroupId: string,
  paymentGroupId: string,
  expenseId: string
) => {
  const toast = useToast();
  const updateExpense = useCallback(
    async (
      params: UpdateExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseIdRequest
    ) => {
      try {
        await new ExpenseApi().updateExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseId(
          managementGroupId,
          paymentGroupId,
          expenseId,
          params,
          { headers: getAuthCookies() }
        );
        await mutate(
          `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}/expenses/${expenseId}`
        );
        toast('success', '費用を更新しました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            '費用の更新に失敗しました',
            error.response.data.messages.join('\n')
          );
        }
      }
    },
    [expenseId, managementGroupId, paymentGroupId, toast]
  );

  return updateExpense;
};
