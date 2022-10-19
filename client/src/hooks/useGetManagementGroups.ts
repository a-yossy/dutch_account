import { getAuthCookies } from 'src/libs/getAuthCookies';
import { ManagementGroup, ManagementGroupApi } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';
import useSWR from 'swr';

export const useGetManagementGroups = () => {
  const fetcher = () =>
    new ManagementGroupApi()
      .getManagementGroups({ headers: getAuthCookies() })
      .then((res) => res.data);
  const { data } = useSWR<ManagementGroup[], AxiosResponseError>(
    '/api/v1/management_groups',
    fetcher
  );

  return data;
};
