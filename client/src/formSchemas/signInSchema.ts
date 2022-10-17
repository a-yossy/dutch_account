import { z } from 'zod';
import { SignInRequest } from 'openapi-generator/api';

export const SignInSchema: z.ZodType<SignInRequest> = z.object({
  email: z.string().email({ message: 'メールアドレスが不正です' }),
  password: z
    .string()
    .min(6, { message: 'パスワードは6文字以上で入力してください' }),
});
