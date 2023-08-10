import { useToast } from 'src/hooks/useToast';
import { useRouter } from 'next/router';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { isResponseError } from 'src/libs/isResponseError';
import { PaymentGroupApi } from 'src/openapi-generator';
import { useCallback } from 'react';

export const useDeletePaymentGroup = (
  managementGroupId: string,
  paymentGroupId: string
) => {
  const toast = useToast();
  const router = useRouter();
  const deletePaymentGroup = useCallback(async () => {
    try {
      await new PaymentGroupApi().deletePaymentGroupByManagementGroupIdAndPaymentGroupId(
        managementGroupId,
        paymentGroupId,
        { headers: getAuthCookies() }
      );
      toast('success', '支払グループを削除しました');
      await router.push('/management_group');
    } catch (error: unknown) {
      if (isResponseError(error)) {
        toast(
          'error',
          '支払グループの削除に失敗しました',
          error.response.data.messages.join('\n')
        );
      }
    }
  }, [managementGroupId, paymentGroupId, router, toast]);

  return deletePaymentGroup;
};
