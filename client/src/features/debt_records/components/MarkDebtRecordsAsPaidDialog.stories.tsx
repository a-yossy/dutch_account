import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MarkDebtRecordsAsPaidDialog } from 'src/features/debt_records/components/MarkDebtRecordsAsPaidDialog';
import { markDebtRecordsAsPaidHandler } from 'src/test/server/handlers/debtRecord';

export default {
  component: MarkDebtRecordsAsPaidDialog,
  parameters: {
    msw: {
      handlers: [markDebtRecordsAsPaidHandler()],
    },
  },
} as ComponentMeta<typeof MarkDebtRecordsAsPaidDialog>;

const Template: ComponentStory<typeof MarkDebtRecordsAsPaidDialog> = (args) => (
  <MarkDebtRecordsAsPaidDialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  managementGroupId: '1',
};
