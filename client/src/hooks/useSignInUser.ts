import useSWR from 'swr';
import { User, UserApi } from 'openapi-generator/api';
import getAuthCookies from 'src/libs/getAuthCookies';
import AxiosResponseError from 'src/types/axiosResponseError';

const useSignInUser = () => {
  const fetcher = () =>
    new UserApi()
      .getSignInUser({ headers: getAuthCookies() })
      .then((res) => res.data);
  const { data, error, isValidating } = useSWR<User, AxiosResponseError>(
    '/api/v1/sign_in_user',
    fetcher
  );

  return {
    signInUser: data,
    error,
    isValidating,
  };
};

export default useSignInUser;
