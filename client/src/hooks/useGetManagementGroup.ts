import type { NextRouter } from 'next/router';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import { ManagementGroup, ManagementGroupApi } from 'src/openapi-generator';
import { AxiosResponseError } from 'src/types/axiosResponseError';
import useSWR from 'swr';

export const useGetManagementGroup = (id: NextRouter['query']['id']) => {
  const fetcher =
    typeof id === 'string'
      ? () =>
          new ManagementGroupApi()
            .getManagementGroupByManagementGroupId(id, {
              headers: getAuthCookies(),
            })
            .then((res) => res.data)
      : null;

  const { data, error } = useSWR<ManagementGroup, AxiosResponseError>(
    typeof id === 'string' ? `api/v1/management_groups/${id}` : null,
    fetcher
  );

  return { managementGroup: data, error };
};
