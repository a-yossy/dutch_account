import useSWR from 'swr';
import { getAuthCookies } from 'src/libs/nookies/getAuthCookies';
import { ManagementGroupApi, User } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetManagementGroupUsers = (managementGroupId: string) => {
  const fetcher = () =>
    new ManagementGroupApi()
      .getUsersByManagementGroupId(managementGroupId, {
        headers: getAuthCookies(),
      })
      .then((res) => res.data);

  const { data, error } = useSWR<User[], AxiosResponseError>(
    `api/v1/management_groups/${managementGroupId}/users`,
    fetcher
  );

  return { managementGroupUsers: data, error };
};
