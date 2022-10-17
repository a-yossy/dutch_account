import { AxiosError } from 'axios';
import { ResponseError } from 'openapi-generator/api';

export type AxiosResponseError = AxiosError<ResponseError>;
