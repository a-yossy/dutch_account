import { useCallback } from 'react';
import { useToast } from 'src/hooks/useToast';
import {
  BulkInsertPaymentRelationByManagementGroupIdRequest,
  PaymentRelationApi,
} from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { mutate } from 'swr';

export const useBulkUpdatePaymentRelation = (
  managementGroupId: string,
  paymentGroupId: string
) => {
  const toast = useToast();
  const bulkUpdatePaymentRelation = useCallback(
    async (params: BulkInsertPaymentRelationByManagementGroupIdRequest) => {
      try {
        await new PaymentRelationApi().bulkUpdatePaymentRelationByManagementGroupIdAndPaymentGroupId(
          managementGroupId,
          paymentGroupId,
          params,
          { headers: getAuthCookies() }
        );
        await mutate(
          `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}`
        );
        await mutate(
          `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}/payment_affiliations`
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

  return bulkUpdatePaymentRelation;
};
