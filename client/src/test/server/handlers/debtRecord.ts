import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';

export const markDebtRecordsAsPaidHandler = () =>
  rest.patch(
    `${BASE_PATH}/management_groups/:management_group_id/debt_records/mark_as_paid`,
    (req, res, ctx) => res(ctx.status(204))
  );
