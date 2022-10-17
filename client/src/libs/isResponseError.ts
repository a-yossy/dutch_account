import axios from 'axios';
import { ResponseErrorSchema } from 'src/types/responseErrorSchema';
import { SomeRequired } from 'src/types/someRequired';
import { AxiosResponseError } from 'src/types/axiosResponseError';

export const isResponseError = (
  error: unknown
): error is SomeRequired<AxiosResponseError, 'response'> => {
  if (axios.isAxiosError(error) && error.response !== undefined) {
    const responseError = ResponseErrorSchema.safeParse(error.response.data);

    return responseError.success;
  }

  return false;
};
