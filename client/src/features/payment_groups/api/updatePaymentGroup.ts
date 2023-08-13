import { useCallback } from 'react';
import { useToast } from 'src/hooks/useToast';
import {
  UpdatePaymentGroupByManagementGroupIdAndPaymentGroupIdRequest,
  PaymentGroupApi,
} from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { mutate } from 'swr';

export const useUpdatePaymentGroup = (
  managementGroupId: string,
  paymentGroupId: string
) => {
  const toast = useToast();
  const updatePaymentGroup = useCallback(
    async (
      params: UpdatePaymentGroupByManagementGroupIdAndPaymentGroupIdRequest
    ) => {
      try {
        await new PaymentGroupApi().updatePaymentGroupByManagementGroupIdAndPaymentGroupId(
          managementGroupId,
          paymentGroupId,
          params,
          { headers: getAuthCookies() }
        );
        void mutate(
          `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}`
        );
        toast('success', '支払グループを更新しました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            '支払グループの更新に失敗しました',
            error.response.data.messages.join('\n')
          );
        }
      }
    },
    [managementGroupId, paymentGroupId, toast]
  );

  return updatePaymentGroup;
};
