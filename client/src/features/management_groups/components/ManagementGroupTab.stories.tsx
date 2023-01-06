import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ManagementGroupTab } from 'src/features/management_groups/components/ManagementGroupTab';

export default {
  component: ManagementGroupTab,
} as ComponentMeta<typeof ManagementGroupTab>;

const Template: ComponentStory<typeof ManagementGroupTab> = (args) => (
  <ManagementGroupTab {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroup: {
    id: '1',
    name: 'group',
  },
};
