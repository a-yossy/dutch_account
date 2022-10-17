import useSWR from 'swr';
import { User, UserApi } from 'openapi-generator/api';
import { getAuthCookies } from 'src/libs/getAuthCookies';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const useGetSignInUser = () => {
  const fetcher = () =>
    new UserApi()
      .getSignInUser({ headers: getAuthCookies() })
      .then((res) => res.data);
  const { data } = useSWR<User, AxiosResponseError>(
    '/api/v1/sign_in_user',
    fetcher
  );

  return data;
};
