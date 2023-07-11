import { useToast } from 'src/hooks/useToast';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { useCallback, Dispatch, SetStateAction } from 'react';
import {
  BulkInsertExpensesByManagementGroupIdAndPaymentGroupIdRequest,
  Expense,
  ExpenseApi,
} from 'src/openapi-generator';
import { UseFormReset } from 'react-hook-form';
import { mutate } from 'swr';

export const useBulkInsertExpenseWithDebtRecords = (
  managementGroupId: string,
  paymentGroupId: string,
  setExpenses: Dispatch<SetStateAction<Expense[]>>,
  reset: UseFormReset<BulkInsertExpensesByManagementGroupIdAndPaymentGroupIdRequest>,
  append: () => void
) => {
  const toast = useToast();
  const bulkInsertExpenseWithDebtRecords = useCallback(
    async (
      params: BulkInsertExpensesByManagementGroupIdAndPaymentGroupIdRequest
    ) => {
      try {
        const response =
          await new ExpenseApi().bulkInsertExpensesByManagementGroupIdAndPaymentGroupId(
            managementGroupId,
            paymentGroupId,
            params,
            { headers: getAuthCookies() }
          );
        setExpenses(response.data);
        reset();
        append();
        await mutate(
          `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}/expenses`
        );
        toast('success', '費用を作成しました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            '費用の作成に失敗しました',
            error.response.data.messages.join('\n')
          );
        }
      }
    },
    [append, managementGroupId, paymentGroupId, reset, setExpenses, toast]
  );

  return bulkInsertExpenseWithDebtRecords;
};
