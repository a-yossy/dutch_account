import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ManagementGroupTab } from 'src/features/management_groups/components/ManagementGroupTab';
import { getManagementGroupUsersHandler } from 'src/test/server/handlers/user';
import {
  bulkInsertPaymentRelationHandler,
  getManagementGroupPaymentGroupsHandler,
} from 'src/test/server/handlers/paymentGroup';
import { getManagementGroupTotalBorrowingAndLendingsHandler } from 'src/test/server/handlers/totalBorrowingAndLending';
import { markDebtRecordsAsPaidHandler } from 'src/test/server/handlers/debtRecord';

export default {
  component: ManagementGroupTab,
  parameters: {
    msw: {
      handlers: [
        getManagementGroupUsersHandler(),
        getManagementGroupPaymentGroupsHandler(),
        bulkInsertPaymentRelationHandler(),
        getManagementGroupTotalBorrowingAndLendingsHandler(),
        markDebtRecordsAsPaidHandler(),
      ],
    },
  },
} as ComponentMeta<typeof ManagementGroupTab>;

const Template: ComponentStory<typeof ManagementGroupTab> = (args) => (
  <ManagementGroupTab {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
};
