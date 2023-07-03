import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';
import {
  bulkInsertPaymentRelationResponse,
  getManagementGroupPaymentGroupsResponse,
  getPaymentGroupPaymentAffiliationsResponse,
  getPaymentGroupExpensesResponse,
} from 'src/__fixtures__/paymentGroup';

export const getPaymentGroupPaymentAffiliationsHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/payment_affiliations`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(getPaymentGroupPaymentAffiliationsResponse))
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
