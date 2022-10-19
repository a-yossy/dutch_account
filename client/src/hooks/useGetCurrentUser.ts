import useSWR from 'swr';
import { User, UserApi } from 'src/openapi-generator';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetCurrentUser = () => {
  const fetcher = () =>
    new UserApi()
      .getCurrentUser({ headers: getAuthCookies() })
      .then((res) => res.data);
  const { data } = useSWR<User, AxiosResponseError>(
    '/api/v1/current_user',
    fetcher
  );

  return data;
};
