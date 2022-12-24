import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputField } from 'src/components/parts/Form/InputField';

export default {
  component: InputField,
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: undefined,
  id: 'name',
  formLabel: '名前',
  type: 'text',
  placeholder: '太郎',
  width: 400,
};
