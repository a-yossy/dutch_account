import {
  PaymentAffiliation,
  PaymentGroup,
  PaymentRelation,
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
