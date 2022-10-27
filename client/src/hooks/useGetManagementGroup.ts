import { getAuthCookies } from 'src/libs/getAuthCookies';
import { ManagementGroup, ManagementGroupApi } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';
import useSWR from 'swr';

export const useGetManagementGroup = (managementGroupId: string) => {
  const fetcher = () =>
    new ManagementGroupApi()
      .getManagementGroupByManagementGroupId(managementGroupId, {
        headers: getAuthCookies(),
      })
      .then((res) => res.data);

  const { data, error } = useSWR<ManagementGroup, AxiosResponseError>(
    `api/v1/management_groups/${managementGroupId}`,
    fetcher
  );

  return { managementGroup: data, error };
};
