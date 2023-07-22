import { useToast } from 'src/hooks/useToast';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { useCallback } from 'react';
import { DebtRecordApi } from 'src/openapi-generator';
import { mutate } from 'swr';

export const useMarkDebtRecordsAsPaid = (managementGroupId: string) => {
  const toast = useToast();
  const markDebtRecordsAsPaid = useCallback(async () => {
    try {
      await new DebtRecordApi().markDebtRecordsAsPaidByManagementGroupId(
        managementGroupId,
        { headers: getAuthCookies() }
      );
      await mutate(
        `api/v1/management_groups/${managementGroupId}/total_borrowing_and_lendings`
      );
      toast('success', '支払が完了しました');
    } catch (error: unknown) {
      if (isResponseError(error)) {
        toast(
          'error',
          '支払完了に失敗しました',
          error.response.data.messages.join('\n')
        );
      }
    }
  }, [managementGroupId, toast]);

  return markDebtRecordsAsPaid;
};
