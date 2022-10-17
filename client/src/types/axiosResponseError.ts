import { AxiosError } from 'axios';
import { ResponseError } from 'src/openapi-generator';

export type AxiosResponseError = AxiosError<ResponseError>;
