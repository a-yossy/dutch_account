import { SignUpRequest } from 'src/openapi-generator';

export type SignUpForm = {
  password_confirmation: string;
} & SignUpRequest;
