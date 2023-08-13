import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import {
  bulkInsertExpensesResponse,
  getExpenseResponse,
  updateExpenseResponse,
} from 'src/__fixtures__/expense';

export const bulkInsertExpensesHandler = () =>
  rest.post(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expenses/bulk_insert`,
    (req, res, ctx) =>
      res(ctx.status(201), ctx.json(bulkInsertExpensesResponse))
  );

export const getExpenseHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expenses/:expense_id`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(getExpenseResponse))
  );

export const updateExpenseHandler = () =>
  rest.patch(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expenses/:expense_id`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(updateExpenseResponse))
  );

export const deleteExpenseHandler = () =>
  rest.delete(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expenses/:expense_id`,
    (req, res, ctx) => res(ctx.status(204))
  );
