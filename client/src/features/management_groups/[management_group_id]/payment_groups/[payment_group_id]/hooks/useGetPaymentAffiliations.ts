import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import {
  PaymentAffiliationApi,
  PaymentAffiliation,
} from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetPaymentAffiliations = (
  managementGroupId: string,
  paymentGroupId: string | undefined
) => {
  const fetcher =
    typeof paymentGroupId === 'string'
      ? () =>
          new PaymentAffiliationApi()
            .getPaymentAffiliationsByManagementGroupIdAndPaymentGroupId(
              managementGroupId,
              paymentGroupId,
              { headers: getAuthCookies() }
            )
            .then((res) => res.data)
      : null;
  const { data, error } = useSWR<PaymentAffiliation[], AxiosResponseError>(
    typeof paymentGroupId === 'string'
      ? `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}/payment_affiliations`
      : null,
    fetcher
  );

  return { paymentAffiliations: data, error };
};
