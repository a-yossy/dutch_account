import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { PaymentGroupApi, PaymentAffiliation } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetPaymentGroupPaymentAffiliations = (
  managementGroupId: string,
  paymentGroupId: string
) => {
  const fetcher = () =>
    new PaymentGroupApi()
      .getPaymentAffiliationsByManagementGroupIdAndPaymentGroupId(
        managementGroupId,
        paymentGroupId,
        { headers: getAuthCookies() }
      )
      .then((res) => res.data);
  const { data, error } = useSWR<PaymentAffiliation[], AxiosResponseError>(
    `api/v1/management_groups/${managementGroupId}/payment_groups/${paymentGroupId}/payment_affiliations`,
    fetcher
  );

  return { paymentGroupPaymentAffiliations: data, error };
};
