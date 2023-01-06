export const getPaymentGroupPaymentAffiliationsResponse = [
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

export const getManagementGroupPaymentGroupsResponse = [
  {
    id: '1',
    name: 'group1',
  },
  { id: '2', name: 'group2' },
];

export const bulkInsertPaymentRelationResponse = {
  group: {
    name: '家族',
  },
  affiliations: [
    { user_id: 1, ratio: 0.5 },
    { user_id: 2, ratio: 0.5 },
  ],
};
