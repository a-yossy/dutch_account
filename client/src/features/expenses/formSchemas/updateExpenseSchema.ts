import { z } from 'zod';
import { UpdateExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseIdRequest } from 'src/openapi-generator';
import dayjs from 'dayjs';

export const UpdateExpenseSchema: z.ZodType<UpdateExpenseByManagementGroupIdAndPaymentGroupIdAndExpenseIdRequest> =
  z.object({
    user_id: z.string().min(1, { message: 'ユーザーを選択してください' }),
    amount_of_money: z
      .number({ invalid_type_error: '金額を入力してください' })
      .positive({ message: '0より大きい値を入力してください' })
      .int({ message: '整数を入力してください' }),
    description: z
      .string()
      .min(1, { message: '説明を入力してください' })
      .max(255, { message: '説明は255文字以内で入力してください' }),
    paid_on: z
      .string()
      .min(1, { message: '支払日を入力してください' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, '支払日はYYYY-MM-DD形式で入力してください')
      .refine(
        (value) => dayjs(value).isValid(),
        '支払日は有効な日付で入力してください'
      )
      .refine(
        (value) => dayjs(value).isBefore(dayjs()),
        '支払日は今日以前の日付で入力してください'
      ),
  });
