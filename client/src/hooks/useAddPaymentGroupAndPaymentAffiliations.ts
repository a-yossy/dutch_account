import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useToast } from 'src/hooks/useToast';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import {
  AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequest,
  PaymentGroupApi,
} from 'src/openapi-generator';

export const useAddPaymentGroupAndPaymentAffiliations = (
  managementGroupId: string
) => {
  const toast = useToast();
  const router = useRouter();
  const addPaymentGroupAndPaymentAffiliations = useCallback(
    async (
      params: AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequest
    ) => {
      try {
        const response =
          await new PaymentGroupApi().addPaymentGroupAndPaymentAffiliationsByManagementGroupId(
            managementGroupId,
            params,
            { headers: getAuthCookies() }
          );
        await router.push(
          `/management_groups/${managementGroupId}/payment_groups/${response.data.payment_group.id}`
        );
        toast('success', '作成しました');
      } catch (error: unknown) {
        if (isResponseError(error)) {
          toast(
            'error',
            '作成できませんでした',
            error.response.data.messages.join('\n')
          );
        }
      }
    },
    [managementGroupId, router, toast]
  );

  return addPaymentGroupAndPaymentAffiliations;
};
