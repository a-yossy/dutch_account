import useSWR from 'swr';
import { PaymentGroup, PaymentGroupApi } from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetPaymentGroups = (managementGroupId: string | undefined) => {
  const fetcher =
    typeof managementGroupId === 'string'
      ? () =>
          new PaymentGroupApi()
            .getPaymentGroupsByManagementGroupId(managementGroupId, {
              headers: getAuthCookies(),
            })
            .then((res) => res.data)
      : null;
  const { data, error } = useSWR<PaymentGroup[], AxiosResponseError>(
    typeof managementGroupId === 'string'
      ? `api/v1/management_groups/${managementGroupId}/payment_groups`
      : null,
    fetcher
  );

  return { paymentGroups: data, error };
};
