import { z } from 'zod';
import { LogInRequest } from 'src/openapi-generator';

export const LogInSchema: z.ZodType<LogInRequest> = z.object({
  email: z.string().email({ message: 'メールアドレスが不正です' }),
  password: z
    .string()
    .min(6, { message: 'パスワードは6文字以上で入力してください' }),
});
