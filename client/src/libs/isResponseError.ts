import axios, { AxiosError } from 'axios';
import { ResponseError } from 'openapi-generator/api';
import ResponseErrorSchema from 'src/types/responseErrorSchema';

const isResponseError = (
  error: unknown
): error is Required<AxiosError<ResponseError>> => {
  if (axios.isAxiosError(error) && error.response !== undefined) {
    const responseError = ResponseErrorSchema.safeParse(error.response.data);

    return responseError.success;
  }

  return false;
};

export default isResponseError;
