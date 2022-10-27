import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import {
  PaymentAffiliationApi,
  PaymentAffiliationUser,
} from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetPaymentAffiliationUsers = (
  managementGroupId: string,
  paymentGroupId: string | undefined
) => {
  const fetcher =
    typeof paymentGroupId === 'string'
      ? () =>
          new PaymentAffiliationApi()
            .getPaymentAffiliationUsersByManagementGroupIdAndPaymentGroupId(
              managementGroupId,
              paymentGroupId,
              { headers: getAuthCookies() }
            )
            .then((res) => res.data)
      : null;
  const { data, error } = useSWR<PaymentAffiliationUser[], AxiosResponseError>(
    typeof paymentGroupId === 'string'
      ? `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}/users`
      : null,
    fetcher
  );

  return { paymentAffiliationUsers: data, error };
};
