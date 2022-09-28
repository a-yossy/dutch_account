import axios, { AxiosError } from 'axios';
import { ResponseError } from 'openapi-generator/api';
import ResponseErrorSchema from 'src/types/responseErrorSchema';
import SomeRequired from 'src/types/someRequired';

const isResponseError = (
  error: unknown
): error is SomeRequired<AxiosError<ResponseError>, 'response'> => {
  if (axios.isAxiosError(error) && error.response !== undefined) {
    const responseError = ResponseErrorSchema.safeParse(error.response.data);

    return responseError.success;
  }

  return false;
};

export default isResponseError;
