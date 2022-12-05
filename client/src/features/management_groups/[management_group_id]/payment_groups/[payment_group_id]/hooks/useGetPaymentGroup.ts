import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { PaymentGroup, PaymentGroupApi } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetPaymentGroup = (
  managementGroupId: string,
  paymentGroupId: string
) => {
  const fetcher = () =>
    new PaymentGroupApi()
      .getPaymentGroupByManagementGroupIdAndPaymentGroupId(
        managementGroupId,
        paymentGroupId,
        {
          headers: getAuthCookies(),
        }
      )
      .then((res) => res.data);

  const { data, error } = useSWR<PaymentGroup, AxiosResponseError>(
    `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}`,
    fetcher
  );

  return { paymentGroup: data, error };
};
