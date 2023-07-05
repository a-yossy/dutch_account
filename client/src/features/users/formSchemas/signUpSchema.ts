import { z } from 'zod';
import { SignUpForm } from 'src/features/users/types';
import { UserApi } from 'src/openapi-generator';
import { isResponseError } from 'src/libs/isResponseError';

export const SignUpSchema: z.ZodType<SignUpForm> = z
  .object({
    name: z
      .string()
      .min(1, { message: '名前を入力してください' })
      .max(20, { message: '名前は20文字以内で入力してください' }),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    email: z
      .string()
      .email({ message: 'メールアドレスが不正です' })
      .superRefine(async (email, ctx) => {
        try {
          const res = await new UserApi().getUserByEmail(email);

          if (res.data) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'このメールアドレスは既に登録されています',
            });
          }
        } catch (error: unknown) {
          if (isResponseError(error) && error.response.status === 400) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: error.response.data.messages.join('\n'),
            });
          }
        }
      }),
    password: z
      .string()
      .min(6, { message: 'パスワードは6文字以上で入力してください' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードと確認用パスワードが一致しません',
    path: ['password_confirmation'],
  });
