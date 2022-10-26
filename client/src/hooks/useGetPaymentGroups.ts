import useSWR from 'swr';
import { PaymentGroup, PaymentGroupApi } from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetPaymentGroups = (id: string | undefined) => {
  const fetcher =
    typeof id === 'string'
      ? () =>
          new PaymentGroupApi()
            .getPaymentGroupsByManagementGroupId(id, {
              headers: getAuthCookies(),
            })
            .then((res) => res.data)
      : null;
  const { data, error } = useSWR<PaymentGroup[], AxiosResponseError>(
    typeof id === 'string'
      ? 'api/v1/management_groups/id/payment_groups'
      : null,
    fetcher
  );

  return { paymentGroups: data, error };
};
