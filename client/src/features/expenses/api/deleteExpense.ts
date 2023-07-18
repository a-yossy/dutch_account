import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useToast } from 'src/hooks/useToast';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { ExpenseApi } from 'src/openapi-generator';

export const useDeleteExpense = (
  management_group_id: string,
  payment_group_id: string,
  expense_id: string
) => {
  const toast = useToast();
  const router = useRouter();
  const deleteExpense = useCallback(async () => {
    try {
      await new ExpenseApi().deleteExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseId(
        management_group_id,
        payment_group_id,
        expense_id,
        { headers: getAuthCookies() }
      );
      toast('success', '費用を削除しました');
      await router.push(`/payment_groups/${payment_group_id}`);
    } catch (error: unknown) {
      if (isResponseError(error)) {
        toast(
          'error',
          '費用の削除に失敗しました',
          error.response.data.messages.join('\n')
        );
      }
    }
  }, [expense_id, management_group_id, payment_group_id, router, toast]);

  return deleteExpense;
};
