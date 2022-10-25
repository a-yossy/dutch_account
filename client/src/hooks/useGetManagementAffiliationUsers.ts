import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import {
  ManagementAffiliationApi,
  ManagementAffiliationUser,
} from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetManagementAffiliationUsers = (id: string | undefined) => {
  const fetcher =
    typeof id === 'string'
      ? () =>
          new ManagementAffiliationApi()
            .getManagementAffiliationUsersByManagementGroupId(id, {
              headers: getAuthCookies(),
            })
            .then((res) => res.data)
      : null;

  const { data, error } = useSWR<
    ManagementAffiliationUser[],
    AxiosResponseError
  >(
    typeof id === 'string' ? `api/v1/management_groups/${id}/users` : null,
    fetcher
  );

  return { managementAffiliationUsers: data, error };
};
