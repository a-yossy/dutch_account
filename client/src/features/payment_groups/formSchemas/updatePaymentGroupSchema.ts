import { z } from 'zod';
import { UpdatePaymentGroupByManagementGroupIdAndPaymentGroupIdRequest } from 'src/openapi-generator';

export const UpdatePaymentGroupSchema: z.ZodType<UpdatePaymentGroupByManagementGroupIdAndPaymentGroupIdRequest> =
  z.object({
    name: z
      .string()
      .min(1, { message: 'グループ名を入力してください' })
      .max(50, { message: 'グループ名は50文字以内で入力してください' }),
  });
