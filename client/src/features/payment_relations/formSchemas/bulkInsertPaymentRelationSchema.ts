import { z } from 'zod';
import { BulkInsertPaymentRelationByManagementGroupIdRequest } from 'src/openapi-generator';

const GroupSchema: z.ZodType<
  BulkInsertPaymentRelationByManagementGroupIdRequest['group']
> = z.object({
  name: z
    .string()
    .min(1, { message: 'グループ名を入力してください' })
    .max(50, { message: 'グループ名は50文字以内で入力してください' }),
});

const AffiliationSchema: z.ZodType<
  BulkInsertPaymentRelationByManagementGroupIdRequest['affiliations'][number]
> = z.object({
  user_id: z.string().min(1, { message: 'ユーザーを選択してください' }),
  ratio: z
    .number({ invalid_type_error: '割合を入力してください' })
    .positive({ message: '0より大きい値を入力してください' })
    .lt(1, { message: '1未満の値を入力してください' }),
});

export const BulkInsertPaymentRelationSchema: z.ZodType<BulkInsertPaymentRelationByManagementGroupIdRequest> =
  z.object({
    group: GroupSchema,
    affiliations: AffiliationSchema.array().superRefine((affiliations, ctx) => {
      if (affiliations.length < 2) {
        ctx.addIssue({
          message: 'ユーザーを2人以上選択してください',
          code: z.ZodIssueCode.custom,
        });
      } else if (
        affiliations
          .map((affiliation) => affiliation.ratio)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          ) !== 1
      ) {
        ctx.addIssue({
          message: '支払割合の合計が1になるよう入力してください',
          code: z.ZodIssueCode.custom,
        });
      }

      const userIds = affiliations.map((affiliation) => affiliation.user_id);
      if (userIds.length !== new Set(userIds).size) {
        ctx.addIssue({
          message: '同じユーザーは選択できません',
          code: z.ZodIssueCode.custom,
        });
      }
    }),
  });
