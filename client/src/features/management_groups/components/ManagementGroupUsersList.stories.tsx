import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ManagementGroupUsersList } from 'src/features/management_groups/components/ManagementGroupUsersList';
import { getManagementGroupUsersHandler } from 'src/test/server/handlers/user';

export default {
  component: ManagementGroupUsersList,
  parameters: {
    msw: {
      handlers: [getManagementGroupUsersHandler()],
    },
  },
} as ComponentMeta<typeof ManagementGroupUsersList>;

const Template: ComponentStory<typeof ManagementGroupUsersList> = (args) => (
  <ManagementGroupUsersList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
};
