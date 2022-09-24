import { useRouter } from 'next/router';
import axios from 'axios';
import { setCookie } from 'nookies';
import { UserApi, SignUpRequest } from 'openapi-generator/api';
import ResponseErrorSchema from 'src/formSchemas/responseErrorSchema';
import useToast from 'src/hooks/toast';

const useSignUp = () => {
  const toast = useToast();
  const router = useRouter();
  const signUp = async (params: SignUpRequest) => {
    try {
      const response = await new UserApi().signUp({
        name: params.name,
        email: params.email,
        password: params.password,
      });
      setCookie(null, 'access-token', response.headers['access-token']);
      setCookie(null, 'uid', response.headers.uid);
      setCookie(null, 'client', response.headers.client);
      void router.push('/');
      toast('success', 'サインアップしました');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response !== undefined) {
        const responseError = ResponseErrorSchema.safeParse(
          error.response.data
        );
        if (responseError.success) {
          toast(
            'error',
            'サインアップに失敗しました',
            responseError.data.messages.join(`\n`)
          );
        }
      }
    }
  };

  return signUp;
};

export default useSignUp;
