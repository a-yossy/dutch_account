import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NumberInputField } from 'src/components/parts/Form/NumberInputField';

export default {
  component: NumberInputField,
} as ComponentMeta<typeof NumberInputField>;

const Template: ComponentStory<typeof NumberInputField> = (args) => (
  <NumberInputField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: undefined,
  id: 'age',
  formLabel: '年齢',
  min: 0,
  max: 150,
  width: 400,
};
