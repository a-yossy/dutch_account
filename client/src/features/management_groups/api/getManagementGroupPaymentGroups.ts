import useSWR from 'swr';
import { PaymentGroup, PaymentGroupApi } from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetManagementGroupPaymentGroups = (
  managementGroupId: string
) => {
  const fetcher = () =>
    new PaymentGroupApi()
      .getPaymentGroupsByManagementGroupId(managementGroupId, {
        headers: getAuthCookies(),
      })
      .then((res) => res.data);
  const { data, error } = useSWR<PaymentGroup[], AxiosResponseError>(
    `api/v1/management_groups/${managementGroupId}/payment_groups`,
    fetcher
  );

  return { managementGroupPaymentGroups: data, error };
};
