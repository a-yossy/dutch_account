import { useToast } from 'src/hooks/useToast';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { useCallback, Dispatch, SetStateAction } from 'react';
import {
  BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequest,
  ExpenseWithDebtRecordsApi,
  Expense,
} from 'src/openapi-generator';
import { UseFormReset } from 'react-hook-form';

export const useBulkInsertExpenseWithDebtRecords = (
  managementGroupId: string,
  paymentGroupId: string,
  setExpenses: Dispatch<SetStateAction<Expense[]>>,
  reset: UseFormReset<BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequest>,
  append: () => void
) => {
  const toast = useToast();
  const bulkInsertExpenseWithDebtRecords = useCallback(
    async (
      params: BulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupIdRequest
    ) => {
      try {
        const response =
          await new ExpenseWithDebtRecordsApi().bulkInsertExpenseWithDebtRecordsByManagementGroupIdAndPaymentGroupId(
            managementGroupId,
            paymentGroupId,
            params,
            { headers: getAuthCookies() }
          );
        setExpenses(response.data);
        reset();
        append();
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
