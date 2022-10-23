import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import {
  ManagementAffiliationApi,
  ManagementAffiliationUser,
} from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetManagementAffiliationUsers = (id: string) => {
  const fetcher = () =>
    new ManagementAffiliationApi()
      .getManagementAffiliationUsersByManagementGroupId(id, {
        headers: getAuthCookies(),
      })
      .then((res) => res.data);

  const { data, error } = useSWR<
    ManagementAffiliationUser[],
    AxiosResponseError
  >(`api/v1/management_groups/${id}/users`, fetcher);

  return { managementAffiliationUsers: data, error };
};
