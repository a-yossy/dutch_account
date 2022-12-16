import { z } from 'zod';
import { SignUpForm } from 'src/features/users/types';

export const SignUpSchema: z.ZodType<SignUpForm> = z
  .object({
    name: z
      .string()
      .min(1, { message: '名前を入力してください' })
      .max(20, { message: '名前は20文字以内で入力してください' }),
    email: z.string().email({ message: 'メールアドレスが不正です' }),
    password: z
      .string()
      .min(6, { message: 'パスワードは6文字以上で入力してください' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードと確認用パスワードが一致しません',
    path: ['password_confirmation'],
  });
