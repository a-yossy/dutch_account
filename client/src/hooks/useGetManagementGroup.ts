import { getAuthCookies } from 'src/libs/getAuthCookies';
import { ManagementGroup, ManagementGroupApi } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';
import useSWR from 'swr';

export const useGetManagementGroup = (id: string) => {
  const fetcher = () =>
    new ManagementGroupApi()
      .getManagementGroupByManagementGroupId(id, {
        headers: getAuthCookies(),
      })
      .then((res) => res.data);
  const { data, error } = useSWR<ManagementGroup, AxiosResponseError>(
    `api/v1/management_groups/${id}`,
    fetcher
  );

  return { managementGroup: data, error };
};
