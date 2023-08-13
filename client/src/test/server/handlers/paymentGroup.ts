import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import {
  bulkInsertPaymentRelationResponse,
  getManagementGroupPaymentGroupsResponse,
  getPaymentGroupResponse,
  getPaymentGroupPaymentAffiliationsResponse,
  getPaymentGroupExpensesResponse,
  updatePaymentGroupResponse,
} from 'src/__fixtures__/paymentGroup';

export const getPaymentGroupPaymentAffiliationsHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/payment_affiliations`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(getPaymentGroupPaymentAffiliationsResponse))
  );

export const getPaymentGroupHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(getPaymentGroupResponse))
  );

export const getManagementGroupPaymentGroupsHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(getManagementGroupPaymentGroupsResponse))
  );

export const bulkInsertPaymentRelationHandler = () =>
  rest.post(
    `${BASE_PATH}/management_groups/:management_group_id/payment_relations/bulk_insert`,
    (req, res, ctx) =>
      res(ctx.status(201), ctx.json(bulkInsertPaymentRelationResponse))
  );

export const getPaymentGroupExpensesHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expenses`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(getPaymentGroupExpensesResponse))
  );

export const getNoPaymentGroupExpensesHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/expenses`,
    (req, res, ctx) => res(ctx.status(200), ctx.json([]))
  );

export const deletePaymentGroupHandler = () =>
  rest.delete(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id`,
    (req, res, ctx) => res(ctx.status(204))
  );

export const updatePaymentGroupHandler = () =>
  rest.patch(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(updatePaymentGroupResponse))
  );
