import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useToast } from 'src/hooks/useToast';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import {
  BulkInsertPaymentRelationByManagementGroupIdRequest,
  PaymentRelationApi,
} from 'src/openapi-generator';

export const useBulkInsertPaymentRelation = (managementGroupId: string) => {
  const toast = useToast();
  const router = useRouter();
  const bulkInsertPaymentRelation = useCallback(
    async (params: BulkInsertPaymentRelationByManagementGroupIdRequest) => {
      try {
        const response =
          await new PaymentRelationApi().bulkInsertPaymentRelationByManagementGroupId(
            managementGroupId,
            params,
            { headers: getAuthCookies() }
          );
        await router.push(
          `/management_groups/${managementGroupId}/payment_groups/${response.data.group.id}`
        );
        toast('success', '支払グループを作成しました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            '支払グループの作成に失敗しました',
            error.response.data.messages.join('\n')
          );
        }
      }
    },
    [managementGroupId, router, toast]
  );

  return bulkInsertPaymentRelation;
};
