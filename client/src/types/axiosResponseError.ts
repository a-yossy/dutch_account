import { AxiosError } from 'axios';
import { ResponseError } from 'openapi-generator/api';

type AxiosResponseError = AxiosError<ResponseError>;

export default AxiosResponseError;
