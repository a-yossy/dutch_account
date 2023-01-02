import { rest } from 'msw';
import { BASE_PATH } from 'src/openapi-generator/base';

const tmp = [
  {
    user: {
      id: '1',
      name: '太郎',
    },
    ratio: 0.5,
  },
  {
    user: {
      id: '2',
      name: '次郎',
    },
    ratio: 0.5,
  },
];

export const getPaymentGroupPaymentAffiliationsHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups/:payment_group_id/payment_affiliations`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(tmp))
  );

const tmp2 = [
  {
    id: '1',
    name: 'group1',
  },
  { id: '2', name: 'group2' },
];

export const getManagementGroupPaymentGroupsHandler = () =>
  rest.get(
    `${BASE_PATH}/management_groups/:management_group_id/payment_groups`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(tmp2))
  );

const tmp3 = {
  group: {
    name: '家族',
  },
  affiliations: [
    { user_id: 1, ratio: 0.5 },
    { user_id: 2, ratio: 0.5 },
  ],
};

export const bulkInsertPaymentRelationHandler = () =>
  rest.post(
    `${BASE_PATH}/management_groups/:management_group_id/payment_relations/bulk_insert`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(tmp3))
  );
