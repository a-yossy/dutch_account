import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { ManagementAffiliationApi, User } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetManagementAffiliationUsers = (
  managementGroupId: string | undefined
) => {
  const fetcher =
    typeof managementGroupId === 'string'
      ? () =>
          new ManagementAffiliationApi()
            .getManagementAffiliationUsersByManagementGroupId(
              managementGroupId,
              {
                headers: getAuthCookies(),
              }
            )
            .then((res) => res.data)
      : null;

  const { data, error } = useSWR<User[], AxiosResponseError>(
    typeof managementGroupId === 'string'
      ? `api/v1/management_groups/${managementGroupId}/users`
      : null,
    fetcher
  );

  return { managementAffiliationUsers: data, error };
};
