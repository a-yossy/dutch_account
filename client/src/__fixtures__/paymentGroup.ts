import {
  PaymentAffiliation,
  PaymentGroup,
  PaymentRelation,
  Expense,
} from 'src/openapi-generator';

export const getPaymentGroupPaymentAffiliationsResponse: PaymentAffiliation[] =
  [
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

export const getManagementGroupPaymentGroupsResponse: PaymentGroup[] = [
  {
    id: '1',
    name: 'group1',
  },
  { id: '2', name: 'group2' },
];

export const bulkInsertPaymentRelationResponse: PaymentRelation = {
  group: {
    id: '1',
    name: '家族',
  },
  affiliations: [
    { user: { id: '1', name: '太郎' }, ratio: 0.5 },
    { user: { id: '2', name: '次郎' }, ratio: 0.5 },
  ],
};

export const getPaymentGroupExpensesResponse: Expense[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: '太郎',
    },
    payment_group_id: '1',
    amount_of_money: 1000,
    description: '食費',
    paid_on: '2021-01-01',
  },
  {
    id: '2',
    user: {
      id: '2',
      name: '次郎',
    },
    payment_group_id: '1',
    amount_of_money: 2000,
    description: '水道代',
    paid_on: '2021-01-02',
  },
];
