import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import {
  bulkInsertExpenseWithDebtRecordsResponse,
  getExpenseResponse,
} from 'src/__fixtures__/expense';

export const bulkInsertExpenseWithDebtRecordsHandler = () =>
  rest.post(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expense_with_debt_records/bulk_insert`,
    (req, res, ctx) =>
      res(ctx.status(201), ctx.json(bulkInsertExpenseWithDebtRecordsResponse))
  );

export const getExpenseHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expenses/:expense_id`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(getExpenseResponse))
  );