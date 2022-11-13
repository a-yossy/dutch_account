import { z } from 'zod';
import {
  AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequest,
  AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequestPaymentAffiliationsInner,
  AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequestPaymentGroup,
} from 'src/openapi-generator';

const PaymentGroupSchema: z.ZodType<AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequestPaymentGroup> =
  z.object({
    name: z
      .string()
      .min(1, { message: 'グループ名を入力してください' })
      .max(50, { message: 'グループ名は50文字以内で入力してください' }),
  });

const PaymentAffiliationSchema: z.ZodType<AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequestPaymentAffiliationsInner> =
  z.object({
    user_id: z.string().min(1, { message: 'ユーザーを選択してください' }),
    ratio: z
      .number({ invalid_type_error: '割合を入力してください' })
      .positive({ message: '0より大きい値を入力してください' })
      .lt(1, { message: '1未満の値を入力してください' }),
  });

export const AddPaymentGroupAndPaymentAffiliationsSchema: z.ZodType<AddPaymentGroupAndPaymentAffiliationsByManagementGroupIdRequest> =
  z.object({
    payment_group: PaymentGroupSchema,
    payment_affiliations: PaymentAffiliationSchema.array().superRefine(
      (payment_affiliations, ctx) => {
        if (payment_affiliations.length < 2) {
          ctx.addIssue({
            message: 'ユーザーを2人以上選択してください',
            code: z.ZodIssueCode.custom,
          });
        } else if (
          payment_affiliations
            .map((payment_affiliation) => payment_affiliation.ratio)
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue
            ) !== 1
        ) {
          ctx.addIssue({
            message: '支払割合の合計が1になるよう入力してください',
            code: z.ZodIssueCode.custom,
          });
        }
      }
    ),
  });
