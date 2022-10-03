import useSWR from 'swr';
import { ResponseError, User, UserApi } from 'openapi-generator/api';
import { AxiosError } from 'axios';
import getAuthCookies from 'src/libs/getAuthCookies';

const useSignInUser = () => {
  const fetcher = () =>
    new UserApi()
      .getSignInUser({ headers: getAuthCookies() })
      .then((res) => res.data);
  const { data, error } = useSWR<User, AxiosError<ResponseError>>(
    '/api/v1/sign_in_user',
    fetcher
  );

  return {
    signInUser: data,
    error,
  };
};

export default useSignInUser;
